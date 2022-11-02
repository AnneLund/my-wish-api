import executeQuery from "../../src/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAllWishesById(req: NextApiRequest, res: NextApiResponse) {

   
if(req.method === "GET") {
   
const data = await executeQuery(`SELECT * FROM anne`)

res.status(201).json({message: "Data fetch", data})

console.log(data)
return;
}

else{
    res.status(500).json({message: "Route not valid"})
}

}
