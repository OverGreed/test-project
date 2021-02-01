import { IUser } from '../dao/interfaces';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
