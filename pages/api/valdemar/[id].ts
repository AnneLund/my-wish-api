import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../../src/db";

export default async function  getAllWishById(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === "GET") {
        const data = await executeQuery(`SELECT * FROM wishes2 WHERE id='${req.query.id}'`)
        res.status(201).json({data})
        console.log(data)
        return;
        }
        
        else{
            res.status(500).json({message: "Route not valid"})
        }
        
}
