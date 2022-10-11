// Add functionalities for all buttons here
//  and can also add more functionalities with proper Comments

//global variables
// these variables are used for implementing x^y button
var normal = "#result-str .normal"; // selector
var superscript = "#result-str .superscript"; // selector
var isSuper = false; // superscript
var normalText = "0"; // normal text
var superscriptText = "0"; // superscript text
var timesClicked = 0; // number of times x^y button was clicked

function typed(value, element) {
  if (isSuper) element = superscript;
  else element = normal;
  let n = document.querySelector(element).innerText;
  if (n == "0" && n.length == 1)
    //to prevent typing 0 in beginning
    document.querySelector(element).innerText = value;
  else document.querySelector(element).innerText += value;
}
function displayAnswer(ans) {
  if (!isNaN(ans)) {
    document.getElementById("answer").innerHTML = ans;
  } else {
    document.getElementById("answer").innerHTML = "Incorrect Expression";
    document.querySelector("#answer").style.fontSize = ".6em"; // getElementById also works
    document.querySelector("#answer").style.fontWeight = "bold"; // getElementById also works
  }
}
function trigo(func) {
  let n = document.querySelector(normal).innerHTML;
  let n_rad = n * (Math.PI / 180); // convert to radians
  let ans = "";
  if (func == "sin") {
    ans = Math.sin(n_rad);
    document.querySelector(normal).innerHTML = `sin(${n})`;
  } else if (func == "cos") {
    ans = Math.cos(n_rad);
    document.querySelector(normal).innerHTML = `cos(${n})`;
  } else if (func == "tan") {
    ans = Math.tan(n_rad);
    document.querySelector(normal).innerHTML = `tan(${n})`;
  }
  displayAnswer(ans);
}
function logarithm(func) {
  let n = document.querySelector(normal).innerHTML;
  let ans = "";
  if (func == "log") {
    ans = Math.log10(n);
    document.querySelector(normal).innerHTML = `log(${n})`;
  } else if (func == "ln") {
    ans = Math.log(n);
    document.querySelector(normal).innerHTML = `ln(${n})`;
  }
  displayAnswer(ans);
}
function pow(func) {
  let n = document.querySelector(normal).innerHTML;
  let ans = "";
  if (func == "sqrt") {
    ans = Math.pow(n, 1 / 2);
    document.querySelector(normal).innerHTML = `√(${n})`;
  } else if (func == "cbrt") {
    ans = Math.pow(n, 1 / 3);
    document.querySelector(normal).innerHTML = `∛(${n})`;
  } else if (func == "squared") {
    ans = Math.pow(n, 2);
    document.querySelector(normal).innerHTML = `(${n})^2`;
  } else if (func == "cubbed") {
    ans = Math.pow(n, 3);
    document.querySelector(normal).innerHTML = `(${n})^3`;
  }
  displayAnswer(ans);
}
function reset() {
  isSuper = false;
  normalText = "0";
  superscriptText = "0";
  timesClicked = 0;
}

function displaySavedAnswer() {
  const answer = localStorage.getItem("answer");
  if (answer) {
    document.getElementById("savedAnswer").innerHTML = answer;
  }
}

function save(ans) {
  localStorage.setItem("answer", ans);
}

window.onload = function () {
  /* display previous answer at start */
  displaySavedAnswer();
  /* Clear */
  document.getElementById("clear").onclick = function () {
    document.querySelector(normal).innerHTML = "0";
    document.querySelector(superscript).innerHTML = "";
    document.getElementById("answer").innerHTML = "0";
    reset();
  };
  /* del */
  document.getElementById("del").onclick = function () {
    if (isSuper) element = superscript;
    else element = normal;
    let s = document.querySelector(element).innerHTML;
    let length = s.length;
    if (length == 1) document.querySelector(element).innerHTML = 0;
    else document.querySelector(element).innerHTML = s.slice(0, length - 1);
  };
  /* equal */
  document.getElementById("equal-btn").onclick = function () {
    reset();
    ans = eval(document.querySelector(normal).innerHTML);
    displayAnswer(ans);
    displaySavedAnswer();
    save(ans);
  };
  /* percent */
  document.getElementById("percent").onclick = function () {
    let ans = document.querySelector(normal).innerHTML / 100;
    typed("%", normal);
    displayAnswer(ans);
  };
  document.getElementById("sin").onclick = function () {
    trigo("sin");
  };
  document.getElementById("cos").onclick = function () {
    trigo("cos");
  };
  document.getElementById("tan").onclick = function () {
    trigo("tan");
  };
  document.getElementById("log").onclick = function () {
    logarithm("log");
  };
  document.getElementById("ln").onclick = function () {
    logarithm("ln");
  };
  document.getElementById("sqrt").onclick = function () {
    pow("sqrt");
  };
  document.getElementById("cbrt").onclick = function () {
    pow("cbrt");
  };
  document.getElementById("x-pow-y").onclick = function () {
    ++timesClicked;
    const normalElement = document.querySelector(normal);
    const superElement = document.querySelector(superscript);
    if (timesClicked == 1) {
      superElement.innerHTML = "0";
      normalElement.style.border = "1px solid white";
    } else if (timesClicked == 2) {
      normalText = normalElement.innerHTML;
      isSuper = true;
      normalElement.style.border = "0px";
      superElement.style.border = "1px solid white";
    } else if (timesClicked == 3) {
      isSuper = false;
      superscriptText = superElement.innerHTML;
      superElement.style.border = "0px";
      ans = Math.pow(normalText, superscriptText);
      displayAnswer(ans);
      timesClicked = 0;
    }
  };
  document.getElementById("squared").onclick = function () {
    pow("squared");
  };
  document.getElementById("cubbed").onclick = function () {
    pow("cubbed");
  };
};
