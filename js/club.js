document.addEventListener("DOMContentLoaded", function() {
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");
    let btnSave = document.getElementById("save");
    let item;
    if (isFromSaved) {
      btnSave.style.display = 'none';
      
      getSavedClubById();
    } else {
      item = getClubById();
      item.then(function(club) {
        getById(club.id).then(function (db) {
          if (db) {
            if (db.id == club.id) {
              btnSave.innerHTML = "Saved";
              btnSave.style.pointerEvents="none";
              btnSave.style.cursor="default";
              btnSave.style.opacity = "0.5";
            }
          }
        });
      });
    }

    btnSave.onclick = function() {
      console.log("Tombol FAB di klik.");
      item.then(function(club) {
        saveForLater(club);
      });
    };
});