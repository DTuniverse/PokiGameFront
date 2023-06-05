import React, { useState, useEffect, useRef } from 'react';
import './Modal_win.css';
import ProgressBar from "@ramonak/react-progress-bar";
import { NavLink } from "react-router-dom"


export default function Modal_win({ currentPlayer, currentPlayerImg }) {
  const maxHP = 255
  const maxAtt = 181
  const maxDef = 230
  const maxSPAtt = 173
  const maxSPDef = 230
  const maxSp = 160
  const [open, setOpen] = useState(true);

return (
    <div>
      {open && (
        <div className="custom-modal_win">
          <div className="custom-modal_win-content">
            <div className="custom-modal_win-content-header">
              <div className="custom-modal_win-content-header_title">
                Congratulations! You won the game!
              </div>
              <div className="custom-modal_win-content-header_body">
              </div>
            </div>
            <div className="custom-modal_win-content-body">
              <div className="custom-modal_win-content-img_container">
                <img src={currentPlayerImg}/>
              </div>
              <div className="custom-modal_win-content-stats_container">
                <div className="custom-modal_win-content-stats">
                <ProgressBar
                      completed={currentPlayer?.base.HP}
                      maxCompleted={maxHP}
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
                  <div className="custom-modal_win-content-stat_values">
                    <div>{currentPlayer?.base.HP}/{maxHP}</div>
                    <div>{currentPlayer?.base.Attack}/{maxAtt}</div>
                    <div>{currentPlayer?.base.Defense}/{maxDef}</div>
                    <div>{currentPlayer?.base["Sp. Attack"]}/{maxSPAtt}</div>
                    <div>{currentPlayer?.base["Sp. Defense"]}/{maxSPDef}</div>
                    <div>{currentPlayer?.base.Speed}/{maxSp}</div>
                  </div>
                </div>
                
            </div>
              <div className='custom-modal_win-content-footer'>
                <NavLink to="/" activeClassName="current" >Start a new game</NavLink>
                <NavLink to="/pokemon/leaderboard" activeClassName="current">Submit your scores and see leaderboard</NavLink>
                {/* <button className="custom-modal_win-close">
                Close
                </button> */}
              </div>
          </div>
        </div>
      )}
    </div>
  );
};