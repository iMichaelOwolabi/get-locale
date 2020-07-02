const express = require('express');
const unirest = require('unirest');
require('dotenv').config();
const cors = require('cors')
const fs = require('fs');

const app = express();
app.use(cors())
const ipWhoisKey = process.env.IP_WHOIS_KEY;
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  const apiCall = unirest(

    "GET",
 
    `https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/${ip}`
 
  );
 
  apiCall.headers({
 
    "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
 
    "x-rapidapi-key": ipWhoisKey
 
  });
 
  apiCall.end(function(result) {
 
    if (res.error) throw new Error(result.error);
    
    fs.appendFile('https://github.com/iMichaelOwolabi/get-locale/blob/master/locale.txt', `********************\n ${result.body} \n`, (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!')
    });
    
    res.send('Happy to see you here');
 
  });

})


app.listen(port, () => {
  console.log('server running')
})