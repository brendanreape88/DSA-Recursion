//count sheep

function countSheep(n) {
  if (n <= 0) {
    console.log("All sheep counted");
    return;
  }
  console.log(n);
  countSheep(n - 1);
}

countSheep(3);

//power calculator

function powerCalculator(x, y) {
  if (y <= 0) {
    return 1;
  } else {
    return x * powerCalculator(x, y - 1);
  }
}

powerCalculator(5,5);

//reverse string

function reverse(str) {
  if (str === "") {
    return "";
  } else {
    return reverse(str.substr(1)) + str.charAt(0);
  }
}

reverse('Hello');

//triangle number

function tri(n) {
  if (n <= 1) {
    return n;
  } else {
    return n + tri(n - 1);
  }
}

tri(23);

//string splitter

function split(str) {
  //?????
}

//fibonacci

function fibonacci(n) {
  if (n === 1) {
    return [0, 1];
  } else {
    let s = fibonacci(n - 1);
    s.push(s[s.length - 1] + s[s.length - 2]);
    return s;
  }
}

fibonacci(20);

//factorial

function factorial(x) {
  if (x < 0) return;
  if (x === 0) return 1;
  return x * factorial(x - 1);
}

//maze

let maze = [
  [" ", " ", " "],
  [" ", "*", " "],
  [" ", " ", "e"],
];

function walk(column, row) {
  if (maze[column][row] == "e") {
    console.log("We solved the maze at (" + column + ", " + row + ")");
  } else if (maze[column][row] == " ") {
    console.log("At valid position (" + column + ", " + row + ")");
    maze[column][row] = 9;
    if (column < maze.length - 1) {
      walk(column + 1, row);
    }
    if (row < maze[column].length - 1) {
      walk(column, row + 1);
    }
    if (column > 0) {
      walk(column - 1, row);
    }
    if (row > 0) {
      walk(column, row - 1);
    }
  }
}
walk(3, 0);

//anagram

var anaPerm = function (string) {
  var results = {};

  var combos = function (buildCombo, feed) {
    if (!feed.length) {
      results[buildCombo] = "";
      return;
    }
    for (var i = 0; i < feed.length; i++) {
      combos(buildCombo + feed.charAt(i), feed.slice(0, i) + feed.slice(i + 1));
    }
  };

  combos("", string);
  return Object.keys(results);
};
console.log(anaPerm("abc"));

//binary

findBinary(decimal)
   if (decimal == 0)
      binary = 0
   else
      binary = decimal % 2 + 10 * (findBinary(decimal / 2)