const { cursor } = require("../config/mysql.config");
const model = `create table if not exists warehouse(
    id int primary key auto_increment,
    productId int not null,
    count int not null default 10
    
)`;

async function get(productId) {
  try {
    const result = await new Promise((reslove) => {
      cursor(
        `SELECT w.count FROM warehouse w where productId=${productId}`,
        (err, res) => {
          if (err) {
            console.log(err);
            reslove(err);
          } else {
            reslove(JSON.parse(JSON.stringify(res)));
          }
        }
      );
    });
    // console.log(`count of product: ${result[0]["count"]}`); // debug
    return result[0]["count"];
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  model: model,
  get: get,
};
