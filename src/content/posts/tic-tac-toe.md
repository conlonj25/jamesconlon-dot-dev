---
title: "Tic-Tac-Toe Hard Mode"
pubDate: 2024-04-05
description: "Solving challenges on the classic React tic-tac-toe project"
author: "James Conlon"
image:
  url: "https://docs.astro.build/assets/full-logo-light.png"
  alt: "The full Astro logo."
tags: ["webdev", "javascript", "beginners", "react"]
---

Anyone who knows React is probably familiar with the famous tic-tac-toe example from the [training docs](https://react.dev/learn/tutorial-tic-tac-toe). It covers most of the basic priciples of React in one single project. It also includes a handful of challenges at the end to help you expand on what you've learned. I distinctly remember not being able to do any of them and quitting immediately. Well who's laughing now? (Me)

Anyway, we do it because it's there. Keep reading and I guarantee you'll find something you disagree with.

## 1. Change button to text

> For the current move only, show “You are at move #…” instead of a button.

[Full Solution on Codesandbox](https://codesandbox.io/p/sandbox/1-change-message-6j7qcv)

Nice easy one to start. The final button in the list does nothing so we replace it with a plain text message.

![Solution for problem 1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/prafdg1qqkg48qd9mcjs.png)

This is simple enough to do with a ternary inside the component. We already map each move to a list item `<li>`. Now inside each list item we check to see if it's the final element (remember -1 because zero index). Then we return either a string or a button.

```javascript
<li key={move}>
  {move === history.length - 1 ? (
    `You are at move #${move}`
  ) : (
    <button onClick={() => jumpTo(move)}>{description}</button>
  )}
