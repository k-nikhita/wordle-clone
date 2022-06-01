const axios = require("axios").default;
const express = require("express")
const cors = require('cors')
require('dotenv').config()
const app = express()
const path = require('path')

app.use(cors())

//Body Parser Middleware
app.use(express.json()) //will allow us to handle Raw JSON data
app.use(express.urlencoded({ extended: false })) //so that we can handle url encoded data

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/word', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: {count: '5', wordLength: '5'},
        headers: {
          'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.RAPID_API_KEY
        }
      };
      
      axios.request(options).then((response) => {
          console.log(response.data)
          res.json(response.data[0])
      }).catch((error) => {
          console.error(error)
      });
})

app.get('/check', (req, res) => {
    const word = req.query.word

    const options = {
        method: 'GET',
        url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
        params: {entry: word},
        headers: {
          'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.RAPID_API_KEY
        }
      };
      
      axios.request(options).then((response) => {
          console.log(response.data)
          res.json(response.data.result_msg)
      }).catch((error) => {
          console.error(error)
      })
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)) 