const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// create an Express REST API server that return JSON data i.e "Salam Malaysia Madani!!" when a user sends a GET request to the server's /api/ path
app.get('/api/', (req, res) => {
    res.json("Salam Malaysia Madani!!");
});


// create a route in the Express server that returns the JSON data from the "negeri.json" file when a user sends a GET request to the server's /api/negeri path
app.get('/api/negeri', (req, res) => {
    fs.readFile('negeri.json', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Error reading file' });
        } else {
            res.json(JSON.parse(data));
        }
    });
});


// create a POST request route in the Express server that add a new state as JSON object to the JSON data array from the "negeri.json" file and save the file
app.post('/api/negeri', (req, res) => {
    fs.readFile('negeri.json', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Error reading file' });
        } else {
            let negeri = JSON.parse(data);
            const newState = {
                id: negeri.length + 1,
                name: req.body.name
            };
            negeri.push(newState);
            fs.writeFile('negeri.json', JSON.stringify(negeri), (err) => {
                if (err) {
                    res.status(500).json({ message: 'Error writing file' });
                } else {
                    res.json({ message: 'State created' });
                }
            });
        }
    });
});


// create a PUT request route in the Express server that update the state name in the JSON data array from the "negeri.json" file according to its "id" and save the file
app.put('/api/negeri/:id', (req, res) => {
    fs.readFile('negeri.json', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Error reading file' });
        } else {
            let negeri = JSON.parse(data);
            const state = negeri.find(state => state.id === parseInt(req.params.id));
            if (state) {
                state.name = req.body.name;
                fs.writeFile('negeri.json', JSON.stringify(negeri), (err) => {
                    if (err) {
                        res.status(500).json({ message: 'Error writing file' });
                    } else {
                        res.json({ message: 'State updated' });
                    }
                });
            } else {
                res.status(404).json({ message: 'State not found' });
            }
        }
    });
});


// TODO: Challenge #2


module.exports = app;
