import {GoogleGenerativeAI} from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

import webSurf  from "../pw.js";



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });



import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    console.log('hey');
  res.send("Hello from Agent API");
});

router.post("/", async(req, res) => {

    try{
  const{ prompt, tool} = req.body;
  console.log('prompt', req.body);
  if(tool === 'gemini'){
    console.log('tool', tool);
  const result = await model.generateContent(prompt);
  const chatResponse = result?.response?.text();
  console.log('this is the result', chatResponse);
  res.send(chatResponse);
  }
  else{
    console.log('tool', tool);
    // const result = await 
    webSurf(prompt);
    res.send('success');
  }
}
catch(error){
    res.status(500).send({error: error.message});
    console.error(error);
}

});

export default router;
