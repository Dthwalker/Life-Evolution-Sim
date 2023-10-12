import Cell from "./Cell.js";
import Organic from "./Organic.js";
import Herb from "./Herb.js";
import Carn from "./Carn.js";


export default class CellData {

    constructor(config) {
        this.cnf  = config;
        this.data = [];

        this.createData();
        console.log(this.data);
    }

    createData() {
        this.data = [];
        
        for (let y = 0; y < this.cnf.height; y++) {
            this.data.push([]);
            for (let x = 0; x < this.cnf.width; x++) {
                this.data[y].push(new Cell(x, y));
            }
        }
        this.spawn();
        console.log('Data is create');
    }

    spawn() {
        let random = (min, max) => Math.round(Math.random() * (max - min) + min);
        let chanсe = (num) => random(0, 100) < num

        this.data.forEach((a, y) => a.forEach((el, x) => {
            if (chanсe(5))  { this.data[y][x] = new Carn(x, y); return }
            if (chanсe(20)) { this.data[y][x] = new Herb(x, y); return }
            if (chanсe(40)) { this.data[y][x] = new Organic(x, y); return }
        }))
    }

}