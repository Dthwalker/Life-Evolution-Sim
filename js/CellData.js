export default class CellData {

    constructor(config) {
        this.cnf  = config;
        this.data = [];

        this.createData();
    }

    createData() {
        this.data = [];
        
        for (let y = 0; y < this.cnf.height; y++) {
            this.data.push([]);
            for (let x = 0; x < this.cnf.width; x++) {
                this.data[y].push(0);
            }
        }

        console.log('Data is create');
    }

    

}