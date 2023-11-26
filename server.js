const express = require('express');
const axios = require('axios');
const app = express();

// Use the PORT environment variable provided by Azure, with a fallback to 3000 for local development
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for current weather
app.get('/weather', async (req, res) => {
  const apiKeyWeather = 'aa0ba0fc85f2b0abeb3cbd2826acd568';
  const location = req.query.location || 'New York';

  try {
    // Corrected URL using template literals
    const url = `http://api.weatherstack.com/current?access_key=${apiKeyWeather}&query=${location}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Eroare la solicitarea API-ului Weatherstack:', error);
    res.status(500).send('Eroare la obținerea datelor meteorologice');
  }
});

// Route for historical weather
app.get('/historical', async (req, res) => {
  const apiKeyWeather = 'aa0ba0fc85f2b0abeb3cbd2826acd568';
  const location = req.query.location || 'New York';
  const historicalDate = req.query.historicalDate || '2015-01-21';

  try {
    // Corrected URL using template literals
    const url = `https://api.weatherstack.com/historical?access_key=${apiKeyWeather}&query=${location}&historical_date=${historicalDate}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Eroare la solicitarea datelor meteorologice istorice:', error);
    res.status(500).send('Eroare la obținerea datelor meteorologice istorice');
  }
});
