

export interface JwtPayload {
  sub: string; 
  mobile: string; 
  nbf: number; 
  exp: number; 
  iat: number; 
  iss: string; 
}

export interface UserSession extends JwtPayload{
    accessToken: string;
    refreshToken: string;
}