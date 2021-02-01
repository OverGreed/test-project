import { Router, Request, Response } from 'express';
import { userDao } from '../dao';
import { ResponseService } from '../services';
export const authRoute = Router();

authRoute.post('/login', async (req: Request, res: Response) => {
    ResponseService.ok(res, await userDao.getUserByName(<string>req.query.username));
});
