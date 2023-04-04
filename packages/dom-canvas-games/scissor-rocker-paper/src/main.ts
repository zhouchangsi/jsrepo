import { imgUrl } from "./assets";

// DOMs
const userChoiceDisplay = document.getElementById(
  "user-choice"
) as HTMLImageElement;
const computerChoiceDisplay = document.getElementById(
  "computer-choice"
) as HTMLImageElement;
const resultDisplay = document.getElementById("result") as HTMLImageElement;
const choicesButtons: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll("button");

// type define
type Choice = "scissors" | "rock" | "paper";

// main
computerChoiceDisplay.src = getImgByChoice("paper");
choicesButtons.forEach((choiceButton) =>
  choiceButton.addEventListener("click", (e) => {
    let userChoice: Choice = (e.target as HTMLButtonElement).id as Choice;
    userChoiceDisplay.src = getImgByChoice(userChoice);

    let computerChoice = getRamdomChoice();
    computerChoiceDisplay.src = getImgByChoice(computerChoice);

    let result = getResult(computerChoice, userChoice);
    resultDisplay.innerHTML = result;
  })
);

// functions
function getImgByChoice(choice: Choice) {
  return imgUrl[choice];
}
const choices: Choice[] = ["paper", "rock", "scissors"];
function getRamdomChoice() {
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}
function getResult(computerChoice: Choice, userChoice: Choice): string {
  if (computerChoice === userChoice) {
    return "its a draw!";
  }
  if (computerChoice === "rock" && userChoice === "paper") {
    return "you win!";
  }
  if (computerChoice === "rock" && userChoice === "scissors") {
    return "you lost!";
  }
  if (computerChoice === "paper" && userChoice === "scissors") {
    return "you win!";
  }
  if (computerChoice === "paper" && userChoice === "rock") {
    return "you lose!";
  }
  if (computerChoice === "scissors" && userChoice === "rock") {
    return "you win!";
  }
  if (computerChoice === "scissors" && userChoice === "paper") {
    return "you lose!";
  }
}
