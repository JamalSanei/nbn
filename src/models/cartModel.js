const { cursor } = require("../config/mysql.config");

const model = `create table if not exists cart(
    id int primary key auto_increment,
    phoneUser varchar(255)not null,
    productId int not null
)`;

async function checkUserCart(phone, productId) {
  try {
    const result = await new Promise((resolve) => {
      cursor(
        `SELECT COUNT(*) as count FROM cart where phoneUser = ${phone} AND productId = ${productId}`,
        (err, res) => {
          if (err) {
            console.log(err);
            resolve(err);
          } else {
            resolve(JSON.parse(JSON.stringify(res)));
          }
        }
      );
    });
    return result[0];
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function add(phone, productId) {
  try {
    const result = await new Promise((resolve) => {
      cursor(
        `INSERT INTO cart (phoneUser,productId) VALUES (${phone},${productId})`,
        (err, res) => {
          if (err) {
            console.log(err);
            resolve(err);
          } else {
            resolve(JSON.parse(JSON.stringify(res)));
          }
        }
      );
    });
    return JSON.stringify(result);
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  model: model,
  checkUserCart: checkUserCart,
  add: add,
};
