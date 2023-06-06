import { useState, useEffect } from "react"
import "./Arena.css"
import data from "../data.json"
import ProgressBar from "@ramonak/react-progress-bar";
import Modal_arena from "../components/Modal_arena"
import Modal_win from "./Modal_win";



export default function Arena({selectedPoke, dataImg, name}) {

// ---------------------  Setting up Player Pokemon and Enemy Pokemon and Utils -----------------------------------//
  const trainers = ["Misty", "Brock", "Jessie", "James", "Prof. Oak", "Reagan"]
  const [ enemyTrainer, setEnemyTrainer ] = useState(trainers[Math.floor(Math.random() * 6)])
  const [ currentPlayer, setCurrentPlayer ] = useState(selectedPoke?.data) 
  const [ currentPlayerImg, setCurrentPlayerImg ] = useState(selectedPoke?.dataImg)
  const [ currentEnemy, setCurrentEnemy ] = useState(data[randomNumber()])
  const [ defeatedPokemons, setDefeatedPokemons ] = useState([])
  const [ enemyImg, setEnemyImg ] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ initialPlayerHp, setInitialPlayerHp ] = useState(currentPlayer?.base.HP)
  const [ initialEnemyHp, setInitialEnemyHp ] = useState(currentEnemy?.base.HP)
  const [ animatePlayer, setAnimatePlayer ] = useState(false);
  const [ animateEnemy, setAnimateEnemy ] = useState(false)
  const [ vibratePlayer, setVibratePlayer] = useState(false)
  const [ vibrateEnemy, setVibrateEnemy ] = useState(false)

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

   function randomNumber() {
    let randomNum = Math.floor(Math.random() * 100)
    return randomNum
  }

  function consoleLog() {
    // setAnimatePlayer(true);
    // setTimeout(() => {
    //   setAnimateEnemy(true);
    // }, 1000);
    // setTimeout(() => {
    //   setAnimatePlayer(false);
    // }, 300);
    // setTimeout(() => {
    //   setAnimateEnemy(false);
    // }, 200);

    // setAnimatePlayer(true)
    // setAnimateEnemy(true)
    // setTimeout(() => {
    //   setAnimatePlayer(false)
    // },300)

  //   setAnimatePlayer(true);

  // setTimeout(() => {
  //   setAnimateEnemy(true);
  // }, 1000);


  // setAnimatePlayer(true);

  // setTimeout(() => {
  //   setAnimateEnemy(true);
  // }, 2000); // Delay the enemy animation by 2 seconds

  // setTimeout(() => {
  //   setVibratePlayer(true);
  // }, 4000); // Delay the player vibration animation by 4 seconds

  // setTimeout(() => {
  //   setVibrateEnemy(true);
  // }, 6000);

  // setAnimatePlayer(true)
  // setTimeout(() => {
  //   setAnimatePlayer(false)
  //   setVibrateEnemy(true)
  // }, 500)
  // setTimeout(() => {
  //   setVibrateEnemy(true)
  // },550)
  // setTimeout(() => {
  //   setAnimateEnemy(true)
  //   setVibratePlayer(true)
  // },650)
  // setTimeout(() => {
  //   setAnimateEnemy(false)
  //   setVibratePlayer(false)
  // },750)


  // setAnimatePlayer(true);

  // setTimeout(() => {
  //   setAnimateEnemy(true);
  // }, 500); // Delay the enemy animation by 035 seconds

  // setTimeout(() => {
  //   setVibratePlayer(true);
  // }, 550); // Delay the player vibration animation by 4 seconds

  // setTimeout(() => {
  //   setVibrateEnemy(true);
  // }, 250);

  // setTimeout(() => {
  //   setAnimatePlayer(false);
  //   setAnimateEnemy(false);
  //   setVibratePlayer(false);
  //   setVibrateEnemy(false);
  // }, 1000);

    // console.log("current pokemon", currentPlayer)
    // console.log("current enemy", currentEnemy)
    // console.log("initial player HP", initialPlayerHp)
    // console.log("initial enemy HP", initialEnemyHp)
    // console.log("this is defeated pokemons array", defeatedPokemons)
    // console.log("enemy team", enemyTeam)
    // console.log("remaining player hp", playerRemainingHP)
    // console.log("remaining enemy hp", enemyRemainingHp)
  }

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

  useEffect(() => {
    if (defeatedPokemons.length == 4 || defeatedPokemons.length == 8 ) {
      setIsModalOpen(true);  
    }
  }, [defeatedPokemons]);
  
    useEffect(() => {
    if (currentEnemy.base.HP <= 0) {
      const newEnemy = data[randomNumber()]
      setCurrentEnemy(newEnemy)
      setInitialEnemyHp(newEnemy?.base.HP)
      currentPlayer.base.HP = initialPlayerHp
      setInitialPlayerHp(currentPlayer.base.HP)
    }    
   },[currentEnemy.base.HP])

   const handleAnimateClick = () => {
    setAnimatePlayer(true);
    setTimeout(() => {
      setAnimatePlayer(false);
    }, 1000);
  };

