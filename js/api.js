const BASE_URL = "https://api.football-data.org/v2/";
const API_KEY = "975306a677b5443a907de9b44516c82a";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  console.log(error);
}

// Blok kode untuk melakukan request data json
function getStandings() {
  if ('caches' in window) {
    caches.match(BASE_URL + "competitions/2021/standings").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          let standingsHTML = "";
          data.standings[0].table.forEach(function(standing) {
            standingsHTML += `
                  <tr>
                    <td>
                      <a href="./club.html?id=${standing.team.id}">
                        <img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/><br>${standing.team.name}
                      </a>
                    </td>
                    <td>${standing.playedGames}</td>
                    <td>${standing.won}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.points}</td>
                  </tr>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("standings").innerHTML = standingsHTML;
        })
      }
    })
  }

  fetch(BASE_URL + "competitions/2021/standings", {
    headers : { 'X-Auth-Token' : API_KEY }
  })
  .then(status)
  .then(json)
  .then(function(data) {
      let standingsHTML = "";
      data.standings[0].table.forEach(function(standing) {
        standingsHTML += `
          <tr>
            <td>
              <a href="./club.html?id=${standing.team.id}">
                <img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/><br>${standing.team.name}
              </a>
            </td>
            <td>${standing.playedGames}</td>
            <td>${standing.won}</td>
            <td>${standing.lost}</td>
            <td>${standing.draw}</td>
            <td>${standing.points}</td>
          </tr>
        `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standings").innerHTML = standingsHTML;
  })
  .catch(error);
}

function getClubById() {
  return new Promise(function(resolve, reject){
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    if ('caches' in window) {
      caches.match(BASE_URL + "teams/"+ idParam).then(function(response) {
        if (response) {
          response.json().then(function (data) {
            let clubHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.crestUrl}" />
                </div>
                <div class="card-content">
                <h4 class="center-align">${data.name}</h4>
                  <ul class="collection with-header">
                    <li class="collection-item"><span class="card-title">Vanue</span>${data.venue}</li>
                    <li class="collection-item"><span class="card-title">Address</span>${data.address}</li>
                    <li class="collection-item"><span class="card-title">Website</span><a href="${data.website}">${data.website}</a></li>
                  </ul>
                </div>
              </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = clubHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          })
        }
      })
    }
    fetch(BASE_URL + "teams/" + idParam, {
      headers : { 'X-Auth-Token' : API_KEY }
    })
      .then(status)
      .then(json)
      .then(function(data) {
        let clubHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" />
              </div>
              <div class="card-content">
                <h4 class="center-align">${data.name}</h4>
                <ul class="collection with-header">
                  <li class="collection-item"><span class="card-title">Vanue</span>${data.venue}</li>
                  <li class="collection-item"><span class="card-title">Address</span>${data.address}</li>
                  <li class="collection-item"><span class="card-title">Website</span><a href="${data.website}">${data.website}</a></li>
                </ul>
              </div>
            </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = clubHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedClubs() {
  getAll().then(function(clubs) {
    console.log(clubs);
    // Menyusun komponen card artikel secara dinamis
    var clubsHTML = "";
    clubs.forEach(function(club) {
      clubsHTML += `
        <div class="card horizontal">
          <div class="card-image">
            <a href="./club.html?id=${club.id}&saved=true" class="row">
              <img src="${club.crestUrl}">
            </a>
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <p><h4>${club.name}</h4></p>
            </div>
            <div class="card-action">
              <a class="indigo lighten-4 btn-small" onclick="delById(${club.id}).then(()=>{getSavedClubs()})">delete</a>
            </div>
          </div>
        </div>
      `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = clubsHTML;
  });
}

function getSavedClubById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  
  getById(Number(idParam)).then(function(data) {
    console.log(data);
    let clubHTML = '';
    clubHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" />
              </div>
              <div class="card-content">
                <h4 class="center-align">${data.name}</h4>
                <ul class="collection with-header">
                  <li class="collection-item"><span class="card-title">Vanue</span>${data.venue}</li>
                  <li class="collection-item"><span class="card-title">Address</span>${data.address}</li>
                  <li class="collection-item"><span class="card-title">Website</span><a href="${data.website}">${data.website}</a></li>
                </ul>
              </div>
            </div>
        `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = clubHTML;
  });
}