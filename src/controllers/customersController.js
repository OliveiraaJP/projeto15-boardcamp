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

export const getSingleCustomer = async (req, res) => {
    const id = req.params.id

    try {
        const query = await db.query(`SELECT * FROM customers WHERE id=$1`, [id])
        const customer = query.rows[0];
        if(customer.length===0){
            return res.status(404).send('User not found!');
        }

        res.status(200).send(customer);
    } catch (error) {
        console.log("error get single costumer: ", error);
        res.sendStatus(500)
    }
}