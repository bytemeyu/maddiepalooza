# Maddiepalooza

## Levantamento de Requisitos:
### Funcionais:
1. Gerenciamento de Artistas:
   - Adicionar, editar, remover e visualizar informações de artistas (nome, biografia, foto).
   - Associar artistas a palcos e horários específicos.
2. Gerenciamento de Palcos:
   - Adicionar, editar, remover e visualizar informações de palcos (nome, localização, capacidade).
   - Associar palcos à listas de artistas com seus respectivos dias e horários.
3. Gerenciamento de Dias e Horários:
   - Criar e modificar a agenda do evento.
   - Alocar artistas em horários específicos em diferentes palcos.
   - Permitir visualizações por dia e palco.
4. Autenticação e Autorização:
   - Sistema de login para usuários.
   - Diferentes níveis de acesso para diferentes tipos de usuários (por exemplo, administradores-web, produtores, assistentes).
   - Adicionar, editar, remover e visualizar usuários.
5. Interface de Usuário:
   - Interface intuitiva para fácil navegação e gerenciamento.
   - Dashboards para visualização rápida de informações como: artistas e suas informações, shows por palco, shows do dia, etc.

### Não-Funcionais:
**Tecnologias Utilizadas:**  
Apoio:  
- Visual Studio Code;
- GitHub;
- DB Designer;

Back-end:  
- Node.js;
- Express;
- PostgreSQL;

## Design Arquitetônico:
Software em três camadas:
- Apresentação: Front-end.
- Lógica de Negócio: 'Controllers', 'Services', 'Repositories'.
- Dados: 'Models' e Database em si.

## Banco de Dados:
Link do modelo do banco de dados desenvolvido no DB Designer: https://dbdesigner.page.link/EiRZWofkNSRyrn1DA

Representações estruturadas das tabelas do banco de dados, com entidades, atributos, relações, índices, restrições, etc, assim como das vistas implementadas, nos arquivos da pasta src > models. 

## API Rest:
A API vai permitir gerenciar artistas (artist: name, biography, photo_url), palcos (stage: name, location, capacity) e performances (performance: artist_id, stage_id, start_time, end_time, date) de um festival de música. Além de permitir o gerenciamento de usuários (users: email, username, password_hash, role) desse sistema.
### Métodos HTTP, Endpoints e Funcionalidades:
**artist**  
GET /api/artist: Recupera todos os artistas e suas respectivas informações.  
GET /api/artist/:id: Recupera um artista específico e suas informações.  
POST /api/artist: Cria um novo artista, com todas suas informações.  
PUT /api/artist/:id: Atualiza as informações de um artista existente (com a possibilidade de atualizar somente um dos campos).  
DELETE /api/artist/:id: Deleta o artista especificado.  

**stage**  
GET /api/stage: Recupera todos os palcos e suas respectivas informações.  
GET /api/stage/:id: Recupera um palco específico e suas informações.  
POST /api/stage: Cria um novo palco, com todas suas informações.  
PUT /api/stage/:id: Atualiza as informações de um palco existente (com a possibilidade de atualizar somente um dos campos).  
DELETE /api/stage/:id: Deleta o palco especificado.  

**performance**  
GET /api/performance: Recupera todas as performances e suas respectivas informações.  
GET /api/performance/:id: Recupera uma performance específica e suas informações.  
POST /api/performance: Cria uma nova performance, com todas suas informações.  
PUT /api/performance/:id: Atualiza as informações de uma performance existente (com a possibilidade de atualizar somente um dos campos).  
DELETE /api/performance/:id: Deleta a performance especificada.  

**users**  
GET /api/users: Recupera todos os usuários e suas respectivas informações.  
GET /api/users/:id: Recupera um usuário específico e suas informações.  
POST /api/users: Cria um novo usuário, com todas suas informações.  
PUT /api/users/:id: Atualiza as informações de um usuário existente (com a possibilidade de atualizar somente um dos campos).  
DELETE /api/users/:id: Deleta o usuário especificado.  

