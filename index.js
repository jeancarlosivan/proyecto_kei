const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json());


//Incio de Endpoint
app.post('/webhook', (req, res) => {
    console.log('POST: webhook');

    const body =req.body;
    if (body.object === 'page')
    {
        body.entry.forEach(entry => {
            //Procesan los Mensajes
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);

        });
        res.sendStatus(200).send('Evento Recibido');
    }
    else
    {
        res.sendStatus(404);
    }
});
app.get('/webhook', (req, res) => {
    console.log('GET: webhook');

    const VERIFY_TOKEN = 'KeilaKareliCandelaTaico';
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token)
    {
        if (mode === 'subscribe' && token === VERIFY_TOKEN)
        {
            console.log('WEBHOOK VALIDADO');
            res.status(200).send(challenge);
        }
        else
        {
            res.sendStatus(404);
        }
    }
    else
    {
        res.sendStatus(404);
    }
});

app.get('/',(req,res) => {
    req.status(200).send('Bienvenidos al Proyecto Keila');
});

app.listen(8080,() => {
    console.log('Servidor Activado......');
});