import { postDao } from './index';

describe('dao/post.dao', () => {
    describe('format()', () => {
        let testData = 'test';
        let testSummaryData = 'test';
        for (let i = 0; i < 200; i = i + 1) {
            if (i < 99) {
                testSummaryData = `${testSummaryData} test${i}`;
            }
            testData = `${testData} test${i}`;
        }
        it('Should user only 100 words', () => {
            const testPost = {
                title: 'test',
                body: testData,
            };
            const actualPost = (postDao as any).format(testPost);
            expect(actualPost).toEqual({
                title: 'test',
                body: testData,
                summary: testSummaryData,
            });
        });
    });
});
