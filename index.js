import './loadEnv.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import todosRouter from './routes/todos.js';
import axios from 'axios';
import db from './db/conn.js';

const app = express()
const PORT = process.env.PORT || 4000;

//Middlewares
app.use(cors()); //Connects backend to frontend
app.use(morgan('dev')); //To see whats being logged in
app.use((express.json())); // To receive data request in the body
app.use(express.urlencoded({extended:true})); // Allows data in url string

//Routes
app.use('/api/todos', todosRouter);
app.get('/', (req, res) => {
    res.send('backend...')
});
app.post('/login',async (req, res) => {
    const collection = await db.collection('users');
    const user= await collection.findOne({userName:req.body.email});
    if(!user){
        res.status(404).json('User does not exist') //not found
        return
    }   
    if (user.password != req.body.password){
        res.status(404).json('User does not exist') //not found
        return
    }
    console.log(req.body)
    res.status(200).json({userName:req.body.email})
});
app.post('/signup',async (req, res) => {
    const collection = await db.collection('users');
    if(await collection.findOne({userName:req.body.email})){
        res.status(422).json('User name already taken') //unprocessible content
        return
    }   
    await collection.insertOne({
        userName: req.body.email,
        password: req.body.password

    })

    console.log(req.body)
    res.status(200).json({userName:req.body.email})
});
app.get('/weather',async (req, res) => {
const response= await axios.get('http://api.weatherapi.com/v1/current.json?q=new%20york&key='+ process.env.WEATHER_API_KEY)
res.status(200).json(response.data)
})




app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`)
});