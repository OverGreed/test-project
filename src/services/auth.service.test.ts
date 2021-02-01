import * as sinon from 'sinon';
import { auth } from './';
import { userDao } from '../dao';
import { IUser } from '../dao/interfaces';

describe('services/auth.service', () => {
    describe('setUser()', () => {
        it('Should set user to request object if header is present', async () => {
            const testUser: IUser = {
                id: 42,
                username: 'test',
                image: '',
                country: 'UA',
            };
            const request: any = {
                headers: {
                    authorization: 'Bearer 42',
                },
            };
            const cb = sinon.stub();
            const getUserById = sinon.stub(userDao, 'getUserById').resolves(testUser);
            await auth.setUser(request, <any>{}, cb);
            expect(cb.callCount).toEqual(1);
            expect(getUserById.getCall(0).args).toEqual([42]);
            expect(request.user).toEqual(testUser);
            getUserById.restore();
        });
        it('Should not set user and call cb', async () => {
            const request = <any>{
                headers: {},
            };
            const cb = sinon.stub();
            await auth.setUser(request, <any>{}, cb);
            expect(cb.callCount).toEqual(1);
            expect(request.user).toEqual(undefined);
        });
    });
});
