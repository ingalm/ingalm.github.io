function ekstraIngrediens() {
    var block_to_insert_1, block_to_insert_2, container_block, n;

    n = document.getElementById("ingredienser").getElementsByTagName("p").length + 1;

    block_to_insert_2 = document.createElement( 'input' );
    block_to_insert_1 = document.createElement('p');
    block_to_insert_1.innerHTML = n;

    container_block = document.getElementById( 'ingredienser' );
    container_block.appendChild(block_to_insert_1);
    container_block.appendChild(block_to_insert_2);
}

function ekstraSteg() {
    var block_to_insert_1, block_to_insert_2, container_block, n ;

    n = document.getElementById("anvisning").getElementsByTagName("p").length + 1;

    block_to_insert_2 = document.createElement( 'input' );
    block_to_insert_1 = document.createElement('p');
    block_to_insert_1.innerHTML = n;

    container_block = document.getElementById( 'anvisning' );
    container_block.appendChild(block_to_insert_1);
    container_block.appendChild(block_to_insert_2);
}

function slettSisteIngrediens() {
    let ingrediensListe = document.querySelector("#ingredienser").getElementsByTagName("input");
    let tallListe = document.querySelector("#ingredienser").getElementsByTagName("p");
    tallListe[tallListe.length - 1].outerHTML = "";
    ingrediensListe[ingrediensListe.length - 1].outerHTML = "";
}

function slettSisteSteg() {
    let stegListe = document.querySelector("#anvisning").getElementsByTagName("input");
    let tallListe = document.querySelector("#anvisning").getElementsByTagName("p");
    tallListe[tallListe.length - 1].outerHTML = "";
    stegListe[stegListe.length - 1].outerHTML = "";
}

let db = firebase.database();
let kokebok = db.ref("kokebok");
let ovnsfunksjoner = db.ref("ovnsfunksjoner");

function hentOvnfunksjoner(snapshot) {
    let inpFunksjon = document.querySelector("#funksjon");

    let ovnfunksjon = snapshot.val();
    let ovnfunksjonKey = snapshot.key;

    //Setter inn i registreringen av oppskrifter
    inpFunksjon.innerHTML += `
            <option value="${ovnfunksjonKey}">
                ${ovnfunksjon.navn}
            </option>`;

}

function lagreOppskrift() {
    let ingrediensListe = document.querySelector("#ingredienser").getElementsByTagName("input");
    let stegListe = document.querySelector("#anvisning").getElementsByTagName("input");

    let inpNavn = document.querySelector("#oppskriftNavn");

    let noekkel = inpNavn.value;
    let nyOppskrift = new oppskrift();

    let nyOppskr = kokebok.child(noekkel);

    for (let n = 0; n < ingrediensListe.length; n++) {
        let ingrediens = ingrediensListe[n].value;
        nyOppskrift.leggTilIngrediens(ingrediens);
    }

    for (let i = 0; i < stegListe.length; i++) {
        let steg = stegListe[i].value;
        nyOppskrift.leggTilSteg(steg);
    }


    //Tips
    let temp, funksjon, tid;
    temp = document.querySelector("#temp");
    funksjon = document.querySelector("#funksjon");
    tid = document.querySelector("#tid");

    let tips = {
        temp : temp.value,
        funksjon : funksjon.value,
        tid : tid.value
    };

    //Legger tips inn i databsen dersom det står noe i feltene
    if (funksjon.value === "0") {
        tips = {
            funksjon : funksjon.value
        }
    }

    nyOppskr.child("tips").set(tips);



    //Legger ingredienser og steg inn i databasen
    nyOppskr.child("ingredienser").set(nyOppskrift.ingredienser);
    nyOppskr.child("steg").set(nyOppskrift.steg);

    //Legger inn hvilken rett oppskriften er
    let matrett = nyOppskr.child("matrett");

    let checkboxListe = document.querySelector("#checkboxer").getElementsByTagName("input");
    let retter = [];

    for (let j = 0; j < checkboxListe.length; j++) {
        let checkbox = checkboxListe[j];

        if (checkbox.checked) {
            retter.push(checkbox.value);
        }

        if (retter.includes("4")) {
            retter = ["4"];
        }
    }

    matrett.set(retter);

}

ovnsfunksjoner.on("child_added", hentOvnfunksjoner);
