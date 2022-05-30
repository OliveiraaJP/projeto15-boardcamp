import db from "../db.js";

export const getCategories = async (req, res) => {
try {
    const query = await db.query('SELECT * FROM categories')
    const categories = query.rows
    return res.status(200).send(categories);
    
} catch (error) {
    console.log('error get caterogies: ', error);
    res.sendStatus(500)
}}

export const postCategories = async (req, res) => {
    const {name} = req.body

    try {
        const query = await db.query(
            `INSERT INTO categories (name) VALUES ($1)`, [name]
        )
        res.sendStatus(200)
    } catch (error) {
        console.log("error post categories: ", error);
        res.sendStatus(500)
    }
}