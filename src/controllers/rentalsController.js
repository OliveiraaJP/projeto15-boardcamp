import db from "../db.js";

export async function getAllRentals(req, res){
    
}

export async function deleteRental(req,res){
    const {id} = req.params
    try{
        const query = await db.query(`SELECT * FROM rentals WHERE id=$1`,[id])
        const hasRental = query.rows
        if(hasRental.length===0 || hasRental.rows[0].returnDate!==null ){
            res.status(400).send("Aluguel já finalizado ou inexistente")
            return
        }
        await db.query(`DELETE FROM rentals WHERE id=$1`,[id])
        res.sendStatus(200)
    }catch(error){
        console.log('error delete rental: ', error);
        res.sendStatus(500)
    }
}