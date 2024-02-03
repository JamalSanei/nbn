function getBody(req) {
  return new Promise((resolve) => {
    const bodyParts = [];
    let body;
    req
      .on("data", (chunk) => {
        bodyParts.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(bodyParts).toString();
        resolve(JSON.parse(body));
      });
  });
}

module.exports = { getBody: getBody };
