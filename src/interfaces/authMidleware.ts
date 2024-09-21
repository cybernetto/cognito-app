// src/interfaces/authMidleware.ts

export interface JwtHeader {
    alg: string;
    kid: string;
  }
  
  export interface JwtPayload {
    // Adicione os campos que você espera no payload
    sub: string;
    iss: string;
    exp: number;
    // Outros campos conforme necessário
  }
  
  export interface Jwk {
    kty: string;
    alg: string;
    use: string;
    kid: string;
    x5c: string[];
  }