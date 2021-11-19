const fs = require('fs');
const { JSDOM } = require('jsdom');

module.exports.handleFormSubmission = (data, res) => {
    const parsedData = decodeURIComponent(data)
        .replace("studentName=", "")
        .replace("studentDate=", "")
        .split("&")

    const formatName = (name) => {
        return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
    }

    fs.readFile('./students.json', 'utf-8', (err, jsondata) => {
        const parsedJSONfile = JSON.parse(jsondata);

        parsedJSONfile.push({
            name: formatName(parsedData[0]),
            birth: parsedData[1]
        });

        stringifiedJSON = JSON.stringify(parsedJSONfile);
        fs.writeFile('./students.json', stringifiedJSON, 'utf-8', (err) => {
            if (err) throw err;
            console.log('done')
        })
        //data = ''
        //res.render('/students.html')
        //res.end(data)
    })
}

module.exports.JSONtoHTML = (rawFile, divId) => {
    fs.readFile(rawFile, 'utf-8', (err, jsondata) => {
        const parsedJSONfile = JSON.parse(jsondata);

        // JSDOM.fromFile('./views/students.html', { contentType: 'text/html' })
        //     .then((dom) => {
        //         const parentDiv = dom.window.document.querySelector(divId);
        //         parentDiv.innerHTML = ''

        //         for (line of parsedJSONfile) {
        //             parentDiv.insertAdjacentHTML(
        //                 'afterbegin',
        //                 `<li>${line.name} ${line.birth}</li>`
        //             )
        //         }
        //         const newDom = dom.window.document.head.innerHTML + dom.window.document.body.innerHTML;

        //         fs.writeFile('./views/students.html', newDom, 'utf-8', (err) => {
        //             if (err) throw err;
        //             console.log('done')
        //         })
        //     }).catch((err) => {
        //         throw err;
        //     })
    })
    //console.log(rawFile)
}