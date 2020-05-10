const express = require("express");
const router = express.Router();
const path = require("path");
const uuid = require("uuid");
const Members = require("../modules/members");

router.get("/members", (req, res, next) => {
  Members.find({}, (err, member) => {
    if (err) {
      console.log("Member.find() error", err);
      return next(err);
    }
    console.log(member);
    res.render("index", Members);
  })
    .then((member) => {
      res.send(member);
    })
    .catch(next);
});

router.get("/members/:id", (req, res, next) => {
  Members.findById(req.params.id)
    .then((member) => {
      res.send(member);
    })
    .catch(next);
});

router.post("/members", (req, res, next) => {
  Members.create(req.body)
    .then((member) => {
      res.redirect("/test");

      res.send(member);
    })
    .catch(next);
});

router.put("/members/:id", (req, res, next) => {
  Members.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((member) => {
      res.send(member);
    })
    .catch(next);
});

router.delete("/members/:id", (req, res, next) => {
  Members.findByIdAndDelete({ _id: req.params.id })
    .then((member) => {
      res.send(member);
    })
    .catch(next);
});

module.exports = router;