//------------------------------ Combat Logic -------------------------------------------------------------------------//
function basicAttack() {
  if (randomNumber > 85) {
    document.getElementById("text-box-top").innerHTML = `${currentPlayer.name.english} dodges ${currentEnemy.name.english}'s attack and hits ${currentEnemy.name.english} for ${playerDmg} damage!`
    document.getElementById("text-box-bottom").innerHTML = `It appears ${currentEnemy.name.english} took an arrow to the knee :(`
    currentEnemy.base.HP = currentEnemy.base.HP - playerDmg
    setCurrentEnemy({...currentEnemy})
  } else{
      if (currentPlayer.base.HP < enemyDmg) {
        currentPlayer.base.HP = 0
        setCurrentPlayer({...currentPlayer})
        document.getElementById("text-box-top").innerHTML = `${currentPlayer.name.english} was defeated by ${currentEnemy.name.english}`
        document.getElementById("text-box-bottom").innerHTML = `${currentEnemy.name.english} is VICTORIOUS`
      }
      else if (currentEnemy.base.HP < playerDmg) {
        setDefeatedPokemons((prevDefeatedPokemons) => [...prevDefeatedPokemons, currentEnemy.name.english]);
        currentEnemy.base.HP = 0
        setCurrentEnemy({...currentEnemy})
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
              setDefeatedPokemons((prevDefeatedPokemons) => [...prevDefeatedPokemons, currentEnemy.name.english]);
              currentEnemy.base.HP = 0
              setCurrentEnemy({...currentEnemy})
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
      }}
}

function spAttack() {
  if (currentPlayer.base.HP < enemySPDmg) {
    currentPlayer.base.HP = 0
    setCurrentPlayer({...currentPlayer})
    document.getElementById("text-box-top").innerHTML = `${currentPlayer.name.english} was defeated by ${currentEnemy.name.english}`
    document.getElementById("text-box-bottom").innerHTML = `${currentEnemy.name.english} is VICTORIOUS`
  }
  else if (currentEnemy.base.HP < playerSPDmg) {
    setDefeatedPokemons((prevDefeatedPokemons) => [...prevDefeatedPokemons, currentEnemy.name.english]);
    currentEnemy.base.HP = 0
    setCurrentEnemy({...currentEnemy})
    document.getElementById("text-box-top").innerHTML = `${currentPlayer.name.english} is VICTORIOUS`
    document.getElementById("text-box-bottom").innerHTML = `${currentEnemy.name.english} was defeated by ${currentPlayer.name.english}`
  } else {
    currentPlayer.base.HP = currentPlayer.base.HP - enemySPDmg
    currentEnemy.base.HP = currentEnemy.base.HP - playerSPDmg
    setCurrentPlayer({...currentPlayer})
    setCurrentEnemy({...currentEnemy})
    document.getElementById("text-box-top").innerHTML = `${currentPlayer.name.english} caused ${playerSPDmg} SP damage to ${currentEnemy.name.english}`
    document.getElementById("text-box-bottom").innerHTML = `${currentEnemy.name.english} caused ${enemySPDmg} SP damage to ${currentPlayer.name.english}`
  }
}

function dodge() {
  if (randomNumber() > 15) {
    document.getElementById("text-box-top").innerHTML = `${currentPlayer.name.english} dodges ${currentEnemy.name.english}'s attack and hits ${currentEnemy.name.english} for ${playerDmg} damage!`
    document.getElementById("text-box-bottom").innerHTML = `It appears ${currentEnemy.name.english} took an arrow to the knee :(`
    currentEnemy.base.HP = currentEnemy.base.HP - playerDmg
    setCurrentEnemy({...currentEnemy})
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
//------------------- Type Chart --------------------------------------------------//

 



  

//-----------------------------------------------------------------------------------------------------------------------//

  return (
    <div className="arena__wrapper">
      {isModalOpen ? <Modal_win currentPlayer={currentPlayer} currentPlayerImg={currentPlayerImg} name={name} defeatedPokemons={defeatedPokemons} /> : ""}
      <div className="arena__title">PokeFight</div>
      <div className="arena__body">
        {currentPlayer?.base?.HP <=0 ? <Modal_arena setCurrentPlayer={setCurrentPlayer} setCurrentPlayerImg={setCurrentPlayerImg} setInitialPlayerHp={setInitialPlayerHp} defeatedPokemons={defeatedPokemons} name={name} /> : ""}
        <div className="arena__body_arena">
          <div className="arena__body_arena_header">
            <div className="arena__body_arena_header_card">{name},{currentPlayer?.name.english}</div>
            <div className="arena__body_arena_header_card">{enemyTrainer}, {currentEnemy?.name.english}</div>
          </div>
          <div className="arena__body_arena_body">
            <div className="arena__body_arena_body_fighters">
              <div className="arena__body_arena_body_player"><img /* className={`${animatePlayer ? 'animatePlayer' : 'animatePlayerBack'} ${vibratePlayer ? 'playerVibrate' : ''}`} */ src={currentPlayerImg} alt="player_pokemon"/></div>
              <div className="arena__body_arena_body_enemy"><img /* className={`${animateEnemy ? 'animateEnemy' : 'animateEnemyBack'} ${vibrateEnemy ? 'enemyVibrate' : ''}`} */ src={enemyImg} alt="enemy_pokemon"/></div>
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
                <div className="arena__body_arena_body_buttons">
                <button onClick={basicAttack}>Basic Attack!</button>
                <button onClick={spAttack}>SP Attack!</button>
                <button onClick={dodge}>Dodge attack!</button>
                <button onClick={consoleLog}>Console log</button>
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
          </div>
          <div id="text-box-bottom">
          </div>
        </div>
      </div>
    </div>
  );
}