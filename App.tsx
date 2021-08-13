import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './src/reducers';
import Navigation from './src/Navigation';

export default function App() {
  // LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

  const store = createStore(reducers, compose(applyMiddleware(thunk)));
  // LogBox.ignoreLogs(['Setting a timer']);

  return (
    <>
      <Provider store={store}>
        {/* <AsyncApp /> */}
        <Navigation />
      </Provider>
    </>
  );
}
