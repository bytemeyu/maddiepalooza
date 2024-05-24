import dotenv from 'dotenv';
dotenv.config();
//Porque eu tive que colocar o dotenv.config() aqui, se ele já foi colocado no server.js (que é o ponto de entrada da minha API)? Isso já não deveria ter carregado as variáveis de ambiente por todas as camadas? Ou o ponto de entrada da minha API na verdade é o database.js? CHATGPT: Embora dotenv já tenha sido configurado em server.js, se houver algum problema de timing ou de dependência circular, isso pode explicar por que você sentiu a necessidade de chamar dotenv.config() novamente aqui. Isso sugere que talvez database.js esteja sendo carregado antes que dotenv.config() em server.js tenha uma chance de executar. Uma prática comum para evitar esses problemas é assegurar que dotenv.config() seja chamada o mais cedo possível no ponto de entrada, como você fez, e verificar todas as importações para garantir que nenhum módulo que necessite das variáveis de ambiente seja carregado antes dessa chamada.[Até o final do projeto eu descubro porque está ocorrendo isso. Ahhh, se descubro!]

import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.on('error', (err, client) => {
    console.error(`Erro inesperado no cliente da pool: ${err}`);
    process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);