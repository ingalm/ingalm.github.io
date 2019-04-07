function goBack() {
    window.history.go(-1);
}

function myFunction() {
    // Declare variables
    var input, filter, list, li, i;
    input = document.getElementById('input');
    filter = input.value.toUpperCase();
    list = document.getElementById("list");
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

function finnoppskrift() {
    var list, li, gen, i;
    list = document.getElementById("list");
    li = list.getElementsByTagName("a");

    //Displays all items again when pressing the button repeatedly
    for (i = 0; i < li.length; i++) {
        li[i].style.display = "";
    }

    //Generates random number to correspond to a list item
    gen = Math.floor(Math.random() * li.length);

    //Hides all list items that do not correspond to the number generated
    for (var i = 0; i < li.length; i++) {
        if (i != gen) {
            li[i].style.display = "none";
        }
    }
}

function mobilePicture() {
    var vw;
    vw = window.innerWidth;

    if (vw < 770) {
        document.getElementById("frokost").src = "bilder/frokostheader.jpg";
        document.getElementById("middag").src = "bilder/middagheader.jpg";
        document.getElementById("dessert").src = "bilder/dessertheader.jpg";
        document.getElementById("bakst").src = "bilder/bakstheader.jpg";
        document.getElementById("alt").src = "bilder/altheader.jpg";
    }

    if (vw > 770) {
        document.getElementById("frokost").src = "bilder/frokostforside.jpg";
        document.getElementById("middag").src = "bilder/middagforside.jpg";
        document.getElementById("dessert").src = "bilder/dessertforside.jpg";
        document.getElementById("bakst").src = "bilder/bakstforside.jpg";
        document.getElementById("alt").src = "bilder/altforside.jpg";
    }
}