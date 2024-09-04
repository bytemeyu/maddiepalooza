module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
        modules: false, // Mantém o ES Modules para a aplicação
      },
    ],
  ],
  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current",
            },
            modules: "commonjs", // Converte para CommonJS apenas para os testes
          },
        ],
      ],
    },
  },
};
//O Jest ainda não tem suporte nativo completo para usar babel.config.js com ES Modules, então, para evitar problemas, manter o arquivo de configuração do Babel como um módulo CommonJS (ou seja, com module.exports) é uma prática mais segura.
