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

if(req.method === "PUT") {
    const {titel, image, id, url, description, købt} = req.body
    console.log(req.body)
    if(!id){
        res.status(422).json({message: "Invalid id!"})
        return;
    }

    if(købt && id && !titel && !description && !url && !image) {
        await executeQuery(`UPDATE mikkel SET købt = '${købt}' WHERE id = '${id}'`)
        res.status(201).json({message: "'Købt' opdateret!"})
        return;
            }  

      else if (titel && description && url && image && id) {
   await executeQuery(`UPDATE mikkel SET titel = '${titel}', image = '${image}', url = '${url}', description = '${description}' WHERE id = '${id}'`)
    res.status(201).json({message: "Data updated!"})
    return;
    }          
    }

if(req.method === "DELETE") {
    const {id} = req.body
    if(!id){
        res.status(422).json({message: "Invalid data"})
        return;
    }
await executeQuery(`DELETE FROM mikkel WHERE id = '${id}'`)
res.status(201).json({message: "Data deleted!"})
return;
}

if(req.method === "POST") {
    const {titel, description, image, url, købt} = req.body

    // if(!username || !password){
    //     res.status(422).json({message: "Invalid data"})
    //     return;
    // }

    const data = await executeQuery(`INSERT INTO mikkel(titel, description, image, url, købt) VALUES('${titel}', '${description}', '${image}', '${url}', '${købt}')`)
    res.status(201).json({message: "Data created!", data})
    return;
}
}