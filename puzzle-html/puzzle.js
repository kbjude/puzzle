class Box {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }


  
    getTopBox() {
      if (this.y === 0) return null;
      return new Box(this.x, this.y - 1);
    }
  
    getRightBox() {
      if (this.x === 3) return null;
      return new Box(this.x + 1, this.y);
    }
  
    getBottomBox() {
      if (this.y === 3) return null;
      return new Box(this.x, this.y + 1);
    }
  
    getLeftBox() {
      if (this.x === 0) return null;
      return new Box(this.x - 1, this.y);
    }
  
    getNumber() {
      return [
        this.getTopBox(),
        this.getRightBox(),
        this.getBottomBox(),
        this.getLeftBox()
      ].filter(box => box !== null);
    }
  
    getrandomNumber() {
      const nextdoorBoxes = this.getNumber();
      return nextdoorBoxes[Math.floor(Math.random() * nextdoorBoxes.length)];
    }
  }
  
  const swapNumbers = (grid, box1, box2) => {
    const temp = grid[box1.y][box1.x];
    grid[box1.y][box1.x] = grid[box2.y][box2.x];
    grid[box2.y][box2.x] = temp;
  };
  
  const isSolved = grid => {
    return (
      grid[0][0] === 1 &&
      grid[0][1] === 2 &&
      grid[0][2] === 3 &&
      grid[0][3] === 4 &&
      grid[1][0] === 5 &&
      grid[1][1] === 6 &&
      grid[1][2] === 7 &&
      grid[1][3] === 8 &&
      grid[2][0] === 9 &&
      grid[2][1] === 10 &&
      grid[2][2] === 11 &&
      grid[2][3] === 12 &&
      grid[3][0] === 13 &&
      grid[3][1] === 14 &&
      grid[3][2] === 15 &&
      grid[3][3] === 0
    );
  };
  
  const getRandomGrid = () => {
    let grid = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];
  
    // Shuffle
    let blankBox = new Box(3, 3);
    for (let i = 0; i < 1000; i++) {
      const randomNumber = blankBox.getrandomNumber();
      swapNumbers(grid, blankBox, randomNumber);
      blankBox = randomNumber;
    }
  
    if (isSolved(grid)) return getRandomGrid();
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
  
    static start() {
      return new State(getRandomGrid(), 0, 0, "playing");
    }
  }
  
  class Game {
    constructor(state) {
      this.state = state;
      this.tickId = null;
      this.tick = this.tick.bind(this);
      this.render();
      this.handleClickBox = this.handleClickBox.bind(this);
    }
  
    static ready() {
      return new Game(State.ready());
    }
  
    tick() {
      this.setState({ time: this.state.time + 1 });
    }
  
    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.render();
    }
  
    handleClickBox(box) {
      return function() {
        const nextdoorBoxes = box.getNumber();
        const blankBox = nextdoorBoxes.find(
          nextdoorBox => this.state.grid[nextdoorBox.y][nextdoorBox.x] === 0
        );
        if (blankBox) {
          const newGrid = [...this.state.grid];
          swapNumbers(newGrid, box, blankBox);
          if (isSolved(newGrid)) {
            clearInterval(this.tickId);
            this.setState({
              status: "won",
              grid: newGrid,
              move: this.state.move + 1
            });
          } else {
            this.setState({
              grid: newGrid,
              move: this.state.move + 1
            });
          }
        } else {
            this.state.grid.forEach((row, i) => {
                if(row.includes(0)) {
                    const boxY = i
                    const boxX = row.indexOf(0)
                    console.log('y', boxY, 'Our box.y', box.y, 'x', boxX, box.x)
                    if (boxY === box.y) {
                        console.log('same Y')
                        if(boxX < box.x) {
                          console.log('inside Right FOR: ', 'box.x:', box.x, 'boxX:', boxX);
                            for(let i = box.x; i >= boxX; i--) {
                                console.log('rightboxx', boxX, i, ` (${boxX},${boxY})-(${i},${box.y})`)
                                swapNumbers(this.state.grid, new Box(boxX, boxY), new Box(i, box.y));
                            }
                            if (isSolved(this.state.grid)) {
                                clearInterval(this.tickId);
                                this.setState({
                                  status: "won",
                                  grid: this.state.grid,
                                  move: this.state.move + 1
                                });
                              } else {
                                this.setState({
                                  grid: this.state.grid,
                                  move: this.state.move + 1
                                });
                              }
                        } else if (boxX > box.x) {
                            console.log('inside Left FOR-', 'boxX:', boxX, 'box.x:', box.x);
                            for(let i = box.x; i <= boxX - box.x; i++) {
                                console.log('leftboxx', boxX, i, ` (${boxX},${boxY})-(${i},${box.y})`)
                                swapNumbers(this.state.grid, new Box(boxX, boxY), new Box(i, box.y));
                            }
                            if (isSolved(this.state.grid)) {
                                clearInterval(this.tickId);
                                this.setState({
                                  status: "won",
                                  grid: this.state.grid,
                                  move: this.state.move + 1
                                });
                              } else {
                                this.setState({
                                  grid: this.state.grid,
                                  move: this.state.move + 1
                                });
                              }
                        }
                    } else if (boxX === box.x) {
                        console.log('same X', 'boxY:', boxY, 'box.y:', box.y)
                        if(boxY < box.y) {
                          console.log('inside UP FOR: ', 'box.y:', box.y, 'boxY:', boxY);
                            for(let i = box.y; i >= boxY; i--) {
                                console.log('rightboxY', boxY, i, ` (${boxX},${boxY})-(${i},${box.x})`)
                                swapNumbers(this.state.grid, new Box(boxX, boxY), new Box(box.x, i));
                            }
                            if (isSolved(this.state.grid)) {
                                clearInterval(this.tickId);
                                this.setState({
                                  status: "won",
                                  grid: this.state.grid,
                                  move: this.state.move + 1
                                });
                              } else {
                                this.setState({
                                  grid: this.state.grid,
                                  move: this.state.move + 1
                                });
                              }
                        } else if (boxY > box.y) {
                            console.log('inside Left FOR-', 'boxY:', boxY, 'box.y:', box.y);
                            for(let i = box.y; i <= boxY - box.y; i++) {
                                console.log('leftboxY', boxY, i, ` (${boxX},${boxY})-(${i},${box.x})`)
                                swapNumbers(this.state.grid, new Box(boxX, boxY), new Box(box.x, i));
                            }
                            if (isSolved(this.state.grid)) {
                                clearInterval(this.tickId);
                                this.setState({
                                  status: "won",
                                  grid: this.state.grid,
                                  move: this.state.move + 1
                                });
                              } else {
                                this.setState({
                                  grid: this.state.grid,
                                  move: this.state.move + 1
                                });
                              }
                            }
                    } else {
                        console.log('exited???','boxXY:', boxX, boxY, 'box.xy:', box.x, box.y)
                    }
                }
            })
        }
      }.bind(this);
    }
  
    render() {
      const { grid, move, time, status } = this.state;
  
   
      const newGrid = document.createElement("div");
      newGrid.className = "grid";
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const button = document.createElement("button");
  
          if (status === "playing") {
            button.addEventListener("click", () => {
                console.log(j,i)
                this.handleClickBox(new Box(j, i))()
            });
          }
  
          button.textContent = grid[i][j] === 0 ? "" : grid[i][j].toString();
          newGrid.appendChild(button);
        }
      }
      document.querySelector(".grid").replaceWith(newGrid);
  

      const newButton = document.createElement("button");
      if (status === "ready") newButton.textContent = "Start The Game";
      if (status === "playing") newButton.textContent = "Reset";
      if (status === "won") newButton.textContent = "Play";
      newButton.addEventListener("click", () => {
        clearInterval(this.tickId);
        this.tickId = setInterval(this.tick, 1000);
        this.setState(State.start());
      });
      document.querySelector(".footer button").replaceWith(newButton);
  

      document.getElementById("move").textContent = `Move: ${move}`;
  

      document.getElementById("time").textContent = `Time: ${time}`;
    }
  }
  
  const GAME = Game.ready();