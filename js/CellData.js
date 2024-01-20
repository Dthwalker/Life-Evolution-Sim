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

    dataFn(callback) {
        this.data.forEach((a,y) => a.forEach((e,x) => {
            callback(e, x, y)
        }));
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
            if (chanсe(1))  { this.data[y][x] = new Carn(x, y); return }
            if (chanсe(1)) { this.data[y][x] = new Herb(x, y); return }
            if (chanсe(50)) { this.data[y][x] = new Organic(x, y); return }
        }));
    }

    getNb(e, x, y) {
        if (e.constructor.name != 'Cell' && e.constructor.name != 'Organic') {
            e.nb = []
            try{ e.nb.push(this.data[y-1][x-1]) } catch {}
            try{ e.nb.push(this.data[y-1][x]) } catch {}
            try{ e.nb.push(this.data[y-1][x+1]) } catch {}
            try{ e.nb.push(this.data[y][x-1]) } catch {}
            try{ e.nb.push(this.data[y][x+1]) } catch {}
            try{ e.nb.push(this.data[y+1][x-1]) } catch {}
            try{ e.nb.push(this.data[y+1][x]) } catch {}
            try{ e.nb.push(this.data[y+1][x+1]) } catch {}
        }
    }

    logic() {
        this.dataFn((e, x, y) => {
            this.getNb(e, x, y);
            let newPlace = e.update();

            if (newPlace == 'death') {
                this.data[y][x] = new Organic(x, y);

            } else if (newPlace && !e.isMove) {
                if (Array.isArray(newPlace)) {
                    newPlace = newPlace[1];
                    let name = e.constructor.name

                    this.data[y][x] = name == 'Herb' ? new Herb(x, y) : new Carn(x, y)
                    if (newPlace) this.data[newPlace.y][newPlace.x] = name == 'Herb' ?
                                  new Herb(newPlace.x, newPlace.y) : new Carn(newPlace.x, newPlace.y)

                } else {
                    e.isMove = true;
                    this.data[newPlace.y][newPlace.x] = e;
                    [e.x, e.y] = [newPlace.x, newPlace.y];
                    this.data[y][x] = new Cell(x, y);
                }
            }
        });

        this.dataFn((e) => {e.isMove = false});
    }

    update() {
        this.logic();
    }

}