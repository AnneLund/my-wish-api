import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../../src/db";
import NextCors from 'nextjs-cors'

export default async function  getAllWishById(req: NextApiRequest, res: NextApiResponse) {

        
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccesStatus: 200,
    })
   

    if(req.method === "GET") {
        const {id} = req.body
        const data = await executeQuery(`SELECT * FROM anne WHERE id='${id}'`)
        res.status(201).json({data})
        console.log(data)
        return;
        }
        
        else{
            res.status(500).json({message: "Route not valid"})
        }
        
}
