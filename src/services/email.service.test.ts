import * as sinon from 'sinon';
import { email } from './';
import { IPost, PostStatus } from '../dao/interfaces';
import { userDao, watchDao } from '../dao';

describe('services/email.service', () => {
    describe('sendEmail()', () => {
        it('Should call console.log', () => {
            const log = sinon.stub(console, 'log');
            const testData = {
                to: ['test@test.com'],
                subject: 'Test',
                body: 'It is a test',
            };
            (email as any).sendEmail(testData);

            expect(log.callCount).toEqual(1);
            expect(log.getCall(0).args).toEqual(['send email called', testData]);
            log.restore();
        });
    });

    describe('send()', () => {
        const testPost: IPost  = {
            id: 1,
            title: 'test3',
            body: 'test',
            communityId: 2,
            image: '',
            status: PostStatus.Pending,
            summary: 'test1',
            tags: ['test1'],
        };
        let sendEmail: any;
        let getEmails: any;
        let getWords: any;
        beforeAll(() => {
            sendEmail = sinon.stub(email as any, 'sendEmail');
            getEmails = sinon.stub(userDao, 'getEmails').resolves(['test@test', 'test1@test']);
            getWords = sinon.stub(watchDao, 'getWords')
                .onFirstCall().resolves([])
                .onSecondCall().resolves(['rude']);
        });
        beforeEach(() => {
            getEmails.resetHistory();
        });
        afterAll(() => {
            sendEmail.restore();
            getEmails.restore();
            getWords.restore();
        });
        it.each([
            [1, 1, 1],
            [2, 2, 3],
        ])('Should send emails', async (getEmailsCalls, getWordsCalls, sendEmailCount) => {
            await email.send(testPost);
            expect(getEmails.callCount).toEqual(getEmailsCalls);
            expect(getWords.callCount).toEqual(getWordsCalls);
            expect(sendEmail.callCount).toEqual(sendEmailCount);
        });
    });

});
