export default class Config {

    constructor() {
        this.width      = 200;
        this.height     = 100;
        this.cellSize   = 5;
        this.cellMargin = 1;
        this.speed      = 50;
        this.isStart    = false;
        this.color = {
            dark       : 'rgb(10,10,10)',
            light      : 'rgb(240,240,240)',
            halfLight  : 'rgba(240,240,240,.01)',
            organic    : '#58A146',
            herbivorous: '#A59828',
            carnivore  : '#871E1E',
        }
    }

}