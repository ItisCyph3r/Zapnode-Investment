const express = require('express');
const request = require('request');
const https = require('https');
const bodyParser = require('body-parser');
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

// 4505fca264e3ed1dcd4c9dabe7b6303a-us14

// 626890c3bb

app.get('/', (res, req) =>{
    req.sendFile(__dirname + '/signup.html')
})

app.post('/', (res, req) =>{
    const firstname = res.body.fname
    const lastname = res.body.lname
    const email = res.body.email
    var data = {
        members: [
            {
                email_address: email,
                status: 'unsubscribed',
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname,
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data)

    
    const url = 'https://us14.api.mailchimp.com/3.0/lists/3fe3b3ee3c/';

    const options = {
        method: 'POST',
        auth: 'samuel1:505fca264e3ed1dcd4c9dabe7b6303a-us14',
    }

    const request = https.request(url, options, (response) =>{
        if(response.statusCode === 200){
            req.sendFile(__dirname + '/success.html')
        }
        else{
            req.sendFile(__dirname + '/failure.html')
        }
        response.on('data', (data) =>{
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData)
    request.end()

})

app.post('/failure', (res, req)=>{
    req.redirect('/')
})
app.listen(port, () =>{
    console.log('Listening to server on port ' + port)
})












// https://us6.api.mailchimp.com/3.0/lists/57afe96172/members/62eeb292278cc15f5817cb78f7790b08/notes
    // var url = 'https://us14.api.mailchimp.com/3.0/lists/626890c3bb/' + data + '/62eeb292278cc15f5817cb78f7790b08/notes'   







// const client = require("@mailchimp/mailchimp_marketing");

//     client.setConfig({
//         apiKey: '4505fca264e3ed1dcd4c9dabe7b6303a-us14',
//         server: "us14",
//     });

// const run = async () => {
//   const response = await client.lists.getAllLists();
//   console.log(response);
// };

// run();