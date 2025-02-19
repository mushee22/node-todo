import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/env.js'
import prisma from '../config/client.js';

export const authMiddleware = async (req, res, next) => {

    let token;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
    
        if (!token) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }
    
        const session = jwt.verify(token, JWT_SECRET);

        
      
        const user = await prisma.user.findUnique({
            where: {
                id: session?.id
            }
        });

        if(!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        req.user = user;
        next();
        
    } catch(error) {
        next(error);
    }
    

}

export default authMiddleware;