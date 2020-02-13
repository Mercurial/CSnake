class Snake {
    body = [];
    color = "red";
    // 0 UP, 1 DOWN, 2 LEFT, 3 RIGHT
    direction = 3;
    drawingContext;

    constructor(x, y, cellW, cellH, ctx) {
        this.drawingContext = ctx;
        let snakeHead = new SnakeCell(x, y, cellW, cellH, ctx);
        snakeHead.color = this.color;
        this.body.push(snakeHead);
    }

    get head() {
        return this.body[0];
    }

    get tail() {
        return this.body[this.body.length - 1];
    }

    draw = () => {
        for (let x = 0; x < this.body.length; x++) {
            this.body[x].draw();
        }
    }

    update = () => {
        this.updatePosition();
        for (let x = 0; x < this.body.length; x++) {
            this.body[x].update();
        }
    }

    updatePosition = () => {

        let lastPosition = new Vector2D();
        lastPosition.x = this.head.position.x;
        lastPosition.y = this.head.position.y;

        switch (this.direction) {
            case 0:
                this.head.position.y--;
                break;
            case 1:
                this.head.position.y++;
                break;
            case 2:
                this.head.position.x--;
                break;
            case 3:
                this.head.position.x++;
                break;
        }

        for (let x = 1; x < this.body.length; x++) {
            let tempPosition = new Vector2D();
            tempPosition.x = this.body[x].position.x;
            tempPosition.y = this.body[x].position.y;
            this.body[x].position.x = lastPosition.x;
            this.body[x].position.y = lastPosition.y;
            lastPosition = tempPosition;
        }
    }

    move = (d) => {
        if (this.direction == 0 && d == 1)
            return

        if (this.direction == 1 && d == 0)
            return

        if (this.direction == 2 && d == 3)
            return

        if (this.direction == 3 && d == 2)
            return

        this.direction = d;
    }

    eat = () => {
        let x = this.tail.position.x;
        let y = this.tail.position.y;

        if (this.direction == 0)
            y++;
        if (this.direction == 1)
            y--;
        if (this.direction == 2)
            x++;
        if (this.direction == 3)
            x--;

        let newCell = new SnakeCell(x, y, this.tail.dimension.width, this.tail.dimension.height, this.drawingContext);
        newCell.color = "green";
        this.body.push(newCell);
    }
}