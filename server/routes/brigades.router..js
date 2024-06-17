const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// --------------------------- GET REQUESTS FOR THE BRIGADE PAGES ----------------------------
router.get("/adventure", rejectUnauthenticated, (req, res) => {
  pool
    .query(`SELECT * FROM "category_bucket_list_items" WHERE category_id=1;`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});

router.get("/growth", rejectUnauthenticated, async (req, res) => {
  pool
    .query(`SELECT * FROM "category_bucket_list_items" WHERE category_id=2;`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});
router.get("/culture", rejectUnauthenticated, async (req, res) => {
  pool
    .query(`SELECT * FROM "category_bucket_list_items" WHERE category_id=3;`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});
router.get("/service", rejectUnauthenticated, async (req, res) => {
  pool
    .query(`SELECT * FROM "category_bucket_list_items" WHERE category_id=4;`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});

// --------------------------- POST REQUESTS FOR THE BRIGADE PAGES ----------------------------
router.post("/adventure", rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `INSERT INTO "category_bucket_list_items" (category_id, user_id, public_bucket_list_item) VALUES ($1, $2, $3)`,
      [1, req.user.id, req.body.public_item]
    )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(201);
      console.log(error);
    });
});
router.post("/growth", rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `INSERT INTO "category_bucket_list_items" (category_id, user_id, public_bucket_list_item) VALUES ($1, $2, $3)`,
      [2, req.user.id, req.body.public_item]
    )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(201);
      console.log(error);
    });
});
router.post("/culture", rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `INSERT INTO "category_bucket_list_items" (category_id, user_id, public_bucket_list_item) VALUES ($1, $2, $3)`,
      [3, req.user.id, req.body.public_item]
    )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(201);
      console.log(error);
    });
});
router.post("/service", rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `INSERT INTO "category_bucket_list_items" (category_id, user_id, public_bucket_list_item) VALUES ($1, $2, $3)`,
      [4, req.user.id, req.body.public_item]
    )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(201);
      console.log(error);
    });
});
// --------------------------- DELETE REQUESTS FOR THE BRIGADE PAGES ----------------------------
router.delete("/", rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `DELETE FROM category_bucket_list_items WHERE id=$1 AND user_id=$2;`,
      [req.body.public_itemID, req.user.id]
    )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in deleting public item", error);
    });
});

module.exports = router;
