const bodyParser = require("body-parser");
const { Router } = require("express");
const router = Router();
const fetch = require("node-fetch");
router.post("/wordlength", async (req, res) => {
  try {
    const { value } = req.body;
    const data = await fetch("https://www.mrsoft.by/data.json", {
      method: "get",

      headers: { "Content-Type": "application/json" },
    });

    const json = await data.json();
    const result = json.data.filter((i) => i.length > value);
    if (!result.length) {
      return res.status(404).json({ message: "No results were found" });
    }
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});
router.post("/substring", async (req, res) => {
  try {
    const { value, checkBox } = req.body;
    const data = await fetch("https://www.mrsoft.by/data.json", {
      method: "get",

      headers: { "Content-Type": "application/json" },
    });
    const json = await data.json();
    let result = [];

    if (checkBox) {
      result = json.data.filter((i) => i.includes(value));
    } else {
      result = json.data.filter((i) => {
        return i.toUpperCase().includes(value.toUpperCase());
      });
    }

    if (!result.length) {
      return res.status(404).json({ message: "No results were found" });
    }
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
