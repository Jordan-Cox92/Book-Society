import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';//used for applications which have a dynmamic server that knows how to handle any type of URL
import { BookSociety } from './components/BookSociety';





const container = document.getElementById("root");
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <BookSociety />         
  </BrowserRouter>
);


//this module is what kickstarts our app and routes to BookSociety.js
