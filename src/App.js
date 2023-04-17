import { useState, useEffect } from 'react';
import './App.css';
import Character from './Components/Character';
import ClassAttributes from './Components/ClassAttributes';
import { ATTRIBUTE_LIST, CLASS_LIST } from './consts.js';


function App() {
  const [num, setNum] = useState(Object.fromEntries(ATTRIBUTE_LIST.map(k => [k, 0])));
  const [barbarian, setBarbarian] = useState(false);
  const [wizard, setWizard] = useState(false);
  const [bard, setBard] = useState(false);
  const [classShowing, setClassShowing] = useState("");
  const [character, setCharacter] = useState("");
  const [total, setTotal] = useState(0);

  function increment(attribute) {
    let incrementValue = total === 70 ? num[attribute] : num[attribute] + 1;
    setNum({ ...num, [attribute]: incrementValue });
    setTotal(total === 70 ? total : total + 1);
  }

  function decrement(attribute) {
    setNum({ ...num, [attribute]: num[attribute] > 0 ? num[attribute] - 1 : 0 });
    setTotal(num[attribute] > 0 ? total - 1 : total);
  }

  useEffect(() => {
    for (const classKey in CLASS_LIST) {
      let classAchieved = true;
      for (const numKey in num) {
        if (num[numKey] < CLASS_LIST[classKey][numKey]) {
          classAchieved = false;
        }
      }
      if (classAchieved) {
        if (classKey === "Barbarian") setBarbarian(true)
        if (classKey === "Wizard") setWizard(true)
        if (classKey === "Bard") setBard(true)
      } else {
        if (classKey === "Barbarian") setBarbarian(false)
        if (classKey === "Wizard") setWizard(false)
        if (classKey === "Bard") setBard(false)
      }
    }
  }, [num, barbarian, wizard, bard])
  
  function showAttributes(classKey) {
    setClassShowing(classKey);
  }
  
  function save(num) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(num)
    };
    fetch('https://recruiting.verylongdomaintotestwith.ca/api/{rayonetwo}/character', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  function get() {
    fetch('https://recruiting.verylongdomaintotestwith.ca/api/{rayonetwo}/character')
      .then(response => response.json())
      .then(data => {
        setCharacter(data);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <ul>
          <li style={barbarian === true ? {color:"red"} : {color:"white"}} onClick={() => {showAttributes("Barbarian")}}>Barbarian</li>
          <li style={wizard === true ? {color:"red"} : {color:"white"}} onClick={() => {showAttributes("Wizard")}}>Wizard</li>
          <li style={bard === true ? {color:"red"} : {color:"white"}} onClick={() => {showAttributes("Bard")}}>Bard</li>
        </ul>
        {
          classShowing
            ? <ClassAttributes classKey={classShowing} />
            : null
        }
        {ATTRIBUTE_LIST.map(attribute => (
          <div>
            {attribute}: {num[attribute]} {attribute} Modifier: {Math.floor((num[attribute]-10)/2)}<br />
            <button onClick={() => {increment(attribute)}}>+</button>
            <button onClick={() => {decrement(attribute)}}>-</button>
          </div>
        ))}
        <div>
          <button onClick={() => {save(num)}}>Save</button>
          <button onClick={() => {get()}}>Get</button>
        </div>
        {
          character
            ? <Character savedCharacter={character} />
            : null
        }
      </section>
    </div>
  );
}

export default App;
