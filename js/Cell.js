export default class Cell {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    draw(ctx, cSize, color, margin) {
        let [x, y] = [this.x * cSize, this.y * cSize];
        ctx.fillStyle = color;
        ctx.fillRect(x + margin, y + margin,
                     cSize - margin * 2, cSize - margin * 2);
    }

}