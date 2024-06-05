import { PayloadHandler } from "payload/config";
import * as jwt from 'jsonwebtoken';


interface DecodeToken {
    id: string;
    collection: string;
    email: string;
    iat: number;
    exp: number;
}


const { PAYLOAD_SECRET } = process.env;

export const validateJWT: PayloadHandler = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }

        const decodedToken = jwt.decode(token);

        if (typeof decodedToken === 'string') {
            res.status(404).json({ message: "Unauthorazed" });
        } else {
        const exp = validateTokenExpiration(decodedToken as DecodeToken);
            if (!exp) {
                res.status(404).json({ message: "Token expired" });
            }
        }
        req.user = decodedToken;

        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const validateTokenExpiration = (decodedToken: DecodeToken): boolean => {
    try {

      const currentTime = Math.floor(Date.now() / 1000);
      
      if (decodedToken.exp < currentTime) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error verifying token expiration:', error.message);
      return false;
    }
};