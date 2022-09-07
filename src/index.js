import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {Auth0Provider} from '@auth0/auth0-react'
// RTK
import {store} from './Store/store'; 
import {Provider} from 'react-redux'; 

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENTID}
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById('root')
);
