const sequelize = require("../context/appContext");
const app = require("../app");
const dotenv = require("dotenv");
dotenv.config();

sequelize
  .sync()
  .then(() => {
    app.listen(8200, () => {
      console.log(`Servidor escuchando en el puerto 8200`);
    });
  })
  .catch((err) => {
    console.error(err);
  });