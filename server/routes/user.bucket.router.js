const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// This route *should* return the logged in users pets
router.get("/", rejectUnauthenticated, (req, res) => {
  pool
    .query(`SELECT * FROM "user_bucket_items" WHERE user_id=$1`, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});

// This route *should* add a pet for the logged in user
router.post("/", rejectUnauthenticated, async (req, res) => {
  pool
    .query(
      `INSERT INTO "user_bucket_items" (bucket_list_item, user_id) VALUES ($1, $2);`,
      [req.body.user_item, req.user.id]
    )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});

module.exports = router;
