import  express, { Application ,Request,response,Response}  from "express";
import { request } from "http";
import path from "path";
const app:Application=express();
import pool from '../models/database'
import passport = require("passport");
import {login} from '../controller/usercontroller' 



app.set('views', path.join(__dirname,"..", 'views'));

app.get('/',(req,res)=>{
    res.send("home page")
})

app.get('/users',async (req:Request,res:Response)=>{
    
    await pool.query(`select * from passportproject`,(err:any,result:any)=>{
        if(err) console.log(err.message)
        else{
            res.send(result.rows)
        }  
      })
})

// app.get('/register',async (req:Request,res:Response)=>{
    
//    res.render("register")
// })

// app.get('/login',async (req:Request,res:Response)=>{
    
//     res.render("login")
//  })

app.post('/register',async (req:Request,res:Response)=>{
    const user= req.body
    await pool.query(`select * from passportproject where email=$1`,[user.email],(err:any,result:any)=>{
        if(err) console.log(err.message)
        else if(result.rowCount===0){  
             pool.query(`INSERT INTO "passportproject"("email",  "password") VALUES ($1 ,$2)`,[user.email,user.password],(err:any,result:any)=>{
                if(err){console.log(err.message) }
                else  res.send("success");
            })  
            
        }
        else{
            res.send("user already exists");
        }

      })
})

app.post('/login',login)


// app.get('/finduser/:username',async(req:Request,res:Response)=>{
//     const u= req.params
//    const user= await pool.query(`select * from passportproject where email=$1`,[u.username])
//   res.send(user.rows[0].userid.toString())
// })



export default app;