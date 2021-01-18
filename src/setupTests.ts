// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'jest-localstorage-mock';
import { GlobalWithFetchMock } from 'jest-fetch-mock';
import { server } from './mocks/server';

const customGlobal: GlobalWithFetchMock = (global as unknown) as GlobalWithFetchMock;

customGlobal.fetch = require('jest-fetch-mock');

customGlobal.fetchMock = customGlobal.fetch;

// Establish API mocking before all tests.
beforeAll(() => {
  // axios.defaults.adapter = require('axios/lib/adapters/http');
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
