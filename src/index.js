import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
// redux and apollo
import { Provider } from 'react-redux'
import generateStore from './redux/store'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import ScrollUpButton from "react-scroll-up-button";

let store = generateStore()

let url = 'https://rickandmortyapi.com/graphql/'

let client = new ApolloClient({
  uri: url
})

let WithStore = () => (
  <Provider store={store}>
    <ScrollUpButton style={{marginBottom: '3rem'}} />
    <App />
  </Provider>
)

let WithApollo = () => (
  <ApolloProvider client={client}>
    <WithStore />
  </ApolloProvider>
)

ReactDOM.render(
  <WithApollo />,
  document.getElementById('root')
);

serviceWorker.unregister();
