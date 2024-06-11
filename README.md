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
- Postman;

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

**(métodos de autenticação)**
POST /api/auth/login: Loga o usuário, ou seja, autentica sua sessão e fornece um cookie session.  
DELETE /api/auth/logout: Desloga o usuário, ou seja, apaga o cookie session.  

### Regras de Negócio na Camada de Serviço:
**users (email, username, password_hash, role)**  
- Deve haver somente três tipos de usuários (role): administrador-web (webadmin), produtor (producer), assistente (assistant).
- Nenhum usuário pode ver senha nenhuma, em qualquer situação.  


| Rotas             | Tipos de usuário autorizados     |
|:------------------|:---------------------------------|
| getAllArtists     | (Não requer autenticação);|
| getArtistById     | (Não requer autenticação);|
| createArtist      | webadmin; producer;|
| updateArtist      | webadmin; producer;|
| deleteArtist      | webadmin; producer;|
| getAllStages      | (Não requer autenticação);|
| getStageById      | (Não requer autenticação);|
| createStage       | webadmin; producer;|
| updateStage       | webadmin; producer;|
| deleteStage       | webadmin; producer;|
| getAllPerformances| (Não requer autenticação);|
| getPerformanceById| (Não requer autenticação);|
| createPerformance | webadmin; producer; assistant;|
| updatePerformance | webadmin; producer; assistant;|
| deletePerformance | webadmin; producer; assistant;|
| getAllUsers       | webadmin; producer; assistant;|
| getUserById       | webadmin; producer; assistant;|
| createUser        | webadmin; producer [só pode criar assistant];|
| updateUser        | webadmin; producer [só pode alterar producer (só pode alterar email, username, password) e assistant]; assistant [só pode alterar assistant (só pode alterar email, username, password)];|
| deleteUser        | webadmin; producer [só pode deletar assistant];|
| login             | (Não requer autenticação);|
| logout            | webadmin; producer; assistant;|  


**performance (artist_id, stage_id, start_time, end_time, date)**  
- Não deve haver duas performances ao mesmo tempo no mesmo palco.
- O mesmo artista não pode estar em duas performances ao mesmo tempo.

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
- A senha (password) deve ter no mínimo 8 e no máximo 20 caracteres, além de ter ao menos um número, uma letra maiúscula, uma letra minúscula e um caractere especial desses: */._¨-,.[]^%$#@&. Lembrando que a password é diferente da password_hash (e seus limites são diferentes - e, inclusive, aplicados em lugares diferentes (a password_hash no Banco de Dados e a password na Camada de Controle)).

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

**Exemplos de saída:**
```javascript
{ 
   "success": true, 
	"data": {
      "id": 1, 
      "name": "Madonna", 
	   "biography": "Madonna Louise Ciccone, conhecida simplesmente como Madonna, nasceu em 16 de agosto de 1958 em Bay City, Michigan, EUA. Ela é uma cantora, compositora, atriz e empresária americana, frequentemente referida como a 'Rainha do Pop'.", 
	   "photo_url": "https://images.app.goo.gl/ "
	}
}
```
```javascript
{ 
   "success": true, 
	"data": [{
      "id": 1, 
      "name": "Madonna", 
	   "biography": "Madonna Louise Ciccone, conhecida simplesmente como Madonna, nasceu em 16 de agosto de 1958 em Bay City, Michigan, EUA. Ela é uma cantora, compositora, atriz e empresária americana, frequentemente referida como a 'Rainha do Pop'.", 
	   "photo_url": "https://images.app.goo.gl/ "
	},
   {
      "id": 2, 
      "name": "David Bowie", 
	   "biography": "David Bowie, nascido David Robert Jones em 8 de janeiro de 1947, em Brixton, Londres, foi um dos músicos mais inovadores e influentes do século 20. Ele começou sua carreira musical na década de 1960, mas alcançou fama mundial na década de 1970 com seu personagem Ziggy Stardust, um alter ego andrógino e alienígena que revolucionou o rock.", 
	   "photo_url": "https://images.app.goo.gl/ "
	}]
}
```  

## Front-end:

## Testes:

## Deploy:

## Futuras Melhorias/Implementações:
- Método HTTP PATCH para atualizações parciais.
- Usar UUID para id's (principalmente as de usuários).

## Para o Usuário:
**- O que o software Maddiepalooza faz?**

**- Por que o software Maddiepalooza é útil?**

**- Como os usuários podem começar a usar o software Maddiepalooza?**

**- Quem mantém e contribui para o software Maddiepalooza?**
