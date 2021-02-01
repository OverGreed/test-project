import * as express from 'express';
import { ResponseService } from '../services';
import { communityDao } from '../dao';

export const communityRoute = express.Router();

communityRoute.post('/:id/join', async (req, res) => {
    try {
        if (await communityDao.has(req.user!.id, parseInt(req.params.id, 10))) {
            return ResponseService.error(res, 'You already in this community');
        }
        await communityDao.join(
            req.user!.id,
            parseInt(req.params.id, 10),
        );
        ResponseService.ok(res, {
            success: true,
        });
    } catch (e) {
        ResponseService.error(res, e);
    }
});
