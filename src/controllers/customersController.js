import db from "../db.js";

export const getCustomers = async (req, res) => {
    const {cpf} = req.query

try {
    if(!cpf){
        const query = await db.query(`SELECT * FROM customers`);
        const customers = query.rows;
        if(customers.length===0){
            res.status(404).send("Ainda não há clientes");
            return
        }
        res.status(200).send(customers);
    }

    const query = await db.query(`SELECT * FROM customers WHERE cpf LIKE $1`, [cpf])    

} catch (error) {
    console.log('get customers: ', error);
    res.sendStatus(500);
}
}