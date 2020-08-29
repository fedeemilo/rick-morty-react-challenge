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

let store = generateStore()

let url = 'https://rickandmortyapi.com/graphql/'

let client = new ApolloClient({
  uri: url
})

let WithStore = () => (
  <Provider store={store}>
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();