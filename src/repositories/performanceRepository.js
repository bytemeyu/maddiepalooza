import { query } from "../config/database.js";

export const performanceRepository = {
    getAllPerformances: async() => {
        const text = 'SELECT * FROM performance';
        try {
            const { rows } = await query(text);
            return rows;
        } catch(err) {
            console.error(`Erro ao recuperar todas as performances: ${err.message}`);
            throw err;
        }
    },

    getPerformanceById: async(id) => {
        const text = 'SELECT * FROM performance WHERE performance_id = $1';
        const params = [id];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch(err) {
            console.error(`Erro ao recuperar performance com id ${id}: ${err.message}`);
            throw err;
        }
    },

    createPerformance: async(artist_id, stage_id, start_time, end_time, date) => {
        const text = 'INSERT INTO performance (artist_id, stage_id, start_time, end_time, date) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
        const params = [artist_id, stage_id, start_time, end_time, date];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch(err) {
            console.error(`Erro ao criar nova performance no banco de dados: ${err.message}`);
            throw err;
        }
    },

    updatePerformance: async(id, artist_id, stage_id, start_time, end_time, date) => {
        const text = 'UPDATE performance SET artist_id = $1, stage_id = $2, start_time = $3, end_time = $4, date = $5 WHERE performance_id = $6 RETURNING *';
        const params = [artist_id, stage_id, start_time, end_time, date, id];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch(err) {
            console.error(`Erro ao atualizar performance com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    deletePerformance: async(id) => {
        const text = 'DELETE FROM performance WHERE performance_id = $1 RETURNING *';
        const params = [id];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch(err) {
            console.error(`Erro ao deletar performance com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    artistUnavailability: async(artist_id, start_time, end_time, date, current_performance_id = null) => {
        //Ao definir padrões em cada camada (serviço e repositório), você garante que cada camada pode operar independentemente da outra. Isso é útil em cenários onde as funções do repositório podem ser chamadas por diferentes partes do código, não apenas pelo serviço específico que você visualizou. Definir valores padrão em cada camada torna o código mais autoexplicativo. Um desenvolvedor que olhe para a camada de repositório não precisa presumir que a camada de serviço sempre passará todos os argumentos necessários; ao ver o valor padrão diretamente na função do repositório, ele entende imediatamente que current_performance_id pode ser opcional.
        const text = 'SELECT EXISTS (SELECT 1 FROM performance WHERE artist_id = $1 AND date = $2 AND start_time < $3 AND end_time > $4 AND ($5::int IS NULL OR id != $5)) AS is_unavailable;';
        //SELECT 1 é uma prática útil para otimizar consultas de existência e deixar claro que o interesse da consulta está na presença de linhas, e não nos dados específicos dessas linhas.
        //Se o start_time de uma performance existente é menor do que o end_time de uma possível performance, ou seja, se uma performance existente começa antes do final da possível performance, há uma indisponibilidade do artista para a (não mais) possível performance.
        //Se o end_time de uma performance existente é maior do que o start_time de uma possível performance, ou seja, se uma performance existente termina depois do início da possível performance, há uma indisponibilidade do artista para a (não mais) possível performance.
        // Se current_performance_id for nulo (true) (quando estamos criando uma nova performance), a condição ($5::int IS NULL) será verdadeira. Isso significa que a segunda parte da condição (id != $5) não precisa ser avaliada porque o operador 'OR' já encontrou uma condição verdadeira. Portanto, nenhuma performance será excluída da verificação de conflitos baseada em ID,e a consulta SQL irá procurar por qualquer performance que possa conflitar com os horários propostos da nova performance.
        // Se current_performance_id não for nulo, contiver um id, (false) (quando estamos atualizando uma performance já existente), o SQL precisa avaliar a segunda parte da condição (id != $5) porque a primeira parte da condição é falsa. Neste caso:
            // - Se id != $5 for verdadeiro, isso significa que a performance que está sendo examinada (em cada iteração da consulta) é diferente da performance que está sendo atualizada. Assim, essas performances são incluídas na verificação de conflitos.
            // - Se id != $5 for falso (ou seja, id é igual a $5), isso significa que estamos olhando para a própria performance que está sendo atualizada. Essa performance será excluída da verificação de conflitos para evitar falsos positivos, pois não queremos que a performance detecte a si mesma como um conflito.
        // Resumindo:
            // - Quando criando uma nova performance (current_performance_id é NULL), todas as performances são consideradas na verificação de conflitos.
            // - Quando atualizando uma performance existente (current_performance_id tem um valor), a própria performance atualizada é excluída da verificação para garantir que não seja contada como um conflito com ela mesma.
        //O que garante a exclusão da própria  da própria performance que está sendo atualizada da busca por conflitos é a condição id != $5, ele atua como um filtro. A condição id != $5 significa "considere apenas aquelas performances cujo id é diferente do id que estamos atualizando". Ao avaliar essa condição, o SQL verifica cada performance na base de dados e compara seu id com o id fornecido ($5). Se o id da performance na base de dados for diferente de $5, a performance é considerada na verificação de conflitos. Se for o mesmo, essa performance (a que está sendo atualizada) é excluída da verificação.
        //Em resumo, a parte $5::int IS NULL da condição é crucial para lidar com situações de criação de novas performances, garantindo que todas as performances sejam verificadas por conflitos, enquanto a parte id != $5 é essencial durante a atualização de performances, permitindo que a própria performance sendo atualizada seja excluída da verificação de conflitos. 
        //Se essa consulta completa retornar false (EXISTS retorna false quando não encontra registros), significa que não há performances que conflitem com a nova no horário e data especificados para o mesmo artista, ou seja, o artista não está indisponível. Se retornar true, existe pelo menos um conflito, portanto o artista está indisponível.
        //Resumindo, a consulta checa se existe alguma performance que começa antes do término da possível performance proposta e termina após o início desta. Isso indica que o artista já está ocupado durante esse período, tornando-o indisponível.
        const params = [artist_id, date, end_time, start_time, current_performance_id];

        try {
            const res = await query(text, params);
            return res.rows[0].exists;
        } catch(err) {
            console.error(`Erro ao verificar indisponibilidade do artista com id ${artist_id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    stageUnavailability: async(stage_id, start_time, end_time, date, current_performance_id = null) => {
        const text = 'SELECT EXISTS (SELECT 1 FROM performance WHERE stage_id = $1 AND date = $2 AND start_time < $3 AND end_time > $4 AND ($5::int IS NULL OR id != $5)) AS is_unavailable;';
        const params = [stage_id, date, end_time, start_time, current_performance_id];

        try {
            const res = await query(text, params);
            return res.rows[0].exists;
        } catch(err) {
            console.error(`Erro ao verificar indisponibilidade do palco com id ${stage_id} no banco de dados: ${err.message}`);
            throw err;
        }
    }
};