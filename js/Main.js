import Canvas from "./Canvas.js";
import Config from "./Config.js";
import CellData from "./CellData.js";
import Controls from "./Controls.js";

class Main {

    static init() {
        this.config   = new Config();
        this.canvas   = new Canvas(this.config);
        this.cData    = new CellData(this.config);
        this.loopID   = null;
        this.clock    = 0;

        this.control = new Controls(this.config,
                                    this.cData.data,
                                    this.loop.bind(this),
                                    this.canvas.update.bind(this.canvas));
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