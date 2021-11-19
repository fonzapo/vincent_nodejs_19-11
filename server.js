const http = require('http');
const fs = require('fs');
//const path = require('path');
const { handleFormSubmission, JSONtoHTML } = require('./utils');
require('dotenv').config();

const host = process.env.APP_LOCALHOST
const port = process.env.APP_PORT

http.createServer((req, res) => {
    let filePath = '.' + req.url;

    if (filePath.includes('.html')) {
        filePath = filePath.slice(0, 2) + 'views/' + filePath.slice(2)
    }

    console.log(req.url)
    if (req.url === '/') {
        filePath = './home.html'
    }

    fs.readFile(filePath, (error, content) => {
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
            if (req.method === "POST") {
                req.on('data', (data) => {
                    handleFormSubmission(data);
                })
                res.writeHead(302, {
                    'Location': '/students.html'
                });
                res.end(content)
            }
            else {
                if (req.url === "/students.html") {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(`
                        <meta charset="UTF-8" />
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <link rel="stylesheet" type="text/css" href="../assets/css/bootstrap.min.css" />
                        <title>Étudiants</title>

                        <div class="container">
                        <div class="row py-3">
                            <div class="col">
                            <a href="home.html" class="me-2 btn btn-secondary"> Accueil </a>
                            <a href="students.html" class="btn btn-secondary"> Étudiants </a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                            <h1>Liste d'étudiants</h1>
                            </div>
                        </div>
                        <div class="row">
                            <ul class="col" id="studentsList">
                                ${JSONtoHTML('./students.json')}
                            </ul>
                        </div>
                        </div>
                    `)
                }
                else {
                    res.end(content, 'utf-8');
                }
            }
        }
    });




}).listen(port);

console.log(`Ca tourne sur ${host}:${port}`);