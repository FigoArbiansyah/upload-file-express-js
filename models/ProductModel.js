import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define(
  "products", // table name
  {
    // Fields
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    // Options
    freezeTableName: true,
  }
);

export default Product;

// If the table is not exist

(async () => {
  await db.sync();
})();
