
import { NextFunction ,Request,Response} from "express";
import expressSession from "express-session";
import session from "express-session";
import pool from '../models/database'
const pgSession = require('connect-pg-simple')(session);
const sessionmiddleware=(req:Request,res:Response,next:NextFunction)=>{
    
    
return session({
    // store: new pgSession({
    //     pool : pool,                // Connection pool
    //     tableName : 'user_session'   // Use another table-name than the default "session" one
    //     // Insert connect-pg-simple options here
    //   }),
    secret:"tbiuwewebf",
    resave:false,
    saveUninitialized:false,
    // store: new pgSession('postgres://postgres:root@localhost:5432/mydb')
    
})(req,res,next);
}

export default sessionmiddleware