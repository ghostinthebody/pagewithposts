import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store';
import { App } from './App.jsx'
// import { Posts } from './Pages/Posts.jsx';
import './index.css'


const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);