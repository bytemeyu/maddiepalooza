module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "node"],
  testMatch: ["**/tests/**/*.test.js"], // Padrão de busca para seus testes
};

//O arquivo jest.config.js também deve usar CommonJS com module.exports em vez de export default, mesmo que você esteja usando ES Modules no resto do projeto. O motivo é que o Jest, por padrão, espera que o arquivo de configuração (jest.config.js) seja um módulo CommonJS, já que o Jest internamente usa o sistema de módulos CommonJS para carregar a configuração, mesmo que você use ES Modules no seu código e testes.
