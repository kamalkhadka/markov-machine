/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');

let method = process.argv[2];

if(method === 'file'){
    let path = process.argv[3];
    makeFileText(path);
}

if(method === 'url'){
    let url = process.argv[3];
    makeUrlText(url);
}

function makeFileText(path){
    fs.readFile(path, 'utf-8', (err, data) =>{
        if(err){
            console.log('Error reading file: ', path);
            process.exit(1);
        }
        else 
        {
            markovText(data);
        }
    })
}

async function makeUrlText(url){
    try{
        let resp = await axios.get(url);
        markovText(resp.data);
    }
    catch (err){
        console.log('Error: ', url, err);
        process.exit(1);
    }
} 

function markovText(text){
    let markovText = new markov.MarkovMachine(text);
    console.log(markovText.makeText());
}




