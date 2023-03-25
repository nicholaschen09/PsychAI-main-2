const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');


const configuration = new Configuration({
    organization: "org-DHzhd6WVMSOFpTaltod5SWAv",
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();

app.use(bodyparser.json());
app.use(cors());

const port = 8080;

app.post('/', async (req, res) => { 
    const message = req.body.message
    let prompt = `Helpful Comforting therapist that helps the user' prompt with their problems \n${message} \n AI:`
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 256,
            temperature: 0.9,
        });
        res.json({
            message: response.data.choices[0].text,
        })
    } catch (error) {
        console.error(error)
        res.json({
            message: "Sorry, my connection timed out. Please try again later.",
        })
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    }
);