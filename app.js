const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const sequelize = require("./context/appContext");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const compareHelper = require("./util/helpers/hbs/SameValue");

const Authors = require("./models/Authors");
const Books = require("./models/Books");
const Categories = require("./models/Categories");
const Publishers = require("./models/Publishers");

const indexRouter = require("./routes/index");

const app = express();

app.engine("hbs", engine({
  layoutsDir: "views/layouts/",
  defaultLayout: "main-layout",
  extname: "hbs",
  helpers: {
    SameValue: compareHelper.SameValue,
  }
}));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));


app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static(path.join(__dirname, "public")));

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

app.use(multer({ storage: imageStorage }).single("image"));


app.use(indexRouter);

Books.belongsTo(Categories, {
  constraint: true,
  onDelete: "CASCADE",
});
Categories.hasMany(Books);

Books.belongsTo(Authors, {
  constraint: true,
  onDelete: "CASCADE",
});
Authors.hasMany(Books);

Books.belongsTo(Publishers, {
  constraint: true,
  onDelete: "CASCADE",
});
Publishers.hasMany(Books);

sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log("Servidor escuchando en el puerto 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });