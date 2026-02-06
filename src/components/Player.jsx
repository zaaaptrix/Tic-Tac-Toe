import {useState} from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}){

    //Edit Name
    const [playerName, setPlayerName] = useState(initialName);   

    // Edit Button
    const [isEditing, setIsEditing] = useState(false);
    
    let OriginalName = <span className="player-name" >{playerName}</span>;
    
    function editing(){
        setIsEditing(edit => !edit);

        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }
    
    if(isEditing){
        OriginalName = <input type="text" required defaultValue={playerName} onChange={handleChange}/>;
    }

    return (
        <li className = {isActive ? "active" : undefined}>
          <span className="player">
              {OriginalName}
              <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={editing}>{isEditing ? 'Save'  : 'Edit'}</button>
        </li>
    );
}
