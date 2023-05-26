import { useState, useEffect } from "react"
import "./Arena.css"
import data from "../data.json"
import ProgressBar from "@ramonak/react-progress-bar";


export default function Arena() {

  function randomNumber() {
    let randomNum = Math.floor(Math.random() * 100)
    return randomNum
   }

  // ---------------------  Setting up Player Pokemon and Enemy Pokemon ------------------//

  const randomPokemon = data[randomNumber()]
  const randomEnemy = data[randomNumber()]  
  
  const [ currentPlayer, setCurrentPlayer ] = useState(randomPokemon) 
  const [ currentEnemy, setCurrentEnemy ] = useState(randomEnemy)
  
  const [ currentPlayerHp, setCurrentPlayerHp ] = useState(currentPlayer?.base.HP)
  const [ currentEnemyHp, setCurrentEnemyHp ] = useState(currentEnemy?.base.HP)

// --------------------------------------------------------------------------------------//
  function consoleLog() {
    console.log("current pokemon", currentPlayer)
    console.log("current enemy", currentEnemy)
    console.log("random num1", randomNumber())
    console.log("random num2", randomNumber())
  }
  
//------------------------------ Combat Logic -----------------------------------------//

function basicAttack() {
  const playerAttack = randomNumber() <30? currentPlayer.base["Sp. Attack"]*((100-currentEnemy.base["Sp. Defense"])/100) : currentPlayer.base.Attack *((100-currentEnemy.base.Defense)/100)
  const enemyAttack = randomNumber() <30? currentEnemy.base["Sp. Attack"]*((100-currentPlayer.base["Sp. Defense"])/100) : currentEnemy.base.Attack *((100-currentPlayer.base.Defense)/100)
  const enemyRemainingHp = currentEnemyHp - playerAttack
  const playerRemainingHP = currentPlayerHp - enemyAttack
  console.log(`The player caused ${playerAttack} damage to ${currentEnemy.name.english}`)
  console.log(`The enemy caused ${enemyAttack} damage to ${currentPlayer.name.english}`)
  
  if (currentPlayer.base.Speed > currentEnemy.base.Speed) {
    setCurrentEnemyHp(enemyRemainingHp)
  } else {
    setCurrentPlayerHp(playerRemainingHP)
  }
}

//------------------------------------------------------------------------------------//

  return (
    <div className="arena__wrapper">
      <div className="arena__title">PokeFight</div>
      <div className="arena__body">
        <div className="arena__body_arena">
          <div className="arena__body_arena_header">
            <div className="arena__body_arena_header_card">{currentPlayer?.name.english}</div>
            <div className="arena__body_arena_header_card">{currentEnemy?.name.english}</div>
          </div>
          <div className="arena__body_arena_body">
            <div className="arena__body_arena_body_fighters">
              <div className="arena__body_arena_body_fighter">Fighter 1<button onClick={consoleLog}>Console log</button></div>
              <div className="arena__body_arena_body_fighter">Fighter 1<button onClick={basicAttack}>Attack</button></div>
            </div>
            <div className="arena__body_arena_body_stats">
              <div className="arena__body_arena_body_fighter_stat">
              <ProgressBar 
                completed={currentPlayerHp}
                maxCompleted={currentPlayer?.base.HP}
                bgColor="#ee080e"
                height="15px"
                width="70%"
                labelAlignment="center"
                labelColor="#030303"
                customLabel="HP"
              /> {/* {currentPlayerHp} */}
              <ProgressBar 
                completed={currentPlayer.base.Attack}
                maxCompleted={currentPlayer.base.Attack}
                bgColor="#E2A43A"
                height="15px"
                width="70%"
                labelAlignment="center"
                labelColor="#030303"
                customLabel="ATK"
              />
              <ProgressBar 
                completed={currentPlayer.base.Defense}
                maxCompleted={currentPlayer.base.Defense}
                bgColor="#A23AE2"
                height="15px"
                width="70%"
                labelAlignment="center"
                labelColor="#030303"
                customLabel="DEF"
              />
              <ProgressBar 
                completed={currentPlayer.base.Defense}
                maxCompleted={currentPlayer.base.Defense}
                bgColor="#7ABCE0"
                height="15px"
                width="70%"
                labelAlignment="center"
                labelColor="#030303"
                customLabel="SP.ATK"
              />
              <ProgressBar 
                completed={currentPlayer.base.Defense}
                maxCompleted={currentPlayer.base.Defense}
                bgColor="#AA87D3"
                height="15px"
                width="70%"
                labelAlignment="center"
                labelColor="#030303"
                customLabel="SP.DEF"
              />
              <ProgressBar 
                completed={currentPlayer.base.Defense}
                maxCompleted={currentPlayer.base.Defense}
                bgColor="#88E07A"
                height="15px"
                width="70%"
                labelAlignment="center"
                labelColor="#030303"
                customLabel="SPD"
              />
              </div>
              <div className="arena__body_arena_body_fighter_stat">
              <ProgressBar 
                completed={currentEnemyHp}
                maxCompleted={currentEnemy?.base.HP}
                bgColor="#ee080e"
                height="15px"
                width="70%"
                labelAlignment="center"
                labelColor="#030303"
                customLabel="HP"
              />
              <ProgressBar 
                completed={currentEnemy.base.Attack}
                maxCompleted={currentEnemy.base.Attack}
                bgColor="#E2A43A"
                height="15px"
                width="70%"
                labelAlignment="center"
                labelColor="#030303"
                customLabel="ATK"
              />
              <ProgressBar 
                completed={currentEnemy.base.Defense}
                maxCompleted={currentEnemy.base.Defense}
                bgColor="#A23AE2"
                height="15px"
                width="70%"
                labelAlignment="center"
                labelColor="#030303"
                customLabel="DEF"
              />
              <ProgressBar 
                completed={currentEnemy.base.Defense}
                maxCompleted={currentEnemy.base.Defense}
                bgColor="#7ABCE0"
                height="15px"
                width="70%"
                labelAlignment="center"
                labelColor="#030303"
                customLabel="SP.ATK"
              />
              <ProgressBar 
                completed={currentEnemy.base.Defense}
                maxCompleted={currentEnemy.base.Defense}
                bgColor="#AA87D3"
                height="15px"
                width="70%"
                labelAlignment="center"
                labelColor="#030303"
                customLabel="SP.DEF"
              />
              <ProgressBar 
                completed={currentEnemy.base.Defense}
                maxCompleted={currentEnemy.base.Defense}
                bgColor="#88E07A"
                height="15px"
                width="70%"
                labelAlignment="center"
                labelColor="#030303"
                customLabel="SPD"
              />
              </div>
            </div>
          </div>
        </div>
        <div className="arena__body_log"><button>This is just some sample</button></div>
      </div>
    </div>
  );
}