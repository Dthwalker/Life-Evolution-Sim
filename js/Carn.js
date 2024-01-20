import Cell from "./Cell.js";


export default class Carn extends Cell {

    constructor(x = 0, y = 0) {
        super(x, y);
        this.speed = 1;
        this.life = 60;
    }

    update() {
        this.life--
        if (this.life <= 0) {
            if (this.energy >= 3) {
                let empty = this.chekNb('Cell');
                return ['division',empty];
            } else {
                return 'death'
            }

        }

        this.clock++
        if (this.clock >= this.speed) {
            this.clock  = 0
            let herb = this.chekNb('Herb');
            if (herb) {this.energy++ ; return herb};

            let empty   = this.chekNb('Cell');
            if (empty) return empty
        }

        return false
    }
    
}