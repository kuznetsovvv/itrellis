import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

function Header(){
    return (
        <header className="header" >
            <h1> Vladimir Kuznetsov </h1>
        </header>
    );
}

function Square(props){
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class TheData extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("./apiresult.json")
      .then(res => res.text())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items
          
        }
        </ul>
      );
    }
  }
}


class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        };
    }
    
  handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1 ];
      const squares = current.squares.slice();
      if(squares[i] || calculateWinner(squares)){
          return;
      }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
        history: history.concat([{
            squares: squares,
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
      });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
    
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
      const unwinable = checkWinnability(current.squares);

      const moves = history.map((step, move) => {
          const desc = move ?
                'Go to move #' + move :
                'Go to game start';
          return(
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>    
          </li>
          );
      });
      
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if(unwinable){
      status = 'Game is a draw!' +unwinable;
    } else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
      
    return (
      <div className="game">
        <div className="game-board">
          <Board 
        squares={current.squares}
        onClick={(i) => this.handleClick(i)}            
            />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
    <TheData />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function checkWinnability(squares) {
    let winningScenarios = 0;
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
    let step = 0;
    for(let i = 0; i<squares.length; i++){
        if(squares[i]){
            step++;
        }
    }
    const next = ((step % 2) === 0)? 'X' : 'O';
  for (let i = 0; i < lines.length; i++) {
    let useable = 0;
    let hit = null;
    const line = lines[i];
    for(let j = 0; j < line.length; j++){
        if(hit == null){
            hit = squares[line[j]];
        }
    }
    for(let j = 0; j < line.length; j++){
        if(squares[line[j]]==null || squares[line[j]]==hit){
            useable++;
        }
    }
            
    if(useable === 3){
        return false;
    }
  }
  return true;
}