import Express from 'express';
import Gistogram from '../app/web/index.js';
import ReactDOMServer from 'react-dom/server';
import {AppRegistry} from 'react-native';

// register the app
AppRegistry.registerComponent('Gistogram', () => Gistogram);

// prerender the app
const {element, getStyleElement} = AppRegistry.getApplication('Gistogram');

const html = ReactDOMServer.renderToString(element);
const css = ReactDOMServer.renderToStaticMarkup(getStyleElement());

// example HTML document string
const document = `
    <!DOCTYPE html>
    <html>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${css}
    ${html}
`;

function handleRender(req, res) {
    res.send(document);
}

const app = Express();
const port = 3000;
//Serve static files
app.use('/static', Express.static('static'));
// This is fired every time the server side receives a request
app.use(handleRender);

app.listen(port);

console.log(`App is listening on port ${port}`);
