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
        this.loop();
    }

    static loop() {
        this.canvas.update();

        console.log(this.clock++);
        
        if (this.config.isStart) {
            this.loopID = setTimeout(this.loop.bind(this), this.config.speed);
        } else {
            clearTimeout(this.loopID);
        }
    }

}

Main.init();