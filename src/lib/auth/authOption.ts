/* eslint-disable @typescript-eslint/no-explicit-any */
import GoogleProvider from "next-auth/providers/google";
import { users } from "../db/schemas";
import {db} from "../db/db";
import { NextAuthOptions } from "next-auth";
export const authOptions:NextAuthOptions = {
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            async profile (profile, token: any){ 
                console.log("profile" ,profile) 
                console.log("token" ,token) 
                const data = {
                    fname: profile.given_name,
                    lname: profile.family_name,
                    email : profile.email,
                    provider : 'Google',
                    externalId : profile.sub,
                    image: profile.picture,
                }
             
                try {
                    const user = await db.insert(users).values(data).onConflictDoUpdate({target: users.email, set:data}).returning();
                    return {
                        ...data,
                        name: data.fname + " " + data.lname,
                        id : String(user[0].id),
                        role: user[0].role
                    }
                } catch (error) {
                    console.log("error", error)
                    return{
                        id: ""
                    }
                }
                return {
                   id : profile.sub
                }

            }
        })
    ],
    callbacks: {
     session(data: any){
        return data
     },
        jwt({token, user}:{token: any, user: any}){
            if(user){
                token.id = user.id
                token.role = user.role
            }
            return token
        }

    }
}