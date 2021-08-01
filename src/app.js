const express = require("express");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const initViewRoute = require("./routers/view.routes");
const initUserRoute = require("./routers/user.routes");

require("dotenv").config();
require("./db/db.conn");

const app = express();
const port = process.env.PORT || 8000;

const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../layout/views");
const partials_path = path.join(__dirname, "../layout/partials/");

app.use(express.static(static_path));
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.set("view engine", "hbs");
app.set("views", views_path);
app.set("partials", views_path);
hbs.registerPartials(partials_path);

initViewRoute(app);
initUserRoute(app);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
