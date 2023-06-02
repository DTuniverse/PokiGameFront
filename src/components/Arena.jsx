import { useState, useEffect } from "react"
import "./Arena.css"
import data from "../data.json"
import ProgressBar from "@ramonak/react-progress-bar";
import Fighter from "../components/Fighter"
import Modal_arena from "../components/Modal_arena"

import BasicCard from './Modal_Card';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


export default function Arena({selectedPoke, dataImg}) {
// ---------------------  Setting up Player Pokemon and Enemy Pokemon ------------------//
  const trainers = ["Misty", "Brock", "Jessie", "James", "Prof. Oak", "Reagan"]
  const [ enemyTrainer, setEnemyTrainer ] = useState(trainers[Math.floor(Math.random() * 6)])
  const [ currentPlayer, setCurrentPlayer ] = useState(selectedPoke?.data) 
  let currentPlayerImg = selectedPoke?.dataImg
  const [ currentEnemy, setCurrentEnemy ] = useState(data[randomNumber()])

  const [ enemyImg, setEnemyImg ] = useState()
  const enemyImgData = dataImg?.find(i=>i.name===currentEnemy?.name.english.toLowerCase())
  const fetchEnemyImg = async () => {
    try {
      const res = await fetch(enemyImgData?.url)
      const data = await res.json()
      setEnemyImg(data.sprites.other.dream_world.front_default)
    // console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEnemyImg();
  }, [currentEnemy]);
  
  console.log("This is current Enemy Image", enemyImgData)
  console.log("This is current enemy",currentEnemy)
  
  const [ initialPlayerHp, setInitialPlayerHp ] = useState(currentPlayer?.base.HP)
  const [ initialEnemyHp, setInitialEnemyHp ] = useState(currentEnemy?.base.HP)

// --------------------------------------------------------------------------------------//
 const maxHP = 255
 const maxAtt = 181
 const maxDef = 230
 const maxSPAtt = 173
 const maxSPDef = 230
 const maxSp = 160

  const playerDmg = Math.floor((currentPlayer?.base.Attack/1.8) *((maxDef-currentEnemy?.base.Defense)/maxDef))
  const enemyDmg = Math.floor((currentEnemy?.base.Attack/1.8) *((maxDef-currentPlayer?.base.Defense)/maxDef))
  const playerSPDmg = Math.floor((currentPlayer?.base["Sp. Attack"]/1.7)*((maxSPDef-currentEnemy?.base["Sp. Defense"])/maxSPDef))
  const enemySPDmg = Math.floor((currentEnemy?.base["Sp. Attack"]/1.7)*((maxSPDef-currentPlayer?.base["Sp. Defense"])/maxSPDef))

  const enemyAttack = randomNumber() > 30 ? enemyDmg : enemySPDmg
  const playerAttack = randomNumber() > 30 ? playerDmg : playerSPDmg

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
    // console.log("remaining player hp", playerRemainingHP)
    // console.log("remaining enemy hp", enemyRemainingHp)
    // console.log("random num1", randomNumber())
    // console.log("random num2", randomNumber())
  }
//------------------------------ Combat Logic -----------------------------------------//
function basicAttack() {
  if (currentPlayer.base.HP < enemyDmg) {
    currentPlayer.base.HP = 0
    setCurrentPlayer({...currentPlayer})
    document.getElementById("text-box-top").innerHTML = `${currentPlayer.name.english} was defeated by ${currentEnemy.name.english}`
    document.getElementById("text-box-bottom").innerHTML = `${currentEnemy.name.english} is VICTORIOUS`
  }
  else if (currentEnemy.base.HP < playerDmg) {
    currentEnemy.base.HP = 0
    setCurrentEnemy({...currentEnemy})
    // currentPlayer.base.HP = initialPlayerHp
    // setInitialPlayerHp({...currentPlayer})
    document.getElementById("text-box-top").innerHTML = `${currentPlayer.name.english} is VICTORIOUS`
    document.getElementById("text-box-bottom").innerHTML = `${currentEnemy.name.english} was defeated by ${currentPlayer.name.english}`
  } 
  else {
    if (randomNumber() < 30) {
      if (currentPlayer.base.HP < enemySPDmg) {
          currentPlayer.base.HP = 0
          setCurrentPlayer({...currentPlayer})
          document.getElementById("text-box-top").innerHTML = `${currentPlayer.name.english} was defeated by ${currentEnemy.name.english}`
          document.getElementById("text-box-bottom").innerHTML = `${currentEnemy.name.english} is VICTORIOUS`
      }
      else if (currentEnemy.base.HP < playerSPDmg) {
          currentEnemy.base.HP = 0
          setCurrentEnemy({...currentEnemy})
          // currentPlayer.base.HP = initialPlayerHp
          // setInitialPlayerHp({...currentPlayer})
          document.getElementById("text-box-top").innerHTML = `${currentPlayer.name.english} is VICTORIOUS`
          document.getElementById("text-box-bottom").innerHTML = `${currentEnemy.name.english} was defeated by ${currentPlayer.name.english}`
      } 
      else {
      console.log("this is random number", randomNumber())
      currentPlayer.base.HP = currentPlayer.base.HP - enemySPDmg
      currentEnemy.base.HP = currentEnemy.base.HP - playerSPDmg
      setCurrentPlayer({...currentPlayer})
      setCurrentEnemy({...currentEnemy})
      document.getElementById("text-box-top").innerHTML = `${currentPlayer.name.english} caused ${playerSPDmg} SP damage to ${currentEnemy.name.english}`
      document.getElementById("text-box-bottom").innerHTML = `${currentEnemy.name.english} caused ${enemySPDmg} SP damage to ${currentPlayer.name.english}`
      }
    } 
    else {
      currentPlayer.base.HP = currentPlayer.base.HP - enemyDmg
      currentEnemy.base.HP = currentEnemy.base.HP - playerDmg
      setCurrentPlayer({...currentPlayer})
      setCurrentEnemy({...currentEnemy})
      document.getElementById("text-box-top").innerHTML = `${currentPlayer.name.english} caused ${playerDmg} to ${currentEnemy.name.english}`
      document.getElementById("text-box-bottom").innerHTML = `${currentEnemy.name.english} caused ${enemyDmg} to ${currentPlayer.name.english}`
    }
  }
  
}
useEffect(() => {
  if (currentEnemy.base.HP <= 0) {
    const newEnemy = data[randomNumber()]
    setCurrentEnemy(newEnemy)
    setInitialEnemyHp(newEnemy?.base.HP)
    setInitialPlayerHp(currentPlayer.base.HP)
  }    
 },[currentEnemy.base.HP])




            //------------------- Type Chart ------------------------//

 



  

