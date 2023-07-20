// Get DOM elements
const usernamePage = document.getElementById("usernamePage");
const gamePage = document.getElementById("gamePage");
const usernameInput = document.getElementById("usernameInput");
const startButton = document.getElementById("startButton");
const usernameText = document.getElementById("usernameText");

// Display username page initially
usernamePage.style.display = "block";

// Handle start button click event
startButton.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username !== "") {
    // Set the username and show the game page
    usernameText.textContent = username;
    usernamePage.style.display = "none";
    gamePage.style.display = "block";
  }
});

// Get DOM elements
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image");

// Global variables to track scores and rounds
let userScore = 0;
let cpuScore = 0;
let roundsPlayed = 0;

// Inside the click event listener for option images
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = cpuResult.src = "images/rock.png";
    result.textContent = "Wait...";

    // Update the round number
    updateRoundNumber(roundsPlayed);


    // Loop through each option image again
    optionImages.forEach((image2, index2) => {
      // If the current index doesn't match the clicked index
      // Remove the "active" class from the other option images
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    // Set a timeout to delay the result calculation
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");

      // Get the source of the clicked option image
      let imageSrc = e.target.querySelector("img").src;
      // Set the user image to the clicked option image
      userResult.src = imageSrc;

      // Generate a random number between 0 and 2
      let randomNumber = Math.floor(Math.random() * 3);
      // Create an array of CPU image options
      let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
      // Set the CPU image to a random option from the array
      cpuResult.src = cpuImages[randomNumber];

      // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
      let cpuValue = ["R", "P", "S"][randomNumber];
      // Assign a letter value to the clicked option (based on index)
      let userValue = ["R", "P", "S"][index];

      // Create an object with all possible outcomes
      let outcomes = {
        RR: "Draw",
        RP: "Cpu",
        RS: "User",
        PP: "Draw",
        PR: "User",
        PS: "Cpu",
        SS: "Draw",
        SR: "Cpu",
        SP: "User",
      };

      // Look up the outcome value based on user and CPU options
      let outcomeValue = outcomes[userValue + cpuValue];

      // Modify outcome value based on username
      if (outcomeValue === "User") {
        outcomeValue = usernameText.textContent;
      } else if (outcomeValue === "Cpu") {
        outcomeValue = "Computer";
      }

      // Display the result
      result.textContent = userValue === cpuValue ? "Match Draw" : `${outcomeValue} Won!!`;

      // Update the scores based on the result
      if (outcomeValue === usernameText.textContent) {
        userScore++;
      } else if (outcomeValue === "Computer") {
        cpuScore++;
      }

      roundsPlayed++;

      // Check if 10 rounds are completed
      if (roundsPlayed === 10) {
        // Hide the gamePage and show the resultPage
        gamePage.style.display = "none";
        showResultPage();
      }
    }, 2500);
  });
});

// Function to update the round number
function updateRoundNumber(roundsPlayed) {
  const roundNumberElement = document.getElementById("roundNumber");
  roundNumberElement.textContent = `Round ${roundsPlayed + 1}`;
}


// Function to display the result page
function showResultPage() {
  const gamePage = document.getElementById("gamePage");
  const resultPage = document.getElementById("resultPage");
  gamePage.style.display = "none";
  resultPage.innerHTML = "";

  // Create and set the content for the result page
  const resultHeading = document.createElement("h2");
  resultHeading.textContent = "Results";
  const userScoreText = document.createElement("p");
  userScoreText.textContent = `${usernameText.textContent}'s Score: ${userScore}`;
  const cpuScoreText = document.createElement("p");
  cpuScoreText.textContent = `Computer Score: ${cpuScore}`;
  const resultText = document.createElement("p");
  resultText.textContent =
    userScore > cpuScore ? `${usernameText.textContent} Won!` : userScore < cpuScore ? `${usernameText.textContent} Lost!` : "It's a Draw!";


  
    // Append the content to the result page
    resultPage.appendChild(resultHeading);
    resultPage.appendChild(userScoreText);
    resultPage.appendChild(cpuScoreText);
    resultPage.appendChild(resultText);

  
    // Show the resultPage
    resultPage.style.display = "block";


}

