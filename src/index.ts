
import  express, { Application }  from "express";
import routes from './routes/routes'
import path from "path";
const local =require('passport-local').Strategy
import morgan from 'morgan'
import sessionmiddleware from "./middlewares/session.middleware";
import pool from "./models/database";
import passport from './middlewares/passport.middleware'
const app:Application =express();
const port:number=5000;

app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(sessionmiddleware)
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth',routes);

app.get("/api/demo",(req,res)=>{
    console.log(req.isAuthenticated())
    res.json({sessionId:req.sessionID})
})


app.listen(port,()=>{
    // initializingPassport(passport);
    console.log(`listening to port ${port}`)
});
