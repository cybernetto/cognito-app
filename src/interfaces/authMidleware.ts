export interface Jwk {
    alg: string;
    e: string;
    kid: string;
    kty: string;
    n: string;
    use: string;
  }
  
  export interface DecodedToken {
    sub: string;
    iss: string;
    client_id: string;
    origin_jti: string;
    event_id: string;
    token_use: string;
    scope: string;
    auth_time: number;
    exp: number;
    iat: number;
    jti: string;
    username: string;
  }
  
  export interface UserAttributes {
    [key: string]: string | undefined;
    groups: string;
  }
  