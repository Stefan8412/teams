import React, { useState } from "react";

export default function TeamSelector() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [splitPlayers, setSplitPlayers] = useState([]);
  const [teams, setTeams] = useState({ teamA: [], teamB: [] });

  // Add a player to the list
  const addPlayer = () => {
    if (name.trim() && !players.includes(name)) {
      setPlayers([...players, name]);
      setName("");
    }
  };

  // Toggle selection of a player for splitting
  const toggleSplitPlayer = (player) => {
    if (splitPlayers.includes(player)) {
      setSplitPlayers(splitPlayers.filter((p) => p !== player));
    } else if (splitPlayers.length < 2) {
      // Only allow 2 players to be selected
      setSplitPlayers([...splitPlayers, player]);
    }
  };

  // Generate teams with selected players and the rest randomly assigned
  const generateTeams = () => {
    // Ensure 2 players are selected for splitting
    if (splitPlayers.length !== 2) {
      alert("Označ 2 hráčov, ktorí budú rozdelení.");
      return;
    }

    // Remaining players are those not selected for splitting
    let remainingPlayers = players.filter((p) => !splitPlayers.includes(p));

    // Shuffle remaining players
    let shuffled = remainingPlayers.sort(() => Math.random() - 0.5);

    // Now assign the split players to Team A and Team B
    // Player 1 to Team A, Player 2 to Team B
    setTeams({
      teamA: [
        splitPlayers[0],
        ...shuffled.slice(0, Math.ceil(shuffled.length / 2)),
      ],
      teamB: [
        splitPlayers[1],
        ...shuffled.slice(Math.ceil(shuffled.length / 2)),
      ],
    });
  };

  // Reset the teams and players
  const resetTeams = () => {
    setPlayers([]);
    setSplitPlayers([]);
    setTeams({ teamA: [], teamB: [] });
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Meno hráča"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addPlayer}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Pridaj hráča
        </button>
      </div>
      <p className="text-sm text-gray-500">
        Označ 2 hráčov, ktorí budú rozdelení
      </p>
      <div className="grid grid-cols-2 gap-2">
        {players.map((player) => (
          <button
            key={player}
            className={`p-2 rounded text-white ${
              splitPlayers.includes(player) ? "bg-red-500" : "bg-gray-500"
            }`}
            onClick={() => toggleSplitPlayer(player)}
            disabled={
              splitPlayers.length >= 2 && !splitPlayers.includes(player)
            }
          >
            {player} {splitPlayers.includes(player) ? "(rozdeľ)" : ""}
          </button>
        ))}
      </div>
      <button
        onClick={generateTeams}
        className="w-full bg-green-500 text-white p-2 rounded"
        disabled={splitPlayers.length !== 2}
      >
        Vytvor mužstvá
      </button>
      <button
        onClick={resetTeams}
        className="w-full bg-red-500 text-white p-2 rounded mt-2"
      >
        Zruš
      </button>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="border p-4 rounded bg-gray-100">
          <h2 className="text-xl font-bold">Tím A</h2>
          <p>Paľo</p>
          {teams.teamA.map((player) => (
            <p key={player}>{player}</p>
          ))}
        </div>
        <div className="border p-4 rounded bg-gray-100">
          <h2 className="text-xl font-bold">Tím B</h2>
          <p>Jan</p>
          {teams.teamB.map((player) => (
            <p key={player}>{player}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
