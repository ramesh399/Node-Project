
var fs = require('fs');

let promise = new Promise((resolve, reject) => {
    fs.readFile("Tracker.txt", 'UTF-8', (error, data) => {
        if (error) {
            reject(new Error('the requested file does not exist!!'));
        }
        resolve(data);
    })
});

promise
.then((data) => { console.log(data) })
.catch((error) => { console.log(error) })
