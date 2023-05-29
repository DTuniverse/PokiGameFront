import { useState, useEffect } from "react"
import "./Arena.css"
import data from "../data.json"
import ProgressBar from "@ramonak/react-progress-bar";


export default function Arena() {
 const [isMounted, setIsMounted] = useState(false);
// ---------------------  Setting up Player Pokemon and Enemy Pokemon ------------------//

  const [ currentPlayer, setCurrentPlayer ] = useState(data[randomNumber()]) //This will be replaced with the chosen pokemon
  const [ currentEnemy, setCurrentEnemy ] = useState(data[randomNumber()])
  
  const [ initialPlayerHp, setInitialPlayerHp ] = useState(currentPlayer?.base.HP)
  const [ initialEnemyHp, setInitialEnemyHp ] = useState(currentEnemy?.base.HP)

// --------------------------------------------------------------------------------------//
 const maxHP = 255
 const maxAtt = 181
 const maxDef = 230
 const maxSPAtt = 173
 const maxSPDef = 230
 const maxSp = 160

  const playerDmg = Math.floor((currentPlayer.base.Attack/1.8) *((maxDef-currentEnemy.base.Defense)/maxDef))
  const enemyDmg = Math.floor((currentEnemy.base.Attack/1.8) *((maxDef-currentPlayer.base.Defense)/maxDef))
  const playerSPDmg = Math.floor((currentPlayer.base["Sp. Attack"]/1.7)*((maxSPDef-currentEnemy.base["Sp. Defense"])/maxSPDef))
  const enemySPDmg = Math.floor((currentEnemy.base["Sp. Attack"]/1.7)*((maxSPDef-currentPlayer.base["Sp. Defense"])/maxSPDef))

  const enemyRemainingHp = randomNumber() > 30 ?  (currentEnemy.base.HP - playerDmg) : (currentEnemy.base.HP - playerSPDmg)
  const playerRemainingHP = randomNumber() > 30 ? (currentPlayer.base.HP - enemyDmg) : (currentPlayer.base.HP - enemySPDmg)

  function randomNumber() {
    let randomNum = Math.floor(Math.random() * 100)
    return randomNum
  }

  // useEffect(() => {
  //   // This runs only on the initial render
  //   setIsMounted(true);
  // }, []);
   
// --------------------------------------------------------------------------------------//
  function consoleLog() {
    console.log("current pokemon", currentPlayer)
    console.log("current enemy", currentEnemy)
    console.log("initial player HP", initialPlayerHp)
    console.log("initial enemy HP", initialEnemyHp)
    console.log(randomNumber())
    // console.log("random num1", randomNumber())
    // console.log("random num2", randomNumber())
  }
//------------------------------ Combat Logic -----------------------------------------//


            //------------------- Type Chart ------------------------//



function basicAttack() {
  function randomAttNumber() {
    let randomNum = Math.floor(Math.random() * 100)
    return randomNum
  }
  // 30% chance to inflict SP attack damage
  
  console.log("player remaining hp", playerRemainingHP)
  console.log("enemy remaining hp", enemyRemainingHp)
  console.log("random number in attack function", randomAttNumber())

  console.log(`The player caused ${randomAttNumber() > 30 ? playerDmg : playerSPDmg} ${randomAttNumber() > 30 ? "damage" : "Special Dmg"} to ${currentEnemy.name.english}`)
  console.log(`The Enemy caused ${randomAttNumber() > 30 ? enemyDmg : enemySPDmg} ${randomAttNumber() > 30 ? "damage" : "Special Dmg"} to ${currentPlayer.name.english}`)
  
  if(currentPlayer.base.HP < enemyDmg) {
      currentPlayer.base.HP = 0;
      currentEnemy.base.HP = enemyRemainingHp
      setCurrentPlayer({...currentPlayer})
      setCurrentEnemy({...currentEnemy})
    } else if (currentEnemy.base.HP < playerDmg) {
      currentEnemy.base.HP = 0
      currentPlayer.base.HP = playerRemainingHP
      setCurrentEnemy({...currentEnemy})
      setCurrentPlayer({...currentPlayer})
    }
    else {
    currentEnemy.base.HP = enemyRemainingHp
    currentPlayer.base.HP = playerRemainingHP
    setCurrentEnemy({...currentEnemy})
    setCurrentPlayer({...currentPlayer})

    document.getElementById("text-box").innerHTML = `The player caused ${randomNumber > 30 ? playerDmg : playerSPDmg} ${randomNumber > 30 ? "damage" : "Special Dmg"} to ${currentEnemy.name.english} <br/>`
    document.getElementById("text-box").innerHTML = `The Enemy caused ${randomNumber > 30 ? enemyDmg : enemySPDmg} ${randomNumber > 30 ? "damage" : "Special Dmg"} to ${currentPlayer.name.english} <br/>` 
    
    } 
  }

  useEffect(() => {
    if (playerRemainingHP < 0) {
      const HP = currentPlayer.base.HP
      const updatedPlayer = {...currentPlayer, [HP]: 0}
      setCurrentPlayer(updatedPlayer)
    } else if (enemyRemainingHp < 0) {
      const HP = currentEnemy.base.HP
      const updatedEnemy = {...currentEnemy, [HP]: 0}
      setCurrentEnemy(updatedEnemy)
    }    
   },[currentPlayer.base.HP, currentEnemy.base.HP])

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
                <div className="arena__body_arena_body_fighter_stat-bars">
                  <ProgressBar
                    completed={currentPlayer?.base.HP}
                    maxCompleted={initialPlayerHp}
                    bgColor="#ee080e"
                    height="15px"
                    width="70%"
                    labelAlignment="center"
                    labelColor="#030303"
                    customLabel="HP"
                  />
                  <ProgressBar
                    completed={currentPlayer.base.Attack}
                    maxCompleted={maxAtt}
                    bgColor="#E2A43A"
                    height="15px"
                    width="70%"
                    labelAlignment="center"
                    labelColor="#030303"
                    customLabel="ATK"
                  />
                  <ProgressBar
                    completed={currentPlayer.base.Defense}
                    maxCompleted={maxDef}
                    bgColor="#A23AE2"
                    height="15px"
                    width="70%"
                    labelAlignment="center"
                    labelColor="#030303"
                    customLabel="DEF"
                  />
                  <ProgressBar
                    completed={currentPlayer.base["Sp. Attack"]}
                    maxCompleted={maxSPAtt}
                    bgColor="#7ABCE0"
                    height="15px"
                    width="70%"
                    labelAlignment="center"
                    labelColor="#030303"
                    customLabel="SP.ATK"
                  />
                  <ProgressBar
                    completed={currentPlayer.base["Sp. Defense"]}
                    maxCompleted={maxSPDef}
                    bgColor="#AA87D3"
                    height="15px"
                    width="70%"
                    labelAlignment="center"
                    labelColor="#030303"
                    customLabel="SP.DEF"
                  />
                  <ProgressBar
                    completed={currentPlayer.base.Speed}
                    maxCompleted={maxSp}
                    bgColor="#88E07A"
                    height="15px"
                    width="70%"
                    labelAlignment="center"
                    labelColor="#030303"
                    customLabel="SPD"
                  />
                  </div>
                  <div className="arena__body_arena_body_fighter_stat-stats">
                    <div>{currentPlayer?.base.HP}/{initialPlayerHp}</div>
                    <div>{currentPlayer.base.Attack}/{maxAtt}</div>
                    <div>{currentPlayer.base.Defense}/{maxDef}</div>
                    <div>{currentPlayer.base["Sp. Attack"]}/{maxSPAtt}</div>
                    <div>{currentPlayer.base["Sp. Defense"]}/{maxSPDef}</div>
                    <div>{currentPlayer.base.Speed}/{maxSp}</div>
                  </div>
                </div>
                <div className="arena__body_arena_body_fighter_stat">
                  <div className="arena__body_arena_body_fighter_stat-bars">
                    <ProgressBar
                      completed={currentEnemy.base.HP}
                      maxCompleted={initialEnemyHp}
                      bgColor="#ee080e"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="HP"
                    />
                    <ProgressBar
                      completed={currentEnemy.base.Attack}
                      maxCompleted={maxAtt}
                      bgColor="#E2A43A"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="ATK"
                    />
                    <ProgressBar
                      completed={currentEnemy.base.Defense}
                      maxCompleted={maxDef}
                      bgColor="#A23AE2"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="DEF"
                    />
                    <ProgressBar
                      completed={currentEnemy.base.Defense}
                      maxCompleted={maxSPAtt}
                      bgColor="#7ABCE0"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="SP.ATK"
                    />
                    <ProgressBar
                      completed={currentEnemy.base.Defense}
                      maxCompleted={maxSPDef}
                      bgColor="#AA87D3"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="SP.DEF"
                    />
                    <ProgressBar
                      completed={currentEnemy.base.Defense}
                      maxCompleted={maxSp}
                      bgColor="#88E07A"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="SPD"
                    />
                  </div>
                  <div className="arena__body_arena_body_fighter_stat-stats">
                    <div>{currentEnemy?.base.HP}/{initialPlayerHp}</div>
                    <div>{currentEnemy.base.Attack}/{maxAtt}</div>
                    <div>{currentEnemy.base.Defense}/{maxDef}</div>
                    <div>{currentEnemy.base["Sp. Attack"]}/{maxSPAtt}</div>
                    <div>{currentEnemy.base["Sp. Defense"]}/{maxSPDef}</div>
                    <div>{currentEnemy.base.Speed}/{maxSp}</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="arena__body_log" id="text-box">This is just some sample</div>
      </div>
    </div>
  );
}