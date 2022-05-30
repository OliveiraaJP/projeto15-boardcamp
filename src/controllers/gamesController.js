import db from "../db.js";

export const getGames = async (req, res) => {
  //const { name } = req.query;

  try {
    const query =
      await db.query(`SELECT games.*, categories.name AS "categoryName" FROM games
    JOIN categories ON games."categoryId" = categories.id`);
    const games = query.rows;
    if (games.length === 0) {
      return res.status(404).send("Não possuímos esse(s) jogo(s)!");
    }
    res.status(200).send(games);
  } catch (error) {
    console.log("get games error: ", error);
    res.sendStatus(500);
  }
};

export const postGames = async (req, res) => {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    const query = await db.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1,$2,$3,$4,$5)`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.status(201).send("Jogo cadastrado!");
  } catch (error) {
    console.log("post games error: ", error);
    res.sendStatus(500);
  }
};
