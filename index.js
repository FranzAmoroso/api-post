/* 
API POST
 */

const express = require('express');
const app = express();
const {persone} = require('../persone');

//analizza i dati dei moduli HTML inviati e renderli disponibili nell'oggetto req.body 
app.use(express.urlencoded({extended: false}))

//converte dati json mandati da una richiesta HTTP in oggetti JavaScript.
app.use(express.json());


//sintassi di un codice per aggiungere dei nuovi dati  
/* app.post('/api/persone', (req, res) => {
    console.log(req.body);
    const persona = req.body
    persone.push(persona)
    res.status(200).json({success: true, data: persona})
}) */


//inviare il file HTML nella richiesta di root /home 
app.get('/home', (req,res) => {
    res.sendFile('index.html', {root: __dirname})
})

//cercare una persona specifica utilizzando il nome e cognome inviato dal form HTML e restituire la persona corrispondente o un messaggio di errore se la persona non è stata trovata.
app.post('/api/persone', (req,res) => {
    
    const nome = req.body.nome
    const cognome = req.body.cognome

    if(!nome || !cognome){
        res.status(400).json({success:false , message: "Compilare i campi obbligatori"})
    }
    const persona = persone.find((persona) => persona.nome == nome && persona.cognome == cognome)

    if(persona){
        res.status(200).json({success: true, data: persona})   
    }else {
        res.status(404).json({success:false, message: "Persona non trovata"})
    }
})

//localhost:3000
app.listen(3000);