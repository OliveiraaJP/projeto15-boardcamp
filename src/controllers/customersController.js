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

export const registerCustomer = async (req, res) => {
    const {name, phone, cpf, birthday} = req.body

    try {
        const query = await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4)`, [name, phone, cpf, birthday]);
        res.status(201).send('Cadastro realizado')
    } catch (error) {
        console.log('error regirter customer: ', error);
    }
}

export const editCustomer = async (req, res) => {
    const {id} = req.params
    const {name, phone, cpf, birthday} = req.body

    try {
        const validCPF = await db.query(`SELECT * FROM customers WHERE cpf=$1 AND id!=$2`, [cpf,id]);
        const hasUser = validCPF.rows;
        if(hasUser.length !== 0){
            return res.status(409).send('Usuario já cadastradão')
        }

        const query = await db.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`, [name, phone, cpf, birthday, id ]);
        res.status(200).send('Usuario alterado')
    } catch (error) {
        console.log('edit customer: ', error);
        res.sendStatus(500)
    }
}