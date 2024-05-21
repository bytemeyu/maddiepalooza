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
   - Diferentes níveis de acesso para diferentes tipos de usuários (por exemplo, administradores, assistentes).
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
   - GET /api/artist: Recupera todos os artistas e suas respectivas informações.
   - GET /api/artist/:id: Recupera um artista específico e suas informações.
   - POST /api/artist: Cria um novo artista, com todas suas informações.
   - PUT /api/artist/:id: Atualiza as informações de um artista existente.
   - DELETE /api/artist/:id: Deleta o artista especificado.  
**stage**  
- GET /api/stage: Recupera todos os stages e suas respectivas informações.
- GET /api/stage/:id: Recupera um stage específico e suas informações.
- POST /api/stage: Cria um novo stage, com todas suas informações.
- PUT /api/stage/:id: Atualiza as informações de um stage existente.
- DELETE /api/stage/:id: Deleta o stage especificado.  
**performance**  
- GET /api/performance: Recupera todas as performances e suas respectivas informações.
- GET /api/performance/:id: Recupera uma performance específica e suas informações.
- POST /api/performance: Cria uma nova performance, com todas suas informações.
- PUT /api/performance/:id: Atualiza as informações de uma performance existente.
- DELETE /api/performance/:id: Deleta a performance especificada.  
**users**  
- GET /api/users: Recupera todos os usuários e suas respectivas informações.
- GET /api/users/:id: Recupera um usuário específico e suas informações.
- POST /api/users: Cria um novo usuário, com todas suas informações.
- PUT /api/users/:id: Atualiza as informações de um usuário existente.
- DELETE /api/users/:id: Deleta o usuário especificado.

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
	"data": {
      "id": 1, 
      "name": "Madonna", 
	   "biography": "Madonna Louise Ciccone, conhecida simplesmente como Madonna, nasceu em 16 de agosto de 1958 em Bay City, Michigan, EUA. Ela é uma cantora, compositora, atriz e empresária americana, frequentemente referida como a 'Rainha do Pop'.", 
	   "photo_url": "https://images.app.goo.gl/ "
	}
}
```

## Front-end:

## Testes:

## Deploy:

## Para o Usuário:
**- O que o software Maddiepalooza faz?**

**- Por que o software Maddiepalooza é útil?**

**- Como os usuários podem começar a usar o software Maddiepalooza?**

**- Quem mantém e contribui para o software Maddiepalooza?**
