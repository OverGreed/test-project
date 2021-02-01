import { Router, Request, Response } from 'express';
import { ResponseService } from '../services';
import { postDao } from '../dao';
export const userRoute = Router();

userRoute.get('/:userId/posts', async (req: Request, res: Response) => {
    try {
        ResponseService.ok(res, await postDao.getByUserId(parseInt(req.params.userId, 10), req.body!.id));
    } catch (e) {
        ResponseService.error(res, e);
    }
});
