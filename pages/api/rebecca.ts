import executeQuery from "../../src/db";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from 'nextjs-cors'

export default async function getAllWishesById(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccesStatus: 200,
        'Access-Control-Allow-Origin': ' http://127.0.0.1:3000',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })
   
if(req.method === "GET") {
   
const data = await executeQuery(`SELECT * FROM wishes`)
res.status(201).json({message: "Data fetch", data})

return;
}

else{
    res.status(500).json({message: "Route not valid"})
}

if(req.method === "PUT") {
    const {titel, image, id, url, description, købt} = req.body
    console.log(req.body)

    if(!id){
        res.status(422).json({message: "Invalid id!"})
        return;
    }

    if(købt && id && !titel && !description && !url && !image) {
        await executeQuery(`UPDATE wishes SET købt = '${købt}' WHERE id = '${id}'`)
        res.status(201).json({message: "'Købt' opdateret!"})
        return;
    }  

      else if (titel && description && url && image && id) {
   await executeQuery(`UPDATE wishes SET titel = '${titel}', image = '${image}', url = '${url}', description = '${description}' WHERE id = '${id}'`)
    res.status(201).json({message: "Data updated!"})
    return;
    }          
    }

if(req.method === "DELETE") {
    const {id} = req.body
    console.log(req.body)
    if(!id){
        res.status(422).json({message: "Invalid data"})
        return;
    }
await executeQuery(`DELETE FROM wishes WHERE id = '${id}'`)
res.status(201).json({message: "Data deleted!"})
return;
}


if(req.method === "POST") {
    const {titel, description, image, url, købt} = req.body

    const data = await executeQuery(`INSERT INTO wishes(titel, description, image, url, købt) VALUES('${titel}', '${description}', '${image}', '${url}', '${købt}')`)
    res.status(201).json({message: "Data created!", data})
   
    return;
}


}