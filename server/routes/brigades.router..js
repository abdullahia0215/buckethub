const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// --------------------------- GET REQUESTS FOR THE BRIGADE PAGES ----------------------------
router.get("/adventure", rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `
    SELECT category_bucket_list_items.id,
           category_bucket_list_items.user_id,
           category_bucket_list_items.public_bucket_list_item,
           COALESCE(SUM(user_votes.vote), 0) AS total_votes
    FROM category_bucket_list_items
    LEFT JOIN user_votes ON category_bucket_list_items.id = user_votes.bucket_list_item_id
    WHERE category_bucket_list_items.category_id = 1  
    GROUP BY category_bucket_list_items.id, category_bucket_list_items.user_id, category_bucket_list_items.public_bucket_list_item
    ORDER BY total_votes DESC;
    `
    )
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
    .query(
      `
    SELECT category_bucket_list_items.id,
           category_bucket_list_items.user_id,
           category_bucket_list_items.public_bucket_list_item,
           COALESCE(SUM(user_votes.vote), 0) AS total_votes
    FROM category_bucket_list_items
    LEFT JOIN user_votes ON category_bucket_list_items.id = user_votes.bucket_list_item_id
    WHERE category_bucket_list_items.category_id = 2  
    GROUP BY category_bucket_list_items.id, category_bucket_list_items.user_id, category_bucket_list_items.public_bucket_list_item
    ORDER BY total_votes DESC;
    `
    )
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
    .query(
      `
    SELECT category_bucket_list_items.id,
           category_bucket_list_items.user_id,
           category_bucket_list_items.public_bucket_list_item,
           COALESCE(SUM(user_votes.vote), 0) AS total_votes
    FROM category_bucket_list_items
    LEFT JOIN user_votes ON category_bucket_list_items.id = user_votes.bucket_list_item_id
    WHERE category_bucket_list_items.category_id = 3  
    GROUP BY category_bucket_list_items.id, category_bucket_list_items.user_id, category_bucket_list_items.public_bucket_list_item
    ORDER BY total_votes DESC;
    `
    )
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
    .query(
      `
    SELECT category_bucket_list_items.id,
           category_bucket_list_items.user_id,
           category_bucket_list_items.public_bucket_list_item,
           COALESCE(SUM(user_votes.vote), 0) AS total_votes
    FROM category_bucket_list_items
    LEFT JOIN user_votes ON category_bucket_list_items.id = user_votes.bucket_list_item_id
    WHERE category_bucket_list_items.category_id = 4  
    GROUP BY category_bucket_list_items.id, category_bucket_list_items.user_id, category_bucket_list_items.public_bucket_list_item
    ORDER BY total_votes DESC;
    `
    )
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
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `DELETE FROM category_bucket_list_items WHERE id=$1 AND user_id=$2;`,
      [req.params.id, req.user.id]
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