### Entrada e Saída de Payloads: 
Formato JSON.

**Exemplo de entrada:**
```javascript
{
   "name": "Madonna", 
	"biography": "Madonna Louise Ciccone, conhecida simplesmente como Madonna, nasceu em 16 de agosto de 1958 em Bay City, Michigan, EUA. Ela é uma cantora, compositora, atriz e empresária americana, frequentemente referida como a 'Rainha do Pop'.", 
	"photo_url": "https://images.app.goo.gl/ " 
}
```

**Exemplo de saída:**
```javascript
{ 
   "success": true, 
	"data": [{
      "id": 1, 
      "name": "Madonna", 
	   "biography": "Madonna Louise Ciccone, conhecida simplesmente como Madonna, nasceu em 16 de agosto de 1958 em Bay City, Michigan, EUA. Ela é uma cantora, compositora, atriz e empresária americana, frequentemente referida como a 'Rainha do Pop'.", 
	   "photo_url": "https://images.app.goo.gl/ "
	}]
}
```

### Regras de Negócio na Camada de Serviço:
**performance (artist_id, stage_id, start_time, end_time, date)**  
- Não deve haver duas performances ao mesmo tempo no mesmo palco.
- A data deve ser uma das três datas em que ocorrerá o festival.

**users (email, username, password_hash, role)**  
- Deve haver somente três tipos de usuários (role): administrador-web (webadmin), produtor (producer), assistente (assistant).
- O único tipo de usuário que pode criar, atualizar e deletar usuários do tipo 'producer' e 'assistant' é o 'webadmin'. 
- O 'producer' pode criar, atualizar e deletar somente usuários do tipo 'assistant'. 
- Todos os tipos de usuários podem visualizar todos os usuários e suas respectivas informações ou um usuário específico e suas informações.
- Somente o 'producer' pode criar, atualizar ou deletar um artista; criar, atualizar ou deletar um palco.
- Tanto o 'producer' quanto o 'assistant' podem criar, atualizar ou deletar uma performance.
- As visualizações de artistas, palcos e performances, tanto geral, quanto específicas, não requerem autenticação de nenhum usuário.

### Validações na Camada de Controle:
**artist (name, biography, photo_url)**  
- O nome do artista deve ser único e válido (string não vazia).
- A biografia do artista deve ser válida.
- A URL da foto do artista deve ser única e válida (formato URL - regex).

**stage (name, location, capacity)**  
- O nome do palco deve ser único e válido.
- A localização do palco deve ser única e válida (formato de coordenadas - regex).
- A capacidade do palco deve ser válida (number).

**performance (artist_id, stage_id, start_time, end_time, date)**  
- O id do artista deve ser o id de um artista existente e com todas suas informações fornecidas.
- O id do palco deve ser o id de um palco existente e com todas suas informações fornecidas.
- As horas de início e de término devem ser válidas (timestamp with zone).
- A hora de início deve ser antes (menor) do que a hora de término.
- A duração mínima da performance tem de ser de 1 hora (a diferença entre end_time e start_time deve ser de no mínimo 60 minutos).
- A data tem que ser válida (date).

**users (email, username, password_hash, role)**  
- O e-mail do usuário deve ser único e válido (formato de e-mail - regex).
- O username do usuário deve ser único e válido.
- A senha deve ter no mínimo 8 e no máximo 20 caracteres, além de ter ao menos um número, uma letra maiúscula, uma letra minúscula e um caractere especial desses: */._¨-,.[]^%$#@&.

## Front-end:

## Testes:

## Deploy:

## Para o Usuário:
**- O que o software Maddiepalooza faz?**

**- Por que o software Maddiepalooza é útil?**

**- Como os usuários podem começar a usar o software Maddiepalooza?**

**- Quem mantém e contribui para o software Maddiepalooza?**
