import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './common/components/app/App';
import './locales/i18n';

Sentry.init({
  dsn: window._env_.REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate:
    // no traces if not in prod or test
    window._env_.REACT_APP_DISABLE_SENTRY === '1' ? 0.0 : 1.0,
  environment: process.env.NODE_ENV,
});

if (window._env_.REACT_APP_MOCK_API === 'use') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const { worker } = require('./domain/mocks/browser');
  worker.start();
}

if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then((axe) => {
    // https://github.com/dequelabs/axe-core-npm/issues/176
    axe.default(React, ReactDOM, 1000, {}, undefined);
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
  });
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _env_: any;
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
