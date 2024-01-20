export default class Cell {

    constructor(x = 0, y = 0) {
        this.x      = x;
        this.y      = y;
        this.life   = this.random(20,50);
        this.energy = 0;
        this.speed  = 5;
        this.clock  = this.random(0, this.speed);
        this.nb     = [];
        this.isMove = false;
    }

    random(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    }

    chanсe(num) {
        return random(0, 100) < num
    }

    chekNb(type) {
        let nb = this.nb.filter(e => e?.constructor.name == type);
        return !nb ? false : nb[this.random(0, nb.length - 1)];
    }

    draw(ctx, cSize, color, margin) {
        let [x, y] = [this.x * cSize, this.y * cSize];
        if (!this.img) {
            ctx.fillStyle = color;
            ctx.fillRect(x + margin, y + margin,
            cSize - margin * 2, cSize - margin * 2);
        } else {
            ctx.drawImage(this.img, 0, 0, 20, 20,
                          x + margin, y + margin,
                          cSize - margin * 2, cSize - margin * 2)
        }
    }
    
    update() {}

}