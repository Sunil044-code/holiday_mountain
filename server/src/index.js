import dotenv from 'dotenv'
import connectDb from './config/database.js';
import app from './app.js';

dotenv.config({
    path:'./.env'
});


const startServer=async () => {
    const PORT= process.env.PORT || 8000

    try {
        await connectDb();
       app.on("error",(error)=>{
        console.log("ERROR",error)
        throw error;
       });

       app.listen(PORT ,()=>{
        console.log(`Server is running on PORT ${PORT}`)
       })
    } catch (error) {
        console.log("ERROR while connecting to Database",error)
        process.exit(1)
    }
    
}
startServer()