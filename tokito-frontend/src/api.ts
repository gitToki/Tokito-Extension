// api.ts
export interface Token {
    symbol: string;
    balance: string;
  }
  
  // Fonction pour récupérer les tokens d'une adresse
  export const getTokens = async (address: string): Promise<Token[]> => {
    try {
      // Appel à ton API pour récupérer la liste des tokens
      const response = await fetch(`https://api.tonapp.com/get-tokens/${address}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tokens');
      }
  
      const data = await response.json();
      return data.tokens || [];  // Assurez-vous que la réponse a une propriété 'tokens' qui contient la liste
    } catch (error) {
      console.error('Error fetching tokens:', error);
      return [];
    }
  };
  
  