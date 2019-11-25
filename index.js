const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

const publicVapidKey = 'BMAinI7w6i8C9SxMBurVEZ1qDy8gIx_dpvcqpqdQDB5EfwyyC5prhLDHQ3Fzi9lgjV21A2yTdDJXRHzjbs7dJZw';
const privateVapidKey = '0OStDmk4WsVXVrlqktv-YgzIftIotmguBsntvQaTlF0';

webPush.setVapidDetails('mailto:marcelordrgs98@gmail.com', publicVapidKey, privateVapidKey);

// Subscribe Route
app.post('/subscribe', (req, res) => {
    //Get puish subscription object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({ title: "Push test" });

    // Pass object into sendNotification
    webPush.sendNotification(subscription, payload).catch(err => { console.error(err); });
});

const port = 5000;

app.listen(port, () => console.log(`server stated on port: ${port}`));