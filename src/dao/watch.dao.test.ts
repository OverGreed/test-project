import * as sinon from 'sinon';
import { watchDao } from './';
import { db } from '../services';

describe('dao/watch.dao', () => {
    describe('getWords()', () => {
        let query: any;
        beforeAll(() => {
            query = sinon.stub(db, 'query')
                .onFirstCall().resolves({
                    rows: [],
                })
                .onSecondCall().resolves({
                    rows: [{
                        word: 'test',
                    }],
                });
        });
        afterAll(() => query.restore());
        it.each([
            [1, []],
            [2, ['test']],
        ])('Should return for query %s values %s', async(callCount: number, expectedWords) => {
            const actualWords = await watchDao.getWords('test');
            expect(query.callCount).toEqual(callCount);
            expect(actualWords).toEqual(expectedWords);
        });
    });
});
