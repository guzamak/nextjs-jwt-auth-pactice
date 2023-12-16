import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { db } from "./db";
import * as jwt from 'jsonwebtoken';

export async function jwtAuth(token?: string) {

    if (!token) {
        return null
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
        console.log(decoded?.id )

        const userId = decoded?.id

        const checkuser = await db.user.findUnique({
            where:{
                id:userId
            }
        })

        if (!checkuser){
            return null
        }

        return checkuser

    } catch (error) {
        console.log(error)
        return null
    }
};


export async function checkowner(userId:number,itemid:number){
    //check owner 
}