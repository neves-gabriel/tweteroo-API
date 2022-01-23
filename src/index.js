import express, { json } from "express";
import cors from 'cors';

const app = express()

app.use(cors())
app.use(json())

const users = [];
const tweets = [];

const usernameRegex = /^[a-zA-Z0-9]+$/;

const avatarRegex = /(https?:\/\/.*\.(?:png|jpg))/i;

app.post('/sign-up', (req, res) => {
    const newUser = req.body;

    if ( usernameRegex.test(newUser.username) && avatarRegex.test(newUser.avatar) ) {
        users.push(newUser);
        res.status(201).send('OK');
    } else {
        res.status(400).send('Todos os campos são obrigatórios!');
    }

})

app.post('/tweets', (req, res) => {
    const { tweet } = req.body;
    const username = req.headers.user;
    const newTweet = { username, tweet };

    if ( username !== undefined && usernameRegex.test(username) && tweet.length > 0 ) {
        tweets.unshift(newTweet);
        res.status(201).send('OK');
    } else {
        res.status(400).send('Todos os campos são obrigatórios!');
    }

})

app.listen(5000)