import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore as createStore } from '@reduxjs/toolkit'
import mainReducer from './redux/reducers/mainReducer' //ruta de mi reducer principal

const reduxStore = createStore({reducer:mainReducer}) // crea dentro de la variable con el metodo create store un sotre que tiene un objeto que contiene dentro nuestro reducerMain
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // indico a mi provedor donde esta almanenado la info= en el store de reduxStore
  <Provider store= {reduxStore}> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);


