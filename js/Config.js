export default class Config {

    constructor() {
        this.width    = 25;
        this.height   = 15;
        this.cellSize = 20;
        this.speed    = 500;
        this.isStart  = false;
        this.color = {
            dark       : 'rgb(10,10,10)',
            light      : 'rgb(240,240,240)',
            halfLight  : 'rgba(240,240,240,.1)',
            organic    : '#58A146',
            herbivorous: '#A59828',
            carnivore  : '#871E1E',
        }
    }

}