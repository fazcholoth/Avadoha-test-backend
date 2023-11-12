import Express  from "express";
import userRouts from './Routs/userRouts.js'
import cors from 'cors'
import bodyParser  from 'body-parser'
import { syncDatabase } from "./Models/db.js";
import dotenv from 'dotenv'

const app = Express()
dotenv.config()

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(bodyParser.json())


app.use('/api',userRouts)

const port = process.env.PORT || 5000;

app.listen(port ,()=>{
    console.log(`server started on port${port} `);
    syncDatabase()
})

