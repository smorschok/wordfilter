const express = require("express");

const app = express();
const http = require("http").createServer(app);
const port = process.env.PORT || 8080;

app.use(express.json({ extended: true }));

app.use("/api/data", require("./routes/data.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

http.listen(port, () => {
  console.log(`App started on port ${port} ...`);
});
