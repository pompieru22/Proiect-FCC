const express = require('express');
const axios = require('axios');
const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use(express.static('public'));


app.get('/weather', async (req, res) => {

  const apiKey = 'aa0ba0fc85f2b0abeb3cbd2826acd568';


  const location = req.query.location || 'New York';

  try {
   
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;

   
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Eroare la solicitarea API-ului Weatherstack:', error);
    res.status(500).send('Eroare la obținerea datelor meteorologice');
  }
});


app.get('/historical', async (req, res) => {
    const apiKey = 'aa0ba0fc85f2b0abeb3cbd2826acd568';
    const location = req.query.location || 'New York';
    const historicalDate = req.query.historicalDate || '2015-01-21'; 
  
    const url = `https://api.weatherstack.com/historical?access_key=${apiKey}&query=${location}&historical_date=${historicalDate}`;
  
    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      console.error('Eroare la solicitarea datelor meteorologice istorice:', error);
      res.status(500).send('Eroare la obținerea datelor meteorologice istorice');
    }
  });
  