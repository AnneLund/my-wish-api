import executeQuery from "../../src/db";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from 'nextjs-cors'

export default async function getAllWishesById(req: NextApiRequest, res: NextApiResponse) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccesStatus: 200,
    })
   
if(req.method === "GET") {
   
const data = await executeQuery(`SELECT * FROM mikkel`)

res.status(201).json({message: "Data fetch", data})

console.log(data)
return;
}

else{
    res.status(500).json({message: "Route not valid"})
}

}