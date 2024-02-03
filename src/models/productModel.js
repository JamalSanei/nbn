const { cursor } = require("../config/mysql.config");

const model = `create table if not exists product(
    id int primary key auto_increment,
    name varchar(255)not null,
    picture varchar(255),
    discount BOOLEAN default 0
)`;

async function getAll() {
  try {
    const products = await new Promise((resolve) => {
      cursor(`SELECT * FROM product`, (err, res) => {
        if (err) {
          console.log(err);
          resolve(err);
        }
        resolve(JSON.parse(JSON.stringify(res)));
      });
    });
    // console.log(JSON.stringify(products)); // debug
    return JSON.stringify(products);
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function get(productId) {
  try {
    const product = await new Promise((resolve) => {
      cursor(`SELECT  * FROM  product where id = ${productId}`, (err, res) => {
        if (err) {
          console.log(err);
          resolve(err);
        } else {
          resolve(JSON.parse(JSON.stringify(res)));
        }
      });
    });
    return product[0];
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  model: model,
  getAll: getAll,
  get: get,
};
