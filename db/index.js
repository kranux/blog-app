module.exports = function() {
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database(':memory:');

  db.serialize(function() {
    db.run("CREATE TABLE posts (title TEXT, content TEXT, author NUMBER, created DATE, modified DATE)");

    var stmt = db.prepare("INSERT INTO posts VALUES (?, ?, ?, ?, ?)");
    for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i, "ipsum" + i, 1, new Date(), new Date());
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, title, content, author, created, modified FROM posts", function(err, row) {
      console.log(row.id + ": " + row.title, row.content, row.author, row.created, row.modified);
    });
  });

  db.close();
};
