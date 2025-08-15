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

// ⚠️ Vuelve a importar sequelize si lo usas (relaciones/sync)
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

const app = express();

// Métricas (expone /metrics)
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

// Multer (sin cambios)
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname}`),
});
app.use(multer({ storage: imageStorage }).single("image"));

// ✅ Monta /health antes del indexRouter
app.use(healthRouter);

// Resto de rutas
app.use(indexRouter);

// Relaciones (si las usas aquí)
Books.belongsTo(Categories, { constraint: true, onDelete: "CASCADE" });
Categories.hasMany(Books);
Books.belongsTo(Authors, { constraint: true, onDelete: "CASCADE" });
Authors.hasMany(Books);
Books.belongsTo(Publishers, { constraint: true, onDelete: "CASCADE" });
Publishers.hasMany(Books);

const PORT = process.env.PORT || 8200;

// En producción y dev: arranca. En test: solo exporta app.
if (process.env.NODE_ENV !== "test") {
  sequelize
    .sync()
    .then(() => {
      app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
    })
    .catch(err => console.error(err));
}

module.exports = app;
