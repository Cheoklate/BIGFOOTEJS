import express from 'express';
import { read } from './jsonFileStorage.js';

const app = express();

app.set('view engine', 'ejs');

const handleIncomingRequestIndex = (request, response) => {
  read('data.json', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }    // Respond with the name at the index specified in the URL       
    const { index } = request.params;
    const info = JSON.stringify(data.sightings[index]);
    console.log(index);
    response.render('index', data);
  });
};

const handleIncomingRequestPage = (request, response) => {
  read('data.json', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }    // Respond with the name at the index specified in the URL    
    // const data = sightings   
    const { index } = request.params;
    data.info = JSON.stringify(data.sightings[index]);
    console.log(index);
    // console.log(JSON.stringify(data[index]));
    data.index = index


    response.render('page', data);
  });
};

// index is a URL path parameter
// app.get('/names/:index', handleIncomingRequest);

app.get('/sightings', handleIncomingRequestIndex);
app.get('/sightings/:index', handleIncomingRequestPage);


app.listen(3004);