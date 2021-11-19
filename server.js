const http = require('http');
const fs = require('fs');
const path = require('path');
const { handleFormSubmission, JSONtoHTML } = require('./utils');
require('dotenv').config();

const host = process.env.APP_LOCALHOST
const port = process.env.APP_PORT

http.createServer((req, res) => {
    let filePath = '.' + req.url;

    if (filePath.includes('.html')) {
        filePath = filePath.slice(0, 2) + 'views/' + filePath.slice(2)
    }

    const extname = String(path.extname(filePath)).toLowerCase();

    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
    };
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    //console.log(filePath)

    fs.readFile((filePath), (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write("La page n'existe pas")
                res.end(content, 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Erreur interne: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });

            res.end(content, 'utf-8');
        }
        // if (filePath === './views/students.html') {
            
        // }
    });

    req.on('data', (data) => {
        handleFormSubmission(data, res)
        
        //JSONtoHTML('./students.json', '#studentsList')
    });

}).listen(port);

console.log(`Ca tourne sur ${host}:${port}`);