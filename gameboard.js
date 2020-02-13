class Gameboard {

    backgroundColor = "rgb(26, 44, 44)";
    width = 600;
    height = 600;
    size = 20;
    cells = [];
    canvasElement;
    drawingContext;
    maxFPS = 30;
    currentFPS = 0;
    lastDrawtime = 0;
    gameObjects = [];
    gameSpeed = 100;
    snake;
    food;

    constructor() {
        this.canvasElement = document.querySelector("canvas");
        this.drawingContext = this.canvasElement.getContext("2d");
        this.canvasElement.width = this.width;
        this.canvasElement.height = this.height;

        this.snake = new Snake(0, 0, this.width / this.size, this.width / this.size, this.drawingContext);
        this.gameObjects.push(this.snake);

        setInterval(this.draw, 1000 / this.maxFPS);
        setInterval(this.update, this.gameSpeed);

        this.generateCells();
        this.generateFood();

        this.attachEventHandlers();
        //@TODO
        this.update();


    }

    attachEventHandlers = () => {
        document.addEventListener("keyup", this.onControlsPressed);
    }

    onControlsPressed = (e) => {
        switch (e.keyCode) {
            case 39:
                this.snake.move(3);
                break;
            case 37:
                this.snake.move(2);
                break;
            case 38:
                this.snake.move(0);
                break;
            case 40:
                this.snake.move(1);
                break;
        }
    }

    draw = () => {
        this.clearScreen();

        for (let x = 0; x < this.gameObjects.length; x++) this.gameObjects[x].draw();
        // //FPS
        // this.lastDrawtime = moment().unix();
        // this.drawFPS();
    }

    update = () => {
        for (let x = 0; x < this.gameObjects.length; x++) this.gameObjects[x].update();
        this.checkBoundaries();
        this.checkSnakeHitFood();
        // //FPS
        // let currentTimestamp = moment().unix();
        // if (this.lastDrawtime == currentTimestamp) {
        //     this.currentFPS++;
        // }
        // else if (currentTimestamp > this.lastDrawtime) {
        //     this.currentFPS = 0;
        // }
    }

    generateCells = () => {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let w = this.width / this.size;
                let h = this.height / this.size;
                let newCell = new Cell(x, y, w, h, this.drawingContext);

                if (!this.cells[x])
                    this.cells[x] = [];

                this.cells[x][y] = newCell;
                this.gameObjects.push(newCell);
            }
        }
    }

    generateFood = () => {
        var x = this.random(0, this.size - 1);
        var y = this.random(0, this.size - 1);
        let w = this.width / this.size;
        let h = this.height / this.size;

        if (!this.food) {
            this.food = new Food(x, y, w, h, this.drawingContext);
            this.gameObjects.push(this.food);
        }

        this.food.position.x = x;
        this.food.position.y = y;
    }

    drawCells = () => {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (typeof this.cells[x] != "undefined" && typeof this.cells[x][y] != "undefined") {
                    this.cells[x][y].draw();
                }
            }
        }
    }

    updateCells = () => {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (typeof this.cells[x] != "undefined" && typeof this.cells[x][y] != "undefined") {
                    this.cells[x][y].update();
                }
            }
        }
    }

    clearScreen = () => {
        this.drawingContext.fillStyle = this.backgroundColor;
        this.drawingContext.fillRect(0, 0, this.width, this.height);
    }

    drawFPS = () => {
        this.drawingContext.font = "10px Arial";
        this.drawingContext.fillStyle = "yellow";
        this.drawingContext.fillText(`FPS: ${this.currentFPS}`, 1, 10);
    }

    checkBoundaries = () => {
        let isOut = false;

        isOut =
            this.snake.head.position.x < 0 ||
            this.snake.head.position.y < 0 ||
            this.snake.head.position.x > this.size - 1 ||
            this.snake.head.position.y > this.size - 1;


        if (isOut) {
            alert('BOOM!');
            window.location.reload();
        }
    }

    checkSnakeHitFood = () => {
        if (this.snake.head.position.x == this.food.position.x &&
            this.snake.head.position.y == this.food.position.y) {
            this.generateFood();
            this.snake.eat();
        }
    }

    random = (start, end) => {
        return Math.floor(Math.random() * (end + 1)) + start;
    }
}