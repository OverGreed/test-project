import * as sinon from 'sinon';
import { ResponseService } from './';

describe('services/response.service', () => {
    const testResponse: any = {
        status: sinon.stub().returnsThis(),
        set: sinon.stub().returnsThis(),
        send: sinon.stub(),
    };
    const expectedHeaders = {
        'Content-type': 'application/json',
    };
    describe('static send()', () => {
        beforeEach(() => {
            testResponse.status.resetHistory();
            testResponse.set.resetHistory();
            testResponse.send.resetHistory();
        });
        it.each([
            [{ name: 'Dave' }, '{"name":"Dave"}'],
            ['Test', 'Test'],
        ])('Should format body %s to %s)', (testBody: any, expectedBody: any) => {
            ResponseService.send(testResponse, 200, testBody);
            expect(testResponse.status.callCount).toEqual(1);
            expect(testResponse.status.getCall(0).args).toEqual([200]);
            expect(testResponse.set.callCount).toEqual(1);
            expect(testResponse.set.getCall((0)).args).toEqual([expectedHeaders]);
            expect(testResponse.send.getCall(0).args).toEqual([expectedBody]);
        });
    });

    describe('static ok()', () => {
        it('Should call send method with code 200', () => {
            const send = sinon.stub(ResponseService, 'send');
            ResponseService.ok(testResponse, 'test');
            expect(send.callCount).toEqual(1);
            expect(send.getCall(0).args).toEqual([testResponse, 200, {
                success: true,
                data: 'test',
            }]);
            send.restore();
        });
    });

    describe('static error()', () => {
        it.each([
            [new Error('Test Message'), 'Test Message'],
            ['Test', 'Test'],
        ])('Should return for error %s value %s)', (testError, testRequest) => {
            const send = sinon.stub(ResponseService, 'send');
            ResponseService.error(testResponse, testError);
            expect(send.callCount).toEqual(1);
            expect(send.getCall(0).args).toEqual([testResponse, 500, {
                success: false,
                error: testRequest,
            }]);
            send.restore();
        });
    });
});
