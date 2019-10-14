import { logLevel } from '../src/Logger';

describe('logLevel', () => {
  it('Uses log level debug for development', () => {
    expect(logLevel('development')).toBe('debug');
  });

  it('Uses log level info for production', () => {
    expect(logLevel('production')).toBe('info');
  });

  it('Uses log level error for test', () => {
    expect(logLevel('test')).toBe('error');
  });
});
