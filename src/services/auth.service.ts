import { userDao } from '../dao';
import { Request, Response, NextFunction } from 'express';

export class AuthService {
    public async setUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (req.headers.authorization) {
            const id = parseInt(req.headers.authorization.split(' ')[1], 10);
            req.user = await userDao.getUserById(id);
        }
        next();
    }
}
