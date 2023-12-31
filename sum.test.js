const fs = require('fs');
const {sum, read, some} = require('./sum');

jest.mock('fs');

jest.cache()

test('sum test', () => {
    expect(sum(1, 2)).toBe(3);
});

test('read test', () => {
    fs.readFileSync.mockReturnValue('{"version": "1.0.0"}');
    expect(read()).toBe('v1');

    fs.readFileSync.mockReturnValue('{"version": "2.0.0"}');
    expect(read()).toBe('v2');
});

test('test some', () => {
    const callback = jest.fn();
    some(callback);
    // console.log('callback', callback, callback.mock.calls, callback.mock.calls[0], callback.mock.calls[1][0]);

    // expect(callback.mock.calls.length).toBe(1);
    expect(callback.mock.calls.length).toBe(2);

    expect(callback.mock.calls[0][0]).toBe(1);
    expect(callback.mock.calls[1][0]).toBe(2);
    // expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(1);
    expect(callback).toHaveBeenCalledWith(2);
});
