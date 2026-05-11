import express from 'express'
import userRouter from './routes/user.route.js'
import cors from 'cors'
const app =express()

app.use(cors());
app.use(express.json());

//routes declaration
app.get('/api',(req,res)=>{
    res.send("Api Running~")
})

app.use('/api/user',userRouter)

export default app;