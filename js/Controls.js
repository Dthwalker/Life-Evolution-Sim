import Cell from "./Cell.js";
import Organic from "./Organic.js";
import Herb from "./Herb.js";
import Carn from "./Carn.js";


export default class Controls {

    constructor(canvas, config, data, mCallback, cCallback, spawnCallback) {
        this.canvas = canvas;
        this.cnf    = config;
        this.data   = data;
        this.mouse  = {x: 0, y: 0, down: false}
        this.cell   = 0;

        this.addSpeed();
        this.addSize(cCallback);
        this.addZoom(cCallback);
        this.addStart(mCallback);
        this.addSpawn(spawnCallback, cCallback);
        this.addClear(cCallback);
        this.addDraw(cCallback);
        console.log('Controls if ready');
    }

    addDraw(callback) {
        document.querySelectorAll('.cell').forEach((e, i) => {
            e.onclick = () => { this.cell = i }
        })

        this.canvas.addEventListener('mousemove', (e) => {
            let [x, y] = [ Math.floor(e.offsetX / this.cnf.cellSize),
                           Math.floor(e.offsetY / this.cnf.cellSize) ];
            [this.mouse.x, this.mouse.y] = [x, y];
            this.draw(callback);
        });

        this.canvas.addEventListener('mousedown', (e) => {
            this.mouse.down = true;
            this.draw(callback);
        });

        this.canvas.addEventListener('mouseup', (e) => {this.mouse.down = false});
        this.canvas.addEventListener('mouseleave', (e) => {this.mouse.down = false});
    }

    draw(callback) {
        if (this.mouse.down) {
            let [x, y] = [this.mouse.x, this.mouse.y];
            this.cell == 0 ? this.data[y][x] = new Cell(x, y)    :
            this.cell == 1 ? this.data[y][x] = new Organic(x, y) :
            this.cell == 2 ? this.data[y][x] = new Herb(x, y)    :
            this.cell == 3 ? this.data[y][x] = new Carn(x, y)    : null
            callback()
        }
    }

    addClear(callback) {
        document.querySelector('#clear').onclick = () => {
            this.data.forEach((a,y) => a.forEach((e, x) => {
                this.data[y][x] = new Cell(x, y);
            }));
            callback();
        }
    }

    addSpawn(callback, canvasUpdate) {
        document.querySelector('#spawn').onclick = () => {
            callback();
            canvasUpdate();
        }
    }

    addStart(callback) {
        let btn = document.querySelector('#start');
        btn.onclick = () => {
            this.cnf.isStart = !this.cnf.isStart;
            btn.innerHTML = this.cnf.isStart ? 'Pause' : 'Start'
            callback()
        }
    }

    addZoom(callback) {
        [...document.querySelector('#zoom').children].forEach(e => {
            e.innerHTML == '-' ?
            e.onclick = () => {
                this.cnf.cellSize -= 5;
                if (this.cnf.cellSize < 1) this.cnf.cellSize = 1;
                callback();
            }:
            e.onclick = () => {
                this.cnf.cellSize += 5;
                callback()
            }
        })
    }

    addSpeed() {
        [...document.querySelector('#speed').children].forEach(e => {
            e.innerHTML == '-' ? e.onclick = () => this.cnf.speed += 100 :
                                 e.onclick = () => this.cnf.speed -= 100
        })
    }

    addSize(callback) {
        let wControls = document.querySelector('#sizeWidth').querySelectorAll('button');
        let hControls = document.querySelector('#sizeHeight').querySelectorAll('button');

        hControls.forEach(e => {
            if (e.innerHTML == '-') {
                e.onclick = () => {
                    if (this.cnf.height < 3) return
                    this.data.shift();
                    this.data.pop();
                    this.cnf.height -= 2;
                    this.reindexData();
                    callback();
                    console.log(this.data);
                }
            } else {
                e.onclick = () => {
                    let getCellArr = () => {
                        let arr = [];
                        for (let i = 0; i < this.cnf.width; i++) {
                            arr.push(new Cell());
                        }
                        return arr;
                    }
                    this.data.push( getCellArr() );
                    this.data.unshift( getCellArr() );
                    this.cnf.height += 2;
                    this.reindexData();
                    callback();
                    console.log(this.data);
                }
            }
        });

        wControls.forEach(e => {
            if (e.innerHTML == '-') {
                e.onclick = () => {
                    if (this.cnf.width < 3) return
                    this.data.forEach(el => {
                        el.shift();
                        el.pop();
                    })
                    this.cnf.width -= 2;
                    this.reindexData();
                    callback();
                    console.log(this.data);
                }
            } else {
                e.onclick = () => {
                    this.data.forEach(el => {
                        el.unshift(new Cell());
                        el.push(new Cell());
                    })
                    this.cnf.width += 2;
                    this.reindexData();
                    callback();
                    console.log(this.data);
                }
            }
        });
    }

    reindexData() {
        this.data.forEach((arr, y) => arr.forEach((el, x) => {
            [el.x, el.y] = [x, y];
        }));
    }

}