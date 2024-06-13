import { body } from 'express-validator';
import { artistService } from '../services/artistService.js';
import { stageService } from '../services/stageService.js';

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
                //Caso nenhuma exceção for lançada o código alcança o ponto de return true;, então o campo é considerado válido.Isso indica ao express-validator que o valor fornecido para o campo passou na validação personalizada sem erros.
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
    ]
}

//Funcionamento Interno
//Especificação do Campo: Quando você chama body('nomeCampo'), você está criando um objeto de validação para esse campo específico. Isso define onde e o que o express-validator deve buscar no objeto de requisição para aplicar as regras de validação subsequentes.
//Validações Encadeadas: As funções de validação são chamadas em cadeia para aplicar várias regras a um campo específico. Cada função retorna um objeto que permite mais funções de validação ou saneamento a serem encadeadas. Isso torna fácil definir múltiplas regras de validação para um único campo.
//Execução e Resposta: Quando uma requisição é recebida, o express-validator processa cada validador na ordem em que foram definidos. Se alguma validação falhar, ela registra o erro. Após todas as validações serem processadas, você pode verificar se houve erros e responder adequadamente.