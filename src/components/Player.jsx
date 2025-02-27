/* eslint-disable react/prop-types */
import { useState } from "react"

function Player({initName, symbol, isActive, onChangeName}) {
  const [playerName, setPlayerName] = useState(initName)
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing((editing) => !editing)

    if (isEditing) {
      onChangeName(symbol, playerName)
    }
  }

  const handleChange = (e) => {
    setPlayerName(e.target.value)
  }

  let playerNameJsx = <span className="player-name">{playerName}</span>

  if (isEditing) {
    playerNameJsx = <input type="text" required value={playerName} onChange={handleChange} />
  }

  return (
    <li className={isActive ? "active" : undefined} >
      <span className="player">
        {playerNameJsx}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit "}</button>
    </li>
  )
}
export default Player