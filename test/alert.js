const axios = require("axios");

async function callApi(){
    
    var config = {
        method: 'post',
        url: 'http://localhost:3000/alert',
        headers: { 
        'Content-Type': 'application/json',
        },
        data: {
            chain: 'ethereum',
            dollar: 2489,
            email: 'ubaidshabbir.aptechiic@gmail.com'

        }

    };
            
    await axios(config).then(response => {
        console.log(response.data);
    })
    
}

callApi();