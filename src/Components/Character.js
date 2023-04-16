import '../App.css';

function Character(characterProp) {
  return (
    <div className="Class-attributes">
      {Object.entries(characterProp.savedCharacter.body).map((([k,v]) => (
        <div>
          {k}: {v}
        </div>
      )))}
    </div>
  );
}

export default Character;
