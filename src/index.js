import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { BookSociety } from './components/BookSociety';





const container = document.getElementById("root");
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <BookSociety />
  </BrowserRouter>
);


//this module is what kickstarts our app and renders BookSociety.js
