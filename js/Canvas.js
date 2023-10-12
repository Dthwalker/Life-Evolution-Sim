export default class Canvas {

    constructor(config, data) {
        this.cnf    = config;
        this.canvas = document.querySelector('#sim');
        this.ctx    = this.canvas.getContext('2d');
        this.w      = null;
        this.h      = null;
        this.cSize  = null;
        this.data   = data;
    }

    resize() {
        this.cSize = this.cnf.cellSize;
        this.w = this.canvas.width  = this.cnf.width * this.cSize;
        this.h = this.canvas.height = this.cnf.height * this.cSize;
    }

    drawLines() {
        this.ctx.fillStyle = this.cnf.color.halfLight;
        for (let y = 0; y < this.h; y += this.cSize) {
            this.ctx.fillRect(0, y, this.w, 1);
        }
        for (let x = 0; x < this.w; x += this.cSize) {
            this.ctx.fillRect(x, 0, 1, this.h);
        }
    }

    drawCells() {
        this.data.forEach(arr => arr.forEach(e => {
            let color
            switch (e.constructor.name) {
                case 'Organic':
                    color = this.cnf.color.organic;
                    break;
                case 'Herb':
                    color = this.cnf.color.herbivorous;
                    break;
                case 'Carn':
                    color = this.cnf.color.carnivore;
                    break;
                default:
                    color = this.cnf.color.dark;
            }

            e.draw(this.ctx, this.cSize,
                color,
                this.cnf.cellMargin);
        }));
    }

    update() {
        this.resize();
        this.drawLines();
        this.drawCells();
    }

}