import executeQuery from "../../src/db";
import NextCors from 'nextjs-cors'
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAllUsersById(req: NextApiRequest, res: NextApiResponse) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccesStatus: 200,
    })

    if(req.method === "PUT") {
        const {username, password} = req.body
        if(!username || !password){
            res.status(422).json({message: "Invalid data"})
            return;
        }
await executeQuery(`UPDATE users SET username = '${username}' WHERE username = '${username}'`)
res.status(201).json({message: "Data updated!"})
return;
    }

    if(req.method === "DELETE") {
        const {id} = req.body
        if(!id){
            res.status(422).json({message: "Invalid data"})
            return;
        }
await executeQuery(`DELETE FROM users WHERE id = '${id}'`)
res.status(201).json({message: "Data deleted!"})
return;
    }

    if(req.method === "POST") {
        const {username, password, id} = req.body
      

        if (!username || !password) {
            res.status(201).json({message: "Udfyld felt"})
            return;
        } 

        if (username && password) {
            console.log(req.body)

        const user = await executeQuery(`SELECT password, username FROM users WHERE username ='${username}', password = '${password}' ` )
        

        if (user[0].password == password) {
            res.status(200).json({message: "Logged in!", status: true, user})
            return;
        }

        res.status(401).json({message: "Forkert kode eller brugernavn", status: false})

        return;    
        }
        }

      

// if(!username || !password) {
//     res.status(422).json({message: "Invalid data"})
//     return;  

// } else {
    

if(req.method === "GET") {

const user = await executeQuery(`SELECT * FROM users`)
res.status(201).json({message: "Data fetch", user})

return;
}
else{
    res.status(500).json({message: "Route not valid"})
}
}
