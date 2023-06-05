import React from 'react';
import { useState, useEffect } from "react"

const Leaderboard = ({ players }) => {
  const [highScore, setHighScore ] = useState()
  // Sort the players based on their scores
  const sortedPlayers = highScore?.sort((a, b) => b.score - a.score);

  const fetchScores = async () => {
    try {
      const res = await fetch("https://pokigameback.onrender.com/pokemon/leaderboard");
      const data = await res.json();
      console.log("this is data from the server", data)
      setHighScore(data.data);
    } catch (error) {
      console.log("data not working");
    }
  };

  useEffect(() => {
    fetchScores()
  },[])

  console.log("this is highscore", highScore)

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers?.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;