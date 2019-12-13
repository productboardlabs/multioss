import { hello } from './eslint-config';

test('#hello', () => {
  expect(hello).toBe('world');
});
