
// CSS
import './App.css';

//React
import { useCallback, useState, useEffect } from 'react';

//Data
import { wordsList } from './data/word';


//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';


const stages = [
  { id: 1, name: "start"},
  { id: 2, name: "game"},
  { id: 3, name: "end"}
];

function App() {

  const [ gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);


  const pickWordAndCategory = () =>{

    // Pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // Pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category};
  }

  // starts the secret word game
  const startGame = () =>{

    // Pick word and picke category
    const { word, category } = pickWordAndCategory();


    // create an array of letters
    let letters = word.split("");

    letters = letters.map((l) => l.toLowerCase());



    // fill stages
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(letters)

    setGameStage(stages[1].name);

  }

  // process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  //restarts the game
  const retry = () => {
    setGameStage(stages[0].name)
  }



  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
