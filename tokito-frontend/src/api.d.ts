// src/api.d.ts

declare module './api' {
    export const saveWallet: (privateKey: string, address: string) => Promise<any>;
    export const getWalletInfo: (address: string) => Promise<any>;
  
    // token infra
    export interface Token {
      name: string;
      symbol: string;
      balance: string;
    }
  
    
    export const getTokens: (address: string) => Promise<Token[]>;
  }
  