// All the DOM selectors stored as short variables
const board = document.getElementById('board')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')
const findOut = document.getElementById('filter')
const playAgain = document.getElementById('playAgain')
// Array with all the characters, as objects:
const CHARACTERS = [
  {
    name: 'Jabala',
    img: 'images/jabala.svg',
    hair: 'hidden',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hair: 'grey',
    eyes: 'blue',
    accessories: ['hat'],
    other: ['smoker']
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jana',
    img: 'images/jana.svg',
    hair: 'black',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jaqueline',
    img: 'images/jaqueline.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hair: 'purple',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: ['smoker']
  },
  {
    name: 'Jean',
    img: 'images/jean.svg',
    hair: 'brown',
    eyes: 'blue',
    accessories: ['glasses', 'hat'],
    other: ['smoker']
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses', 'hat'],
    other: ['smoker']
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hair: 'white',
    eyes: 'hidden',
    accessories: ['hat'],
    other: ['photo']
  },
  {
    name: 'Jeri',
    img: 'images/jeri.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hair: 'black',
    eyes: 'blue',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hair: 'grey',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hair: 'black',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses', 'hat'],
    other: []
  },
]

// Global variables
let secret 
let currentQuestion
let charactersInPlay

// The game board:
const generateBoard = () => {
  board.innerHTML = ''
  charactersInPlay.forEach((person) => {
    board.innerHTML += `
      <div class="card">
        <p>${person.name}</p>
        <img src=${person.img} alt=${person.name}>
        <div class="guess">
          <span>Guess on ${person.name}?</span>
          <button class="filled-button small" onclick="guess('${person.name}')">Guess</button>
        </div>
      </div>
    `
  })
}

// This function randomly selects a person from the characters array and set as the value of the variable called secret:
const setSecret = () => {
  secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]
}

// This function is used to start (and restart) the game:
const start = () => {
  // Here we're setting charactersInPlay array to be all the characters to start with
  charactersInPlay = CHARACTERS

  //When the game starts, this invokes the game board to be rendered on the screen: 
  generateBoard()

  //The setSecret function is invoked that selects a secret character randomly from the Character array:
  setSecret()

}

// ???setting the currentQuestion object when you select something in the dropdown
const selectQuestion = () => {
  const category = questions.options[questions.selectedIndex].parentNode.label //This variable stores what option group (category) the question belongs to.
  const label = questions.options[questions.selectedIndex].label //This valuable stores the label of the question we've seleced
  const value = questions.options[questions.selectedIndex].value //This variable stores the actual value of the question we've selected.



  currentQuestion = {
    category: category,
    value: value,
    label: label
  }
}

// This function is invoked when you click on 'Find Out' button.
const checkQuestion = () => {
  const { category, value, label } = currentQuestion


  //Comparing the currentQuestion details with the secret person details: 
  if (category === 'hair' || category === 'eyes') {
    if (secret[category] === value) { 
      filterCharacters(true) 
    } else {
      filterCharacters()
    }
  } else if (category === 'accessories' || category === 'other') {
    if (secret[category].includes(value)) { 
      filterCharacters(true)
    } else {
      filterCharacters()
    }
  }
}

// It'll filter the characters array and redraw the game board.
const filterCharacters = (keep) => {
  const { category, value, label } = currentQuestion
  // Show the correct alert message for different categories
  if (category === 'accessories') {
    if (keep) {
      alert(
        `Yes, the person wears ${value}! Keep all people that wears ${value}`
      )
    } else {
      alert(
        `No, the person doesn't wear ${value}! Remove all people that wears ${value}`
      )
    }
  } else if (category === 'hair') {
    if (keep) {
      alert (
        `Yes, the person have ${value} hair! Keep all people that have ${value} hair`
      )
    } else { 
      alert ( 
        `No, the person doesn't have ${value} hair! Remove all people that have ${value} hair`
      )
    }
  } else if (category === 'eyes') {
    if (keep) {
      alert ( 
        `Yes, the person have ${value} eyes! Keep all people that have ${value} eyes`
      )
    } else {
      alert (
        `No, the person doesn't have ${value} eyes! Remove all people that have ${value} eyes`
      )
    }
  } else if (category === 'other' ) { 
    if (keep) {
      alert (
        `Yes, the person ${label}! Keep all people that have ${label}`
      )
    } else {
      alert (
        `No, the person doesn't ${label}! Remove all people that have ${label}`
      )
    }
    generateBoard()
  }

  // Filter by category to keep or remove caracters based on the keep variable.
    if (keep && category === 'hair' || category === 'eyes') {
      charactersInPlay = charactersInPlay.filter((person) => person[category] === value)
    } else if (!keep && category === 'hair' || category === 'eyes') {
      charactersInPlay = charactersInPlay.filter((person) => person[category] !== value)
    } else if (keep && category === 'other' || category === 'accessories') {
      charactersInPlay = charactersInPlay.filter((person) => person[category].includes(value))
    } else if (!keep && category === 'other' || category === 'accessories') {
      charactersInPlay = charactersInPlay.filter((person) => !person[category].includes(value))
    }

  // Invoke to redraw the board with the remaining people.
  generateBoard()
}

// when clicking guess, the player first have to confirm that they want to make a guess.
const guess = (personToConfirm) => {
  const result = window.confirm(`Are you sure you want to guess on ${personToConfirm}?`)
  console.log(personToConfirm)

  if (result) {
    checkMyGuess(personToConfirm)
  } 
  // store the interaction from the player in a variable.
  // remember the confirm() ?
  // If the player wants to guess, invoke the checkMyGuess function.
} 

// If you confirm, this function is invoked
const checkMyGuess = (personToCheck) => {
  if (personToCheck === secret.name) {
    alert(`Hurray, this was correct. YOU win!`)
  } else {
    alert(`Too bad, you lose!`)
  }
  // 1. Check if the personToCheck is the same as the secret person's name
  // 2. Set a Message to show in the win or lose section accordingly
  // 3. Show the win or lose section
  // 4. Hide the game board
}

// Invokes the start function when website is loaded
start()

// All the event listeners
restartButton.addEventListener('click', start)
questions.addEventListener('change', selectQuestion) // This is to listen to the selectQuestion function (when the player interact with the listener)
findOut.addEventListener('click', checkQuestion)
