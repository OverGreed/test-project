import * as sinon from 'sinon';
import { communityDao } from './';
import { db } from '../services';

describe('dao/community.dao', () => {
    describe('join()', () => {
        it('Should call db query with values', async() => {
            const query = sinon.stub(db, 'query').resolves();
            await communityDao.join(1, 2);
            expect(query.callCount).toEqual(1);
            expect(query.getCall(0).args[1]).toEqual([1, 2]);
            query.restore();
        });
    });
    describe('has()', () => {
        it.each([
            [{ rows: [{ total: 0 }] }, false],
            [{ rows: [{ total: 1 }] }, true],
        ])('Should on result %s return %s', async (resultValue, expectedResultValue) => {
            const query = sinon.stub(db, 'query').resolves(resultValue);
            const actualResultValue = await communityDao.has(1, 2);
            expect(actualResultValue).toEqual(expectedResultValue);
            expect(query.callCount).toEqual(1);
            expect(query.getCall(0).args[1]).toEqual([1, 2]);
            query.restore();
        });
    });
});
