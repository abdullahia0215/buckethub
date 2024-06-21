const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  pool
    .query(`SELECT * FROM "user_bucket_items" WHERE user_id=$1 ORDER BY completion_status`, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});

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

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  pool
    .query(`DELETE FROM user_bucket_items WHERE id=$1 AND user_id=$2;`, [
      req.params.id,
      req.user.id,
    ])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in deleting user item", error);
    });
});
router.put("/:id", rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `UPDATE "user_bucket_items" SET completion_status=true WHERE id=$1 AND user_id=$2;`,
      [req.params.id, req.user.id]
    )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in updating completion", error);
    });
});
module.exports = router;
