var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

module.exports.initialize = function() {
  db.serialize(function() {
    db.run("CREATE TABLE posts (title TEXT, content TEXT, author NUMBER, created DATE, modified DATE)");

    var stmt = db.prepare("INSERT INTO posts VALUES (?, ?, ?, ?, ?)");
    for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i, "ipsum" + i, 1, new Date(), new Date());
    }
    stmt.finalize();
  });
};

module.exports.getUsers = function() {
  return new Promise((resolve, reject)=>{
    db.all("SELECT rowid AS id, title, content, author, created, modified FROM posts", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
