import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { mockRepositoryData } from './__tests__/index.test';

export const apiHandlers = [
  http.get('api/repositories', () => {
    return HttpResponse.json(mockRepositoryData);
  }),
];

const mswServer = setupServer(...apiHandlers);

// Manage server during tests
beforeAll(() =>
  mswServer.listen({
    onUnhandledRequest: 'error',
  })
);
afterAll(() => mswServer.close());
afterEach(() => mswServer.resetHandlers());
