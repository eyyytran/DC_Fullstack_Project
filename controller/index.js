const express = require("express");
const app = express();
const usersRoutes = require("./routes/users");
const projectsRoutes = require("./routes/projects");
const cardsRoutes = require("./routes/cards");
const es6Renderer = require("express-es6-template-engine");
const PORT = 3001;
//middleware
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/projects", projectsRoutes);
app.use("/cards", cardsRoutes);

app.use(express.static("public"));
app.engine("html", es6Renderer);
app.set("views", "./public/views");
app.set("view engine", "html");
//listening port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});