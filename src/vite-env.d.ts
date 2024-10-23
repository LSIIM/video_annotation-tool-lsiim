/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_API_KEY: string;
    // Adicione aqui outras variáveis que você está usando
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  