require('dotenv').config()
const Twitter = require('twitter-v2');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

getTweets();

async function getTweets () {
    const rules ={
        "add": [
            //set your own rules
            { "value": "#CCGaming"},
            { "value": "@cryancaire"},
        ]
    };
    try {
        const sendRules = client.post(`tweets/search/stream/rules`, rules);
        const stream = client.stream('tweets/search/stream');

        for await (const { data } of stream) {
            //do something with the data
            console.log(data);
        }
        stream.close();
    }
    catch(error) {
        console.log(error)
    }
    
}