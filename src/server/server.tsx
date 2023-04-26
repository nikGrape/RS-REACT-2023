import * as React from 'react';
import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';

import { App } from '../App';

import store from '../store';

const app = express();

app.use(cors());
app.use(express.static('dist'));

app.get('*', async (req, res) => {
  const markup = renderToString(
    <StaticRouter location={req.url}>
      <Provider store={store}>
        <App></App>
      </Provider>
    </StaticRouter>
  );

  const preloadedState = store.getState();

  res.send(
    `
        <!DOCTYPE html>
        <html>
          <head>
            <title>RS</title>
            <script src="/bundle.js" defer></script>
            <link href="/main.css" rel="stylesheet">
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script>
              window.__PRELOADED_STATE__= ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
          </head>
          <body>
            <div id="root">${markup}</div>
          </body>
        </html>
      `
  );
});

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
