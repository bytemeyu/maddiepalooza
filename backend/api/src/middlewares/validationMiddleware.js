import { body } from 'express-validator';
import { artistService } from '../services/artistService.js';
import { stageService } from '../services/stageService.js';
import { usersService } from "../services/usersService.js";

export const validationMiddleware = {
    validateArtistCreationAndUpdate: [
        body('name')
        //body('campo'): Esta função é usada para especificar qual campo de entrada você deseja validar. O argumento passado para body deve ser o nome do campo que será buscado no corpo (body) da requisição HTTP. O express-validator também suporta query(), param(), cookie(), header() para buscar e validar dados de outras partes da requisição.
            .trim()
            //.algo(): Estas são funções de validação ou saneamento que você encadeia após a especificação do campo. Existem muitas funções disponíveis, cada uma projetada para uma forma específica de validação ou modificação dos dados. Exemplos incluem .isEmail(), .isInt(), .trim(), .notEmpty(), e muitas outras.
            .notEmpty().withMessage('O nome do artista é obrigatório')
            //.withMessage é um método usado para especificar uma mensagem de erro personalizada que será exibida quando a validação do campo falhar. Ele é sempre encadeado após uma chamada de validação.
            .isString().withMessage('O nome do artista deve ser uma string')
            .isLength({ max: 50 }).withMessage('O nome do artista não pode exceder 50 caracteres')
            .custom(async (name, { req }) => {
                //.custom() é projetada para aceitar uma função de validação personalizada, que você pode usar para implementar qualquer lógica de validação que não é diretamente suportada pelas funções de validação padrão. O seu primeiro parâmetro é sempre o valor do campo que está sendo validado (que no caso é 'name') - que não precisa ser extraído manualmente, pois já foi referenciado acima. O segundo parâmetro é um objeto que fornece mais contexto sobre a requisição, que, no caso, é uma desestruturação do objeto de contexto para acessar a requisição (o que é especialmente útil se você precisa de outras partes da requisição, como params, query, body, etc).
                const nameExists = await artistService.existenceOfTheSameArtistName(name,req.params.id);
                if (nameExists) {
                    throw new Error('Já existe um artista com esse nome no banco de dados');
                    //Se essa validação falhar é lançado um erro com uma mensagem específica. Esse lançamento de erro interrompe a execução da função e sinaliza ao express-validator que houve uma falha na validação.
                }
                return true;
                //Caso nenhuma exceção for lançada o código alcança o ponto de return true;, então o campo é considerado válido. Isso indica ao express-validator que o valor fornecido para o campo passou na validação personalizada sem erros.
            }),

        body('biography')
            .optional()
            .trim()
            .isString().withMessage('A biografia do artista deve ser uma string')
            .isLength({ max: 400 }).withMessage('A biografia não pode exceder 400 caracteres'),

        body('photo_url')
            .optional()
            .trim()
            .isURL().withMessage('A URL da foto deve ser válida')
            .isLength({ max: 400 }).withMessage('A URL da foto não pode exceder 400 caracteres')
            .custom(async (photo_url, { req }) => {
                const urlExists = await artistService.existenceOfTheSamePhotoUrl(photo_url, req.params.id);
                if (urlExists) {
                    throw new Error('A URL da foto já está em uso');
                }
                return true;}),
    ],

    validateStageCreationAndUpdate: [
        body('name')
            .optional()
            .trim()
            .isString().withMessage('O nome do palco deve ser uma string')
            .isLength({ max: 50 }).withMessage('O nome do palco não pode exceder 50 caracteres')
            .custom(async(name, { req }) => {
                const nameExists = await stageService.existenceOfTheSameStageName(name, req.params.id);
                if (nameExists) {
                    throw new Error('Já existe um palco com esse nome no banco de dados');
                }
                return true;}),
        
        body('location')
            .trim()
            .notEmpty().withMessage('A localização do palco é obrigatória')
            .isString().withMessage('A localização do palco deve ser uma string')
            .isLength({ max: 50 }).withMessage('A localização do palco não pode exceder 50 caracteres')
            .custom(async(location, { req }) => {
                const locationExists = await stageService.existenceOfTheSameStageLocation(location, req.params.id);
                if(locationExists) {
                    throw new Error('A localização de palco já está em uso');
                }
                return true;}),

        body('capacity')
            .trim()
            .notEmpty().withMessage('A capacidade do palco é obrigatória')
            .isInt().withMessage('A capacidade do palco deve ser um número inteiro'),
    ],

    validatePerformanceCreationAndUpdate: [
        body('artist_id')
            .trim()
            .notEmpty().withMessage('Um id válido de artista é obrigatório')
            .isInt().withMessage('O id do artista deve ser um número inteiro')
            .custom(async (artist_id, { req }) => {
                const id = req.body.artist_id;
                const artistExists = await artistService.getArtistById(id);
                if (!artistExists) {
                    throw new Error('Não existe um artista com esse id');
                }
                return true;
            }),

        body('stage_id')
            .trim()
            .notEmpty().withMessage('Um id válido de palco é obrigatório')
            .isInt().withMessage('O id do palco deve ser um número inteiro')
            .custom(async (stage_id, { req }) => {
                const id = req.body.stage_id;
                const stageExists = await stageService.getStageById(id);
                if (!stageExists) {
                    throw new Error('Não existe um palco com esse id');
                }
                return true;
            }),
        
        body('start_time')
            .isISO8601().withMessage('O horário de início não é um timestamp válido')
            .toDate(),
        
        body('end_time')
            .isISO8601().withMessage('O horário de término não é um timestamp válido')
            .toDate(),

        body().custom((value, { req }) => {
            const startTime = new Date(req.body.start_time);
            const endTime = new Date(req.body.end_time);
            if (startTime >= endTime) {
                throw new Error('O horário de início deve ser anterior ao horário de término');
            }
            return true;
        }),
        //O uso de body().custom(...) sem um value específico é apropriado quando você precisa validar interações ou regras que envolvem múltiplos campos no corpo da requisição HTTP. Você usa req.body diretamente para acessar e comparar os valores dos campos relevantes para sua lógica de validação.

        body().custom((value, { req }) => {
            const startTime = new Date(req.body.start_time);
            const endTime = new Date(req.body.end_time);
            const differenceInMinutes = (endTime - startTime) / (1000 * 60);
            if (differenceInMinutes < 60) {
                throw new Error('A duração mínima da performance deve ser de 1 hora');
            }
            return true;
        }),

        body('date')
            .isISO8601().withMessage('A data não é válida')
            .toDate(),
    ],

    validateUsersCreationAndUpdate: [
        body('email')
            .trim()
            .notEmpty().withMessage('O e-mail do usuário é obrigatório')
            .isEmail().withMessage('O e-mail não está em um formato válido')
            .custom(async (email, { req }) => {
                const id = req.params.id ? parseInt(req.params.id) : null;
                const existingEmail = await usersService.getUserByEmail(email);
                if (existingEmail && (!id || existingEmail.user_id !== id)) {
                    throw new Error('Este e-mail já está cadastrado por outro usuário');
                }
                return true;
            }),

        body('username')
            .trim()
            .notEmpty().withMessage('O username do usuário é obrigatório')
            .isLength({ min: 3, max: 20 }).withMessage('O username deve ter entre 3 e 20 caracteres')
            .custom(async (username, { req }) => {
                const id = req.params.id ? parseInt(req.params.id) : null;
                const existingUsername = await usersService.getUserByUsername(username);
                if (existingUsername && (!id || existingUsername.user_id !== id)) {
                    throw new Error('Este username já está cadastrado por outro usuário');
                }
                return true;
            }),

        body('password')
            .trim()
            .isLength({ min: 8, max: 20 }).withMessage('A senha deve ter entre 8 e 20 caracteres')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\*._,^%$#@&]).{8,20}$/).withMessage('A senha deve conter pelo menos um número, uma letra maiúscula, uma letra minúscula e um caractere especial (desses: *._,^%$#@&)'),

        body('role')
            .trim()
            .notEmpty().withMessage('O tipo de usuário é obrigatório')
            .isIn(['webadmin', 'producer', 'assistant']).withMessage('O tipo de usuário deve ser "webadmin", "producer" ou "assistant"'),
    ]
}

//Funcionamento Interno
//Especificação do Campo: Quando você chama body('nomeCampo'), você está criando um objeto de validação para esse campo específico. Isso define onde e o que o express-validator deve buscar no objeto de requisição para aplicar as regras de validação subsequentes.
//Validações Encadeadas: As funções de validação são chamadas em cadeia para aplicar várias regras a um campo específico. Cada função retorna um objeto que permite mais funções de validação ou saneamento a serem encadeadas. Isso torna fácil definir múltiplas regras de validação para um único campo.
//Execução e Resposta: Quando uma requisição é recebida, o express-validator processa cada validador na ordem em que foram definidos. Se alguma validação falhar, ela registra o erro. Após todas as validações serem processadas, você pode verificar se houve erros e responder adequadamente.