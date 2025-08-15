const dotenv = require("dotenv");
dotenv.config();

const promBundle = require("express-prom-bundle");
const winston = require("winston");
const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const compareHelper = require("./util/helpers/hbs/SameValue");
const healthRouter = require("./routes/health");
const indexRouter = require("./routes/index");

const sequelize = require("./context/appContext");

const Authors = require("./models/Authors");
const Books = require("./models/Books");
const Categories = require("./models/Categories");
const Publishers = require("./models/Publishers");

const logger = winston.createLogger({
  level: "info",
  transports: [new winston.transports.Console()],
  format: winston.format.json(),
});
if (process.env.NODE_ENV === "test") {
  logger.silent = true;
}

const app = express();

app.use(promBundle({ includeMethod: true, includePath: true }));

app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: { SameValue: compareHelper.SameValue },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

const skipPathsRegex = /^\/(metrics|favicon\.ico|public\/.*)$/;
app.use((req, _res, next) => {
  if (!skipPathsRegex.test(req.path)) {
    logger.info({ msg: "HTTP", method: req.method, path: req.path });
  }
  next();
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname}`),
});
app.use(multer({ storage: imageStorage }).single("image"));

app.use(healthRouter);
app.use(indexRouter);

Books.belongsTo(Categories, { constraint: true, onDelete: "CASCADE" });
Categories.hasMany(Books);
Books.belongsTo(Authors, { constraint: true, onDelete: "CASCADE" });
Authors.hasMany(Books);
Books.belongsTo(Publishers, { constraint: true, onDelete: "CASCADE" });
Publishers.hasMany(Books);

const PORT = process.env.PORT || 8200;


logger.info({ msg: "BookApp boot", env: process.env.NODE_ENV, port: PORT });

if (process.env.NODE_ENV !== "test") {
  sequelize
    .sync()
    .then(() => {
      app.listen(PORT, () =>
        logger.info({ msg: `Servidor escuchando en el puerto ${PORT}` })
      );
    })
    .catch((err) => {
      logger.error({ msg: "DB sync error", err });
      console.error(err);
    });
}

module.exports = app;