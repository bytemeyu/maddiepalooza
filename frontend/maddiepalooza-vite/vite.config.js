import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0'
  }
  //Certifique-se de que o Vite está configurado para aceitar conexões de qualquer host, o que é especialmente importante quando se trabalha com containers Docker. Isso pode ser feito ajustando a configuração server.host no arquivo vite.config.js para '0.0.0.0'.
})