//------------------------------------------------------------------------------------//

  return (
    <div className="arena__wrapper">
      <div className="arena__title"><button onClick={basicAttack}>Attack</button>PokeFight<button onClick={consoleLog}>Console log</button></div>
      <div className="arena__body">
        {/* <Fighter /> */}
        <Modal_arena />
        <div className="arena__body_arena">
          <div className="arena__body_arena_header">
            <div className="arena__body_arena_header_card">{currentPlayer?.name.english}</div>
            <div className="arena__body_arena_header_card">{enemyTrainer}, {currentEnemy?.name.english}</div>
          </div>
          <div className="arena__body_arena_body">
            <div className="arena__body_arena_body_fighters">
              <div className="arena__body_arena_body_fighter"><img src={currentPlayerImg} alt="player_pokemon"/></div>
              <div className="arena__body_arena_body_fighter"><img src={enemyImg} alt="enemy_pokemon"/></div>
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
                    completed={currentPlayer?.base.Attack}
                    maxCompleted={maxAtt}
                    bgColor="#E2A43A"
                    height="15px"
                    width="70%"
                    labelAlignment="center"
                    labelColor="#030303"
                    customLabel="ATK"
                  />
                  <ProgressBar
                    completed={currentPlayer?.base.Defense}
                    maxCompleted={maxDef}
                    bgColor="#A23AE2"
                    height="15px"
                    width="70%"
                    labelAlignment="center"
                    labelColor="#030303"
                    customLabel="DEF"
                  />
                  <ProgressBar
                    completed={currentPlayer?.base["Sp. Attack"]}
                    maxCompleted={maxSPAtt}
                    bgColor="#7ABCE0"
                    height="15px"
                    width="70%"
                    labelAlignment="center"
                    labelColor="#030303"
                    customLabel="SP.ATK"
                  />
                  <ProgressBar
                    completed={currentPlayer?.base["Sp. Defense"]}
                    maxCompleted={maxSPDef}
                    bgColor="#AA87D3"
                    height="15px"
                    width="70%"
                    labelAlignment="center"
                    labelColor="#030303"
                    customLabel="SP.DEF"
                  />
                  <ProgressBar
                    completed={currentPlayer?.base.Speed}
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
                    <div>{currentPlayer?.base.Attack}/{maxAtt}</div>
                    <div>{currentPlayer?.base.Defense}/{maxDef}</div>
                    <div>{currentPlayer?.base["Sp. Attack"]}/{maxSPAtt}</div>
                    <div>{currentPlayer?.base["Sp. Defense"]}/{maxSPDef}</div>
                    <div>{currentPlayer?.base.Speed}/{maxSp}</div>
                  </div>
                </div>
                <div className="arena__body_arena_body_fighter_stat">
                  <div className="arena__body_arena_body_fighter_stat-bars">
                    <ProgressBar
                      completed={currentEnemy?.base.HP}
                      maxCompleted={initialEnemyHp}
                      bgColor="#ee080e"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="HP"
                    />
                    <ProgressBar
                      completed={currentEnemy?.base.Attack}
                      maxCompleted={maxAtt}
                      bgColor="#E2A43A"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="ATK"
                    />
                    <ProgressBar
                      completed={currentEnemy?.base.Defense}
                      maxCompleted={maxDef}
                      bgColor="#A23AE2"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="DEF"
                    />
                    <ProgressBar
                      completed={currentEnemy?.base.Defense}
                      maxCompleted={maxSPAtt}
                      bgColor="#7ABCE0"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="SP.ATK"
                    />
                    <ProgressBar
                      completed={currentEnemy?.base.Defense}
                      maxCompleted={maxSPDef}
                      bgColor="#AA87D3"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="SP.DEF"
                    />
                    <ProgressBar
                      completed={currentEnemy?.base.Defense}
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
                    <div>{currentEnemy?.base.HP}/{initialEnemyHp}</div>
                    <div>{currentEnemy?.base.Attack}/{maxAtt}</div>
                    <div>{currentEnemy?.base.Defense}/{maxDef}</div>
                    <div>{currentEnemy?.base["Sp. Attack"]}/{maxSPAtt}</div>
                    <div>{currentEnemy?.base["Sp. Defense"]}/{maxSPDef}</div>
                    <div>{currentEnemy?.base.Speed}/{maxSp}</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="arena__body_log" id="text-box">
          <div id="text-box-top">
            This is just some sample
          </div>
          <div id="text-box-bottom">
            This is more sample
          </div>
        </div>
      </div>
    </div>
  );
}