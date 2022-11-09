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
        const data = await executeQuery(`SELECT * FROM wishes WHERE id='${req.query.id}'`)
        res.status(201).json({data})
        console.log(data)
        return;
        }
        
        else{
            res.status(500).json({message: "Route not valid"})
        }

        if(req.method === "PUT") {
            const {id, købt} = req.body
            console.log(req.body)
        
            if(!id){
                res.status(422).json({message: "Invalid id!"})
                return;
            }
        
            if(købt && id) {
                await executeQuery(`UPDATE wishes SET købt = '${købt}' WHERE id = '${id}'`)
                res.status(201).json({message: "'Købt' opdateret!"})
                return;
            }  
        
        //       else if (titel && description && url && image && id) {
        //    await executeQuery(`UPDATE wishes SET titel = '${titel}', image = '${image}', url = '${url}', description = '${description}' WHERE id = '${id}'`)
        //     res.status(201).json({message: "Data updated!"})
        //     return;
        //     }     
            
            else{
                res.status(500).json({message: "PUT-requesten fejlede..."})
            }
            }
}
