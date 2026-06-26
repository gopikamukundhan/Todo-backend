const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.0vsxbtu.mongodb.net",
  (err, records) => {
    console.log(err);
    console.log(records);
  }
);