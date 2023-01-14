import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'src/store/index';
import App from 'components/App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No root element exists.');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
