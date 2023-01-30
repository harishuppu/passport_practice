


import passport from "passport";

import { Strategy as Localstrategy } from "passport-local";
import pool from "../models/database";

passport.use(
    new Localstrategy({
        usernameField:"email",
        passwordField:"password",
    },
    async(email,password,done)=>{
       try {
        const res=await pool.query(`select * from passportproject where email=$1`,[email]);
        const user=res.rows[0]
       
        if(res.rowCount===1 && user.password===password){
            done(null,user)
        }
        else{
            done(null,false)
        }
    }
     catch (error) {
            done(error)
           }
    }
    )
);

passport.serializeUser((user:any,done)=>{
done(null,user.id)
});

passport.deserializeUser(async (id:any,done:any)=>{
    try {
        const userinfo=await pool.query(`select * from passportproject where id=${1}`,[id])
    done(null,userinfo)
    } catch (error) {
        done(error);
    }
})

export default passport