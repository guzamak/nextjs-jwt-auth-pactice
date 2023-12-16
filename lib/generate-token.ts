import * as jwt from "jsonwebtoken"

interface Jwtparam {
    id: number;
    email: string;
  }

export function generateAccessToken (user: Jwtparam) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string,{
        expiresIn: '1h',
      });
};
  
export function  generateRefreshToken  (user: Jwtparam) {
    //RefreshToken expiresIn 7day 
}