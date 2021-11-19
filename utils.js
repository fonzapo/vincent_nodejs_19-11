const fs = require('fs');
const { JSDOM } = require('jsdom');
const { parse } = require('querystring');
const { format } = require('date-fns')

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

    })
}

module.exports.JSONtoHTML = (rawFile) => {
    let students = '';
    const rawData = fs.readFileSync(rawFile);
    const parsedData = JSON.parse(rawData)

    for (student of parsedData) {
        const { name, birth } = student;
        const formattedDate = format(new Date(birth), 'dd-MM-yyyy');
        students += `<li>${name} ${formattedDate}</li>`
    }
    return students;
}