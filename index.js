const PORT = 8000
const axios = require("axios").default;
const express = require("express")

const app = express()

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)) 

app.get('/word', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: {count: '5', wordLength: '5'},
        headers: {
          'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
          'X-RapidAPI-Key': '0c01f076b2mshc78fb1f8b2c8361p10c73cjsnd481550d1b06'
        }
      };
      
      axios.request(options).then((response) => {
          console.log(response.data);
          res.json(response.data[0])
      }).catch((error) => {
          console.error(error);
      });
})
