const express = require('express');
const unirest = require('unirest');
require('dotenv').config();

const app = express();
const ipWhoisKey = process.env.IP_WHOIS_KEY;
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {

  const { ip } = req;

  console.log(ip);
  
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
 
    console.log(result.body);
 
    res.send(result.body);
 
  });

})


app.listen(port, () => {
  console.log('server running')
})