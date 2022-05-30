import newGameSchema from "../schemas/newGameSchema.js"; 
import db from "../db.js";

export default async function  newGameValidation (req, res, next) {
    const {name, categoryId} = req.body

    const validation = newGameSchema.validate(req.body, { abortEarly: false});

    if(validation.error){
        return res.status(422).send(validation.error.details.map( detail => detail.message))
    }

    try {
        const hasCategorie = await db.query(`SELECT FROM categories WHERE id=$1`,[categoryId])
        if(hasCategorie.rows.length===0){
            res.status(409).send("Categoria inexistente")
            return
        }
        const hasGame = await db.query(`SELECT FROM games WHERE name ILIKE '${name}%'`)
        if(hasGame.rows.length!==0){
            res.status(409).send("Game já existente")
            return
        }

    } catch (error) {
        console.log('error new game validatation: ', error);
    }

    next();
}