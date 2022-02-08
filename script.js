const container = document.querySelector("section");
const template = document.querySelector("template").content;
const url = "https://babushka-dd8a.restdb.io/rest/menu";

let logo = document.createElement("img");
logo.src = "babushka_dull.svg";
let block = document.getElementById("splashbillede");
block.appendChild(logo);

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
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(mad));
      container.appendChild(klon);
    }
  });
}

function visDetaljer(mad) {
  console.log(mad);
  popup.style.display = "block";
  popup.querySelector("h2").textContent = mad.navn;
  popup.querySelector("img").src = "medium/" + mad.billednavn + "-md.jpg";
  popup.querySelector(".popup_info").textContent = mad.langbeskrivelse;
  popup.querySelector(".popup_pris").textContent = mad.pris + " kr.";

  document
    .querySelector("#luk_knap")
    .addEventListener("click", () => (popup.style.display = "none"));
}
hentData();
