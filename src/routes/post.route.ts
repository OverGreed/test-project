import { Request, Response, Router } from 'express';
import { email, ResponseService } from '../services';
import { communityDao, postDao } from '../dao';
import { IPostCreateRequest, UserRole } from '../dao/interfaces';

export const postRoute = Router();

postRoute.post('/', async (req: Request, res: Response) => {
    try {
        const post = <IPostCreateRequest>req.body;
        if (!await communityDao.has(req.user!.id, req.body.communityId)) {
            return ResponseService.error(res, 'You can post only to your communities');
        }
        const item = await postDao.create(req.user!.id, post);
        email.send(item);
        return ResponseService.ok(res, item);
    } catch (e) {
        ResponseService.error(res, e);
    }
});

postRoute.put('/:id', async (req: Request, res: Response) => {
    try {
        const post = <IPostCreateRequest>req.body;
        const postId = parseInt(req.params.id, 10);

        if (!await communityDao.has(req.user!.id, req.body.communityId)) {
            return ResponseService.error(res, 'You can post only to your communities');
        }
        if (!await postDao.hasPost(req.user!.id, postId) || req.user!.role === UserRole.ModeratorPlus) {
            return ResponseService.error(res, 'You can edit only your posts');
        }
        return ResponseService.ok(res, await postDao.update(postId, post));
    } catch (e) {
        ResponseService.error(res, e);
    }
});

postRoute.get('/:id', async (req: Request, res: Response) => {
    try {
        ResponseService.ok(res, await postDao.get(parseInt(req.params.id, 10), req.user!.id));
    } catch (e) {
        ResponseService.error(res, e);
    }
});

postRoute.put('/:postId/like', async (req: Request, res: Response) => {
    try {
        await postDao.like(
            req.user!.id,
            parseInt(req.params.postId, 10),
        );
        ResponseService.ok(res);
    } catch (e) {
        ResponseService.error(res, e);
    }
});

postRoute.put('/:postId/approve', async (req: Request, res: Response) => {
    try {
        if (req.user!.role !== UserRole.Moderator && req.user!.role !== UserRole.ModeratorPlus) {
            return ResponseService.error(res, 'You are not allowed to approve posts');
        }

        await postDao.approve(
            parseInt(req.params.postId, 10),
        );
        ResponseService.ok(res);
    } catch (e) {
        ResponseService.error(res, e);
    }
});
