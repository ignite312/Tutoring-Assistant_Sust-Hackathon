const express = require('express');
const bodyparser= require('body-parser');
const cors = require('cors');
const gpt = require('./src/gpt');
// const GeminiPro = require('./src/GeminiPro');
const mysqlDB = require('./src/mysqlDB');
const fs = require('fs');
const fileReader = require('./src/fileReader')

const PORT = 8000;
const gpt_Module = new gpt();
// const gemini = new GeminiPro();
const newDB = new mysqlDB();
const filereader = new fileReader();

const app = express();

app.use(bodyparser.json());
app.use(cors());

app.post('/create-question', async (req, res) => {
    try{
        console.log('Received request: ', req.body);
        const {totalQuestions, subjectName, selectedTopics, difficultyLevel} = req.body;
        console.log('selected tops: ', req.body.selectedTopics);
        const results = await gpt_Module.Create_Written_Question(parseInt(totalQuestions), subjectName, selectedTopics, difficultyLevel);
        return res.status(200).json({
            results: results
        });
    } catch(err){
        console.error('Error creating question: ', err);
        return res.status(400);
    }
}); 

app.post('/create-new-post', async (req, res) => {
    try{
        const user = req.body.username;
        const subjectName = req.body.subjectName;
        const selectedTopics = req.body.selectedTopics;
        const difficultyLevel = req.body.difficultyLevel;
        const description = req.body.description;
        const problems = req.body.problems;
        console.log(typeof(problems));
        for(let i = 0; i < problems.length; i++){ 
            console.log(problems[i]);
            await newDB.addDescQuestion(user, problems[i], "", subjectName, selectedTopics.join(' '), difficultyLevel);
        }
        await newDB.addNewPost(user, description, problems);
        return res.status(200);
    } catch(err){
        console.error('Error creating new post: ', err);
        return res.status(400);
    }
});

app.post('/get-posts', async(req, res)=>{
    try{
        const user = req.body.username;
        const results = await newDB.getAllPostsUser(user);
        console.log("got all posts", results);
        return res.status(200).json(results);
    } catch(err){
        console.error('Error creating question: ', err);
        return res.status(400);
    }
});

app.post('/create-questions-using-pdf', async (req, res) => {
    try{
        console.log('Received request: ', req.body);
        const {totalQuestions, subjectName, selectedTopics, difficultyLevel, text} = req.body;
        // filereader.readfile(filepath);
        console.log('selected tops: ', req.body.selectedTopics);
        const results = await gpt_Module.Create_Written_Question_PDF(parseInt(totalQuestions), subjectName, selectedTopics, difficultyLevel, text);
        return res.status(200).json({
            results: results
        });
    } catch(err){
        console.error('Error creating question: ', err);
        return res.status(400);
    }
});

app.post('/assessment', async (req, res) => {
    try{
        console.log(req.body);
        const {problemset, answerscript} = req.body;
        const results = await gpt_Module.Make_New_Assessment(problemset, answerscript);
        return res.status(200).json({
            results: JSON.parse(results)
        });
    }catch(err){
        console.error('Error making assessment: ', err);
        return res.status(400);
    }
});

// app.post('/pdf-upload')

// app.post('/create-question-gemini', async (req, res) => {
//     try{
//         console.log('Received request: ', req.body);
//         const {totalQuestions, subjectName, selectedTopics, difficultyLevel} = req.body;
//         console.log('selected tops: ', req.body.selectedTopics);
//         const results = await gemini.Create_Written_Question(parseInt(totalQuestions), subjectName, selectedTopics, difficultyLevel);
//         const resultsarray =
//         return res.status(200).json({results: results.split('\n\n')});
//     } catch(err){
//         console.error('Error creating question: ', err);
//         return res.status(400);
//     }
// });

app.listen(PORT, (err) => {
    if(err){
        console.error('Error creating server: ', err);
        return;
    }
    else{
        console.log('Server running on: localhost:8000');
    }
});