
import { Request,Response,NextFunction } from "express";
import passport from "../middlewares/passport.middleware";

// export const signup= async(req:Request,res:Response,next:NextFunction)=>{};


export const login= (req:Request,res:Response,next:NextFunction)=>{

    passport.authenticate("local",(err,user,info)=>{
        if(!user){res.status(401).json({
            message:"email and password is not matched"
        })}
        req.login(user,(err)=>{
            if(err) throw err;

            res.status(201).json(user)
        })
   }
   )(req,res,next)
};


export const logout= (req:Request,res:Response,next:NextFunction)=>{};


export const me= (req:Request,res:Response,next:NextFunction)=>{};
