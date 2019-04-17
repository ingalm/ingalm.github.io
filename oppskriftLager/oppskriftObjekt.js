class oppskrift {

    antallIngredienser;
    antallSteg;
    steg;
    ingredienser;

    constructor() {
        this.steg = [];
        this.ingredienser = [];
        this.antallSteg = 0;
        this.antallIngredienser = 0;
    }

    leggTilSteg(tekst) {
        this.steg[this.antallSteg] = tekst;
        this.antallSteg++;
    }

    leggTilIngrediens(tekst){
        this.ingredienser[this.antallIngredienser] = tekst;
        this.antallIngredienser++;
    }
}