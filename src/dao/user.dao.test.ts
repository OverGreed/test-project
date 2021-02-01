import * as sinon from 'sinon';
import { userDao } from './';
import { db } from '../services';
import { UserRole } from './interfaces';

describe('dao/user.dao', () => {
    const testUser = {
        username: 'test-42',
    };
    describe('getUserByName()', () => {
        let query: any;
        beforeAll(() => {
            query = sinon.stub(db, 'query')
                .onFirstCall().resolves({
                    rows: [testUser],
                })
                .onSecondCall().resolves({
                    rows: [],
                });
        });
        afterAll(() => query.restore());
        it.each([
            [true, testUser, 1],
            [false, null, 2],
        ])('Should return user[%s] %s', async (find, expectedUser, callCount) => {
            const actualUser = await userDao.getUserByName('test');
            expect(actualUser).toEqual(expectedUser);
            expect(query.callCount).toEqual(callCount);
            expect(query.getCall(0).args[1]).toEqual(['test']);
        });
    });
    describe('getUserById()', () => {
        let query: any;
        beforeAll(() => {
            query = sinon.stub(db, 'query')
                .onFirstCall().resolves({
                    rows: [testUser],
                })
                .onSecondCall().resolves({
                    rows: [],
                });
        });
        afterAll(() => query.restore());
        it.each([
            [true, testUser, 1],
            [false, null, 2],
        ])('Should return user[%s] %s', async (find, expectedUser, callCount) => {
            const actualUser = await userDao.getUserById(42);
            expect(actualUser).toEqual(expectedUser);
            expect(query.callCount).toEqual(callCount);
            expect(query.getCall(0).args[1]).toEqual([42]);
        });
    });
    describe('getEmails()', () => {
        let query: any;
        beforeAll(() => {
            query = sinon.stub(db, 'query')
                .onFirstCall().resolves({
                    rows: [{
                        email: 'test@test',
                    }],
                })
                .onSecondCall().resolves({
                    rows: [],
                });
        });
        afterAll(() => query.restore());
        it.each([
            [true, ['test@test'], 1],
            [false, [], 2],
        ])('Should return user[%s] %s', async (find, expectedEmails, callCount) => {
            const actualEmails = await userDao.getEmails([UserRole.ModeratorPlus]);
            console.log(actualEmails, expectedEmails);
            expect(actualEmails).toEqual(expectedEmails);
            expect(query.callCount).toEqual(callCount);
            expect(query.getCall(0).args[1]).toEqual([
                [UserRole.ModeratorPlus],
            ]);
        });
    });
});
