const axios = require("axios");

async function callApi(){
    
    var config = {
        method: 'get',
        url: 'http://localhost:3000/price/hourly',
        headers: { 
        'Content-Type': 'application/json',
        }
    };
            
    await axios(config).then(response => {
        console.log(response.data);
    })
    
}

callApi();