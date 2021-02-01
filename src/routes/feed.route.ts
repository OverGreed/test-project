import { Router, Request, Response } from 'express';
import { postDao } from '../dao';
import { ResponseService } from '../services';
export const feedRoute = Router();

feedRoute.get('/', async (req: Request, res: Response) => {
    try {
        ResponseService.ok(res, await postDao.getFeed(req.user!));
    } catch (e) {
        ResponseService.error(res, e);
    }
});
