let dbPromised = idb.open("club-detail", 1, function(upgradeDb) {
    let clubsObjectStore = upgradeDb.createObjectStore("clubs", {keyPath: "id"});
    clubsObjectStore.createIndex("club_id", "club_id", { unique: false });
  });

function saveForLater(club) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("clubs", "readwrite");
      var store = tx.objectStore("clubs");
      console.log(club);
      store.add(club);
      return tx.complete;
    })
    .then(function() {
      console.log("Artikel berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("clubs", "readonly");
        var store = tx.objectStore("clubs");
        return store.getAll();
      })
      .then(function(clubs) {
        resolve(clubs);
      });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("clubs", "readonly");
        var store = tx.objectStore("clubs");
        return store.get(id);
      })
      .then(function(club) {
        console.log(club);
        resolve(club);
      });
  });
}

function delById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("clubs", "readwrite");
        var store = tx.objectStore("clubs");
        return store.delete(id);
      })
      .then(function(club) {
        console.log(club);
        resolve(club);
      });
  });
}