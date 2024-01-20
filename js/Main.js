import Canvas from "./Canvas.js";
import Config from "./Config.js";
import CellData from "./CellData.js";
import Controls from "./Controls.js";


class Main {

    static init() {
        this.config   = new Config();
        this.cData    = new CellData(this.config);
        this.canvas   = new Canvas(this.config, this.cData.data);
        this.loopID   = null;
        this.clock    = 0;

        this.control = new Controls(this.canvas.canvas,
                                    this.config,
                                    this.cData.data,
                                    this.loop.bind(this),
                                    this.canvas.update.bind(this.canvas),
                                    this.cData.spawn.bind(this.cData));
        console.log('Sim is ready');
        this.showInfo()
        this.canvas.sprites.organic.onload = () => {
            this.canvas.sprites.herb.onload = () => {
                this.canvas.sprites.carn.onload = () => this.loop()
            }
        }
    }

    static showInfo() {
        let [o, h, c] = [0, 0, 0];
        this.cData.data.forEach(a => a.forEach(e => {
            e.constructor.name == 'Organic' ? o++ :
            e.constructor.name == 'Herb' ? h++ :
            e.constructor.name == 'Carn' ? c++ : null
        }))

        document.querySelector('.info').innerHTML = `Organic: ${o}; Herbivorous: ${h}; Carnivore: ${c}`
    }

    static loop() {
        this.canvas.update();
        this.cData.update();
        this.showInfo()
        
        if (this.config.isStart) {
            this.loopID = setTimeout(this.loop.bind(this), this.config.speed);
        } else {
            clearTimeout(this.loopID);
        }
    }

}

Main.init();