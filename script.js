const container = document.querySelector("section");
const template = document.querySelector("template").content;
const url = "https://babushka-dd8a.restdb.io/rest/menu";

const options = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

let data;
let filter = "alle";

const filterKnapper = document.querySelectorAll("nav button");
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerMad));

function filtrerMad() {
  filter = this.dataset.kategori;

  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  vis(data);
}

async function hentData() {
  const resspons = await fetch(url, options);
  const json = await resspons.json();

  data = json;

  vis(data);
}

function vis(data) {
  container.textContent = "";

  data.forEach((mad) => {
    if (filter == mad.kategori || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector("h2").textContent = mad.navn;
      klon.querySelector("img").src = "medium/" + mad.billednavn + "-md.jpg";
      klon.querySelector(".info").textContent = mad.kortbeskrivelse;
      klon.querySelector(".pris").textContent = mad.pris + " kr.";
      container.appendChild(klon);
    }
  });
}

hentData();
