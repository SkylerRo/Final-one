import { Router } from "express";
import db from '../db/conn.js';

const router = new Router();
// set up two routes both of which will retrieve and create todos

router.get('/:userName', async (req, res) => {
    try {
        console.log(req.params.userName)
        const collection = await db.collection('todos');
    
        const todos = await collection.find({userName:req.params.userName}).toArray();
       
    
       
        res.status(200).json(todos);
  
    } catch (error) {
        console.log(error);
        res.status(500).json('Something went wrong')
    }
});
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const collection = await db.collection('todos');
    await collection.insertOne({userName:req.body.userName,todo:req.body.todo})
       
       
        res.status(200).json('success');
  
    } catch (error) {
        console.log(error);
        res.status(500).json('Something went wrong')
    }
});



export default router;