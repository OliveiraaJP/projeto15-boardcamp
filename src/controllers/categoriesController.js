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