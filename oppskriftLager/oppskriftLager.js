
function ekstraIngrediens() {
    var block_to_insert_1, block_to_insert_2, container_block, n , pArray;

    pArray = document.getElementById("innhold").getElementsByTagName("p");

    if (pArray.length == 0) {
        n = 1
    }
    else {
        n = Number(pArray[pArray.length - 1].innerHTML) + 1
    }

    block_to_insert_2 = document.createElement( 'input' );
    block_to_insert_2.classList = "ingrediens";
    block_to_insert_1 = document.createElement('p');
    block_to_insert_1.innerHTML = n;

    container_block = document.getElementById( 'innhold' );
    container_block.appendChild(block_to_insert_1);
    container_block.appendChild(block_to_insert_2);
}

function innholdDeling() {
    var block_to_insert_1, block_to_insert_2, container_block, number ;

    number = 1;

    block_to_insert_2 = document.createElement( 'input' );
    block_to_insert_2.classList = "ingrediens";
    block_to_insert_1 = document.createElement('p');
    block_to_insert_1.innerHTML = number;

    block_to_insert_2.classList.add("deling");

    container_block = document.getElementById( 'innhold' );
    container_block.appendChild(block_to_insert_1);
    container_block.appendChild(block_to_insert_2);

}

function ekstraSteg() {
    var block_to_insert_1, block_to_insert_2, container_block, number ;

    number = document.getElementById("oppskrift").getElementsByTagName("p").length + 1;

    block_to_insert_2 = document.createElement( 'input' );
    block_to_insert_1 = document.createElement('p');
    block_to_insert_1.innerHTML = number;

    container_block = document.getElementById( 'oppskrift' );
    container_block.appendChild(block_to_insert_1);
    container_block.appendChild(block_to_insert_2);
}

function lineBreak() {
    var block_to_insert, container_block;

    block_to_insert = document.createElement('br');

    container_block = document.getElementById( 'oppskrift' );
    container_block.appendChild(block_to_insert);
    container_block.appendChild(block_to_insert);
}


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Start file download.
function downloadButton() {
    var text, filename, name, head, body, header, wrapper, innhold, oppskrift;

    name = document.getElementById("oppskriftNavn").value;
    filename =  name.toLowerCase() + ".html";

    head = "\t<title>Kokeboka</title>\n" +
        "\t<meta charset=\"UTF-8\">\n" +
        "\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\">\n" +
        "\t<link rel=\"stylesheet\" type=\"text/css\" href=\"../css/oppskrift.css\">\n" +
        "\t<link rel=\"stylesheet\" type=\"text/css\" href=\"../css/parallax.css\">\n" +
        "\t<!--Scripts!-->\n" +
        "\t<script src=\"../index.js\" type=\"text/javascript\"></script>\n" +
        "\t<!--Fonts!-->\n" +
        "\t<link href=\"https://fonts.googleapis.com/css?family=Quicksand|Nunito+Sans\" rel=\"stylesheet\">";

    header = "<div id=\"header\">\n" +
        "\t<a id=\"linkhome\" href=\"https://ingalm.github.io\">KOKEBOKA</a>\n" +
        "\t<a id=\"linksubhome\" href=\"#\" onclick=\"goBack()\">TILBAKE</a>\n" +
        "</div>";

    parallax = "<div class=\"parallax\" id=\"" + name.toLowerCase() + "\"></div>"

    innholdInput = document.getElementById("innhold").getElementsByTagName("input");
    innholdListe = "";

    for (var i = 0; i < innholdInput; i++){
        var inputText = innholdInput[i].value;
        li = "<dt>" + inputText + "</dt>";
        innholdListe += li;
    }


    innhold = "<div id=\"innhold\">\n" +
        "\t\t<h1>INGREDIENSER</h1>\n" +
        " " + innholdListe + "\n" +
        " </div> \n";


    wrapper = innhold;

    body = header + parallax + wrapper;

    text = head + body;

    /*
    //Temp, ovnsfunksjon og tid
    if (document.getElementById("temp").value === "") {
        temp = "";
    }
    else {
        temp = '<dt><b>Temperatur:</b> ' + document.getElementById("temp").value + '°C</dt>'
    }

    if (document.getElementById("funksjon").value === "") {
        funksjon = "";
    }
    else {
        funksjon = '<dt><b>Funksjon:</b> ' + document.getElementById("funksjon").value + '</dt>'
    }

    if (document.getElementById("tid").value === "") {
        tid = "";
    }
    else {
        tid = '<dt><b>Tid:</b> ' + document.getElementById("tid").value + 'min</dt>'
    }

    //Innhold
    var innhold = document.getElementById("innhold").getElementsByTagName("dl")[0];
    var li = document.getElementsByClassName("ingrediens");

    for (var i=0; i < li.lenght; i++) {
        var ingred = li[i].value;

        var item = document.createElement("dt");
        item.innerHTML = ingred;
        innhold.appendChild(item);
    }*/

    /*
    text =
    "<!DOCTYPE html>\n" +
        "<html>\n" +
        "\n" +
        "<head>\n" +
        "    <title>Kokeboka</title>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <link rel=\"stylesheet\" type=\"text/css\" href=\"../css/oppskrift.css\">\n" +
        "    <link rel=\"stylesheet\" type=\"text/css\" href=\"../css/parallax.css\">\n" +
        "    <!--Scripts!-->\n" +
        "    <script src=\"../index.js\" type=\"text/javascript\"></script>\n" +
        "    <script>function goBack() {\n" +
        "        window.history.go(-1);\n" +
        "    }</script>\n" +
        "    <!--Fonts!-->\n" +
        "    <link href=\"https://fonts.googleapis.com/css?family=Quicksand|Nunito+Sans\" rel=\"stylesheet\">\n" +
        "</head>\n" +
        "\n" +
        "<body>\n" +
        "    <div id=\"header\">\n" +
        "        <a id=\"linkhome\" href=\"https://ingalm.github.io\">KOKEBOKA</a>\n" +
        "        <a id=\"linksubhome\" href=\"#\" onclick=\"goBack()\">TILBAKE</a>\n" +
        "    </div>\n" +
        "    <div class=\"parallax\" id=\"" + name.toLowerCase() + "\"></div>\n" +
        "    <div id=\"wrapper\">\n" +
        "        <div id=\"innhold\">\n" +
        "            <h1>INGREDIENSER</h1>\n" +
        "            <dl>\n" +
        "           " + temp + " " +
        "           " + funksjon + " " +
        "           " + tid + " " +
        "                <dt class=\"innholdsplit\">Innhold</dt>\n" +
        /*
        "           "  + innhold + " " +
        "            </dl>\n" +
        "        </div>\n" +
        "        <div id=\"oppskrift\">\n" +
        "            <h1>" + name.toUpperCase() + "</h1>\n" +
        "            <ol>\n" +
        "                <li></li>\n" +
        "            </ol>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</body>\n" +
        "\n" +
        "</html>"
    ;
    */


    download(filename, text);
}
/*
Removing spaces between words

var str = '/var/www/site/Brand new document.docx';

document.write( str.replace(/\s/g, '') );*/
