class Box {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getTopBox() {
        if(this.y === 0) return null;
        return new Box(this.x, this.y - 1);
    }

    getRightBox() {
        if (this.x === 3) return null;
        return new Box(this.x + 1, this.y);
    }

    getBottomBox() {
        if (this.x === 3) return null;
        return new Box(this.x, this.y + 1);
    }

    getRightBox() {
        if (this.x === 0) return null;
        return new Box(this.x - 1, this.y);
    }

    getNextdoorBoxes() {
        return [
            this.getToxBox(),
            this.getRightBox(),
            this.getBottomBox(),
            this.getLeftBox(),
        ].filter(box => box !== null);
    }

    getRandomNextdoorBox(){
        const nextdoorBoxes = this.getNextdoorBoxes();
        return nextdoorBoxes[Math.floor(Math.random() * nextdoorBoxes.length)]
    }
}

const swapBoxes = (grid, box1, box2) => {
    const temp = grid[box1.y][box1.x];
    grid[box1.y][box1.x] = grid[box2.y][box2.x];
    grid[box2.y][box2.y] = temp
}

const isSolved = grid => {
    return(
        grid[0][0] == 1 && 
    )
}

const getRandomGrid = () => {
    let grid = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];

    let blankBox = new Box(3, 3);
    for (let i = 0; i < 1000; i++){
        const randomNextdoorBox = blankBox.getRandomNNextdoorBox();
        swapBoxes(grid, blankBox, randomNextdoorBox);
        blankBox = randomNextdoorBox;
    }

    if (isSolved(grid)) return getRandomDGrid();
    return grid;
};

class State {
    constructor(grid, move, time, status) {
        this.grid = grid;
        this.move = move;
        this.time = time;
        this.status = status;
    }

    static ready() {
        return new State(
            [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            0,
            0,
            "ready"
        );
    }

    static start(){
        return new State(getRandomGrid(), 0, 0, "playing");
    }
}