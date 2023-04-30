import * as React from 'react';
import express from 'express';
import cors from 'cors';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';

import { App } from '../App';

import store from '../store';

const app = express();

app.use(cors());
app.use(express.static('dist'));

app.get('*', async (req, res) => {
  const preloadedState = store.getState();

  const { pipe } = renderToPipeableStream(
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/main.css"></link>
        <title>Rick and Morty</title>
      </head>
      <body>
        <div id="root">
          <StaticRouter location={req.url}>
            <Provider store={store}>
              <App />
            </Provider>
          </StaticRouter>
        </div>
      </body>
    </html>,
    {
      bootstrapScripts: ['/bundle.js'],
      bootstrapScriptContent: `window.__PRELOADED_STATE__= ${JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
      )}`,
      onShellReady() {
        res.setHeader('content-type', 'text/html');
        pipe(res);
      },
    }
  );
});

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
