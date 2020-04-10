let db = firebase.database();
let kokebok = db.ref("kokebok");
let brukere = db.ref("brukere");

//Viser innloggingsvinduet
function visLogin() {
    document.querySelector("#loginForm").style.display = "block";
}

//Gjemmer innloggingsvinduet
function lukkLogin() {
    document.querySelector("#loginForm").style.display = "none";
}

//Kaller informasjonen om brukere fra databasen
function loggInnKlikk() {
    brukere.on("child_added", loggInn)
}

//Bruker informasjonen fra databsen om brukere til å logge inn brukeren
function loggInn(snapshot) {
    let brukernavn = document.querySelector("#brukernavn").value;
    let passord = document.querySelector("#passord").value;
    let feil = document.querySelector("#feilmelding");
    let bruker = snapshot.val();

    if (brukernavn === bruker.navn) {
        if (passord === bruker.passord) {
            window.location.href = "oppskriftLager/oppskriftLager.html";
        }
        else {
            feil.style.display = "block";
        }
    }

    else {
        feil.style.display = "block";
    }
}

function search() {
    // Declare variables
    var input, filter, list, li, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    list = document.getElementById("oppskriftDiv");
    li = list.getElementsByTagName("a");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        p = li[i].getElementsByTagName("p")[0];
        if (p.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

//Finner en random oppskrift
function finnoppskrift() {
    var list, li, gen, j;
    list = document.getElementById("list");
    li = list.getElementsByTagName("a");

    //Displays all items again when pressing the button repeatedly
    for (j = 0; j < li.length; j++) {
        li[i].style.display = "";
    }

    //Generates random number to correspond to a list item
    gen = Math.floor(Math.random() * li.length);

    //Hides all list items that do not correspond to the number generated
    for (j = 0; j < li.length; j++) {
        if (j != gen) {
            li[j].style.display = "none";
        }
    }
}

function hentOppskrifter(snapshot) {
    let oppskriftDiv = document.querySelector("#oppskriftDiv");
    let oppskriftKey = snapshot.key;
    let oppskrift = snapshot.val();

    if (oppskrift.matrett[0] != "5") {
        oppskriftDiv.innerHTML += `
        <a data-matrett="${oppskrift.matrett}" onclick="lagreOppskriftLokalt(event)" class="oppskrift">
            <div></div>
            <img src="bilder/oppskrifter/` + camelize(oppskriftKey) + `.jpg">
            <p>${oppskriftKey}</p>
        </a>
    `
    }
}

//Gjør om tekst til camelCase
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

let oppskriftDiv = document.querySelector("#oppskriftDiv");

function sorterFrokost() {
    oppskriftDiv.innerHTML = "";

    kokebok.orderByChild("matrett/0").equalTo("0").on("child_added", hentOppskrifter);
}

function sorterMiddag() {
    oppskriftDiv.innerHTML = "";

    kokebok.orderByChild("matrett/0").equalTo("1").on("child_added", hentOppskrifter);
    kokebok.orderByChild("matrett/1").equalTo("1").on("child_added", hentOppskrifter);
}

function sorterDessert() {
    oppskriftDiv.innerHTML = "";

    kokebok.orderByChild("matrett/0").equalTo("2").on("child_added", hentOppskrifter);
    kokebok.orderByChild("matrett/1").equalTo("2").on("child_added", hentOppskrifter);
    kokebok.orderByChild("matrett/2").equalTo("2").on("child_added", hentOppskrifter);
}

function sorterBakst() {
    oppskriftDiv.innerHTML = "";

    kokebok.orderByChild("matrett/0").equalTo("3").on("child_added", hentOppskrifter);
    kokebok.orderByChild("matrett/1").equalTo("3").on("child_added", hentOppskrifter);
    kokebok.orderByChild("matrett/2").equalTo("3").on("child_added", hentOppskrifter);
    kokebok.orderByChild("matrett/3").equalTo("3").on("child_added", hentOppskrifter);
}

function sorterPrøver() {
    oppskriftDiv.innerHTML = `<p id="oppskriftFeil">Disse oppskriftene er ikke prøvd enda, de kan være dårlige</p>`;

    kokebok.orderByChild("matrett/0").equalTo("4").on("child_added", hentOppskrifter);
}

function sorterAlt() {
    oppskriftDiv.innerHTML = "";

    kokebok.on("child_added", hentOppskrifter);

    setTimeout(fjernPrøver, 1500);
}

//Fjerner prøveoppskrifter når siden lastes inn, så de ikke syns på frontsiden
function fjernPrøver() {
    let oppskrifter = oppskriftDiv.querySelectorAll("a");

    for(let i = 0; i < oppskrifter.length; i++) {
        if(oppskrifter[i].dataset.matrett === "4") {
            oppskrifter[i].style.display = "none";
        }
    }
}

//Loader ny side når man klikker på den
function lagreOppskriftLokalt(event) {
    let oppskrift = event.currentTarget.innerText;

    localStorage.setItem("oppskriftNavn", oppskrift);

    window.location.href = "oppskrift.html";
}

//Loader valgt oppskrift på ny side
function hentValgtOppskrift() {
    let oppskriftNavn = localStorage.getItem("oppskriftNavn");

    kokebok.child(oppskriftNavn).once("value", function (snapshot) {
        let oppskrift = snapshot.val();
        let oppskriftKey = snapshot.key;

        document.querySelector("#bilde").style.backgroundImage = `url("bilder/oppskrifter/${camelize(oppskriftKey)}.jpg")`;

        let ovnsfunksjonRef = db.ref("ovnsfunksjoner/" + oppskrift.tips.funksjon);

        //Setter enn lytterfunksjon på ovnsfunksjonreferansen
        ovnsfunksjonRef.once("value", function (snapshotFunksjon) {
            //Henter ut data som tilhører funksjonen
            let funksjonObj = snapshotFunksjon.val();
            let funksjonKey = snapshotFunksjon.key;

            if (funksjonKey !== "0") {
                let infoDiv = document.querySelector("#info");

                infoDiv.innerHTML += `
                    <div id="info">
                        <p><b>Temperatur:</b> ${oppskrift.tips.temp}°C</p>
                        <p><b>Funksjon:</b> ${funksjonObj.navn}</p>
                        <p><b>Tid:</b> ${oppskrift.tips.tid}</p>
                    </div>
                `
            }
        });

        let ingrediensDiv = document.querySelector("#ingredienser");
        let stegDiv = document.querySelector("#steg");
        let ingrediensListe = oppskrift.ingredienser;
        let stegListe = oppskrift.steg;

        for (let i = 0; i < ingrediensListe.length; i++) {
            ingrediensDiv.innerHTML += `
                <p>` + ingrediensListe[i] +`</p>   
            `
        }

        for (let i = 0; i < stegListe.length; i++) {
            stegDiv.innerHTML += `
                <li>` + stegListe[i] +`</li>   
            `
        }

        let navnH1 = document.querySelector("#navn");

        navnH1.innerHTML = oppskriftKey;
    })
}