</li>
```

## 2. Refactor Board

> Rewrite Board to use two loops to make the squares instead of hardcoding them.

[Full Solution on Codesandbox](https://codesandbox.io/p/sandbox/2-refactor-board-zkrpwj)

This is purely a refactor. Only the code will change. The actual rendered app and functionality will remain exactly the same.

First we'll try the nice solution. The one that I want to work. I want it to work so bad!

```javascript
const boardLayout = [...Array(9).keys()].map((i) => (
  <Square value={squares[i]} onSquareClick={() => handleClick(i)} />
));
```

Look how neat that is! They key bit here is `[...Array(9).keys()]`. This is a time-honoured javascript hack that acts as our equivalent of a range function in any other language Basically, create an array of 9 elements, get the keys of those elements (0, 1, 2, ...) and then spread those keys out into an array. This lets me nicely map out the same element nine times using a single line of code. But... there's a catch!

![Board rendered incorrectly](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jy86pu30rwgki2gkn8cl.png)

Yep, that's not right! We have forgotten to add the row container. This means that instead of using my catchy one-liner from above we are going to have to perform an unholy combination of logic and layout. So we end up with the code below. It's a loop within a loop, as specified. Three rows, three columns. It's definitely not as pretty, but pretty wasn't the challenge.

```javascript
const boardLayout = [...Array(3).keys()].map((row) => (
  <div className="board-row">
    {[...Array(3).keys()].map((col) => {
      const i = row * 3 + col;
      return <Square value={squares[i]} onSquareClick={() => handleClick(i)} />;
    })}
  </div>
));
```

Replacing the original static layout with a new dynamic one has pros and cons. Pro: we reduce repeated code and make it more maintainable. Con: We replace a simple layout with much more convoluted logic, making the code much less readable. In this case I would always prefer the static layout but dynamic layouts are very common and are much more maintainable in larger apps.

## 3. Toggle

> Add a toggle button that lets you sort the moves in either ascending or descending order.

[Full Solution on Codesandbox](https://codesandbox.io/p/sandbox/3-toggle-button-g64wgf)

This one is super easy!

![Solution for problem 3](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/48jgiccfo5fw5j7zb6mh.png)
![Solution for problem 3](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mgq5lehjadbc21ydto3g.png)

The layout for our moves currently looks like this: `<ol>{moves}</ol>`.
Here `moves` is nothing but an array of JSX elements. Why not swap them around like so `<ol>{moves.reverse()}</ol>`?

This is perfectly fine to do because `moves` isn't state. It is derived from state, i.e. `moves = history.map()`. Crucially, the map function creates a copy of the array that we can mutate as much as we like. No state problems here officer!

Obviously, that's not exactly everything. I'll add a single piece of boolean state, toggle it with a button and check it before reversing.

```javascript
return (
  <div className="game">
    <div className="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
    </div>
    <div className="game-info">
      <ol reversed={isMovesReversed}>
        {isMovesReversed ? moves.reverse() : moves}
        <br />
        <button onClick={() => setIsMovesReversed(!isMovesReversed)}>
          {isMovesReversed
            ? "Show moves in ascending order"
            : "Show moves in descending order"}
        </button>
      </ol>
    </div>
  </div>
);
```

And bingo! Note that `isMovesReversed` is used to control the order of the moves elements and the text on the button. Using ternarys for simple logic like this is perfectly fine.

One side note that I hadn't thought about is that this is an ordered list. It doesn't care what order the array is in. It just counts elements starting from 1. Luckily HTML came pre-bundled with a solution for that. `<ol>` in native HTML has a `reversed` attribute. We can just tie that to `isMovesReversed`. Beautiful native HTML!

## 4. Winning streak

[Full Solution on Codesandbox](https://codesandbox.io/p/sandbox/4-winning-streak-rjvvz8)

> When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).

![Solution for problem 4](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kmpuxbaioo50l3n8rcql.png)

The good news with this one is that all the heavy lifting of calculating the winner has already been done. The original solution contains the following.

```javascript
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
```

`lines` defines every possible combination that could be considered a straight line on the board. `calculateWinner` checks if all three have the same value and then returns that value. If we adapt `calculateWinner` we can have it also return the specific combination that won. Sounds super useful!

```javascript
return [squares[a], lines[i]];
```

This is what that looks like. The function now returns two values. So it's important we remember to destructure those two values everywhere we use it.

```javascript
const [winner, winnerLine] = calculateWinner(squares);
```

Like so. The first bit `winner` is used for it's original purpose. The second bit `winnerLine` will go on to do great things.

But first we have to consider the actual square component. How do we make it turn green? In react we can pass inline CSS as a simple object to the style prop.

```javascript
function Square({ value, onSquareClick }) {
  return (
    <button
      style={{ background: "green" }}
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
```

You will see every square has now turned green. That's what we wanted right? Damn! Ok, let's make it conditional on some prop `isWinner`. We'll figure out what that is later.

```javascript
function Square({ value, onSquareClick, isWinner }) {
  return (
    <button
      style={isWinner ? { background: "green" } : {}}
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
```

Uh-oh! It's later already. How are we going to tell this square if it's a winner or not? Remember when I said `winnerLine` would go on to do great things? Turns out we can just check the square number, and if it's in `winnerLine`, it's a winner!

```javascript
<Square
  value={squares[i]}
  onSquareClick={() => handleClick(i)}
  isWinner={winnerLine && winnerLine.includes(i)}
/>
```

It's that easy! Note, we check if it exists first. `winnerLine` only exists once a winner has been determined.

One more thing. We need a stalemate message. Stalemate occurs when we reach the final move and there is no winner. I think the easiest way to achieve this is to give the board an extra prop `currentMove` and pass this down from App. Nothing super clever here just a few mutually exclusive if statements to cover all our cases.

```javascript
if (winner) {
  status = "Winner: " + winner;
}
if (!winner && currentMove === 9) {
  status = "Stalemate!";
}
if (!winner && currentMove !== 9) {
  status = "Next player: " + (xIsNext ? "X" : "O");
}
```

It's not perfect but it will cover every case we will encounter here.

## 5. Move Locations

> Display the location for each move in the format (row, col) in the move history list.

[Full Solution on Codesandbox](https://codesandbox.io/p/sandbox/5-move-locations-y75hk6)

Like the prompt said. Display the board coordinates of each move.

![Solution for problem 5](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5qj4okwjk41s5m7wxcda.png)

Currently state is used to track two things

- `history`
- `currentMove`

We could add an extra piece of state. i.e. for each move we store a number that represents the location of that move. That's cool, but we would have to ensure we keep that new state in sync with the `history` at all times. Not so easy, especially in a larger app. We could also augment `history` into an object so it could store more detailed information. That sounds like a better option but can we go even better? Can we use what we already have?

By comparing the board between any two given moves we can determine the location of the move. All this information already exists in state, we just calculate what we want on the render. It's definitely putting some computation onto each render but I think here we will get away with it.

```javascript
function getMoveIndex(oldSquare, newSquare) {
  if (oldSquare && newSquare) {
    for (let i = 0; i < oldSquare.length; i++) {
      if (oldSquare[i] !== newSquare[i]) {
        return i;
      }
    }
  }

  return -1;
}
```

Basically, give me two squares: old and new. Run through the each element of the squares until you find two values that aren't the same. That's the index that changed! The default case (-1) is to cover the first move where a previous move does not exist.

```javascript
function indexToCoords(i) {
  if (i >= 0 && i <= 8) {
    return `[${Math.floor(i / 3) + 1}, ${(i % 3) + 1}]`;
  }
  return "";
}
```

It's trivial to go from an index value to a row/column value but it looks terrible. All that logic is neatly wrapped in `indexToCoords`.

```javascript
const coords = indexToCoords(getMoveIndex(history[move - 1], history[move]));
```

Finally, for each move in history we just calculate `coords` (as in coordinates). Now you can use `coords` wherever you want to display the string. Note that on the first pass `history[move - 1]` actually becomes `history[-1]` which is undefined. This is why we setup `getMoveIndex` to handle undefined input.

## Epilogue

I think these were useful challenges. Refactoring and retooling code forces you to make a million small design decisions every day. These exercises do a nice job of exposing them at a small scale. Hopefully all the little decisions I've made here are defensible. If not, fight me in the comments. What would you do differently?
