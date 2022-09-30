import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  rootElement
);
