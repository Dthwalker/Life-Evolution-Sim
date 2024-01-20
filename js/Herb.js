import Cell from "./Cell.js";


export default class Herb extends Cell {

    constructor(x = 0, y = 0) {
        super(x, y);
        this.life = 10;
        this.speed = 1;
    }

    update() {
        if (this.energy >= 1) {
            let empty   = this.chekNb('Cell');
            return ['division',empty];
        }
        this.life--
        if (this.life <= 0) {
            if (this.energy >= 1) {
                let empty   = this.chekNb('Cell');
                return ['division',empty];
            } else {
                return 'death'
            }
        }

        this.clock++
        if (this.clock >= this.speed) {
            this.clock  = 0
            let organic = this.chekNb('Organic');
            if (organic) {this.energy++ ; return organic};

            let empty   = this.chekNb('Cell');
            if (empty) return empty
        }

        return false
    }
    
}