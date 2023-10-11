export default class Controls {

    constructor(config, data, mCallback, cCallback) {
        this.cnf = config;
        this.data = data;

        this.addSpeed();
        this.addSize(cCallback);
        this.addZoom(cCallback);
        this.addStart(mCallback);
        console.log('Controls if ready');
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
                    callback();
                }
            } else {
                e.onclick = () => {
                    this.data.push( new Array(this.cnf.width).fill(0));
                    this.data.unshift(new Array(this.cnf.width).fill(0));
                    this.cnf.height += 2;
                    callback();
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
                    callback();
                }
            } else {
                e.onclick = () => {
                    this.data.forEach(el => {
                        el.unshift(0);
                        el.push(0);
                    })
                    this.cnf.width += 2;
                    callback();
                }
            }
        });
    }

}