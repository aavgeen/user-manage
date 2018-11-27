
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react'
import { hydrate } from 'react-dom'
import "../extras/sortable.css";
import "../extras/sortable.js";
import "../styles.css";
import App from './App';

// import M from 'materialize-css'

hydrate(<App/>, document.getElementById('root'))
// The hydrate function hydrates a container that already has HTML content rendered by ReactDOMServer.
// This means the server-rendered markup is preserved and only event-handlers are attached when React takes over in the browser,
// allowing the initial load performance to be better.