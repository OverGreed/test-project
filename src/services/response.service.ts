import { Response }  from 'express';

export class ResponseService {
    static send<T>(res: Response<T>, code: number, body?: T): void {
        res.status(code).set({
            'Content-type': 'application/json',
        }).send(typeof body === 'string' ? body : JSON.stringify(body) as any as T);
    }

    static ok<T>(res: Response<T>, body?: T): void {
        ResponseService.send(res, 200, {
            success: true,
            data: body,
        } as any as T);
    }

    static error(res: Response, error?: any): void {
        ResponseService.send(res, 500, {
            success: false,
            error: error && error.message ? error.message : error,
        });
    }
}
