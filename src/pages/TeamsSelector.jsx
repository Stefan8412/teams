import React, { useState } from "react";

export default function TeamSelector() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [splitPlayers, setSplitPlayers] = useState([]);
  const [teams, setTeams] = useState({ teamA: [], teamB: [] });

  const addPlayer = () => {
    if (name.trim() && !players.includes(name)) {
      setPlayers([...players, name]);
      setName("");
    }
  };

  const toggleSplitPlayer = (player) => {
    if (splitPlayers.includes(player)) {
      setSplitPlayers(splitPlayers.filter((p) => p !== player));
    } else if (splitPlayers.length < 4) {
      setSplitPlayers([...splitPlayers, player]);
    }
  };

  const generateTeams = () => {
    if (splitPlayers.length !== 4) {
      alert("označ 4 hráčov, ktorí budu rozdelení.");
      return;
    }
    let remainingPlayers = players.filter((p) => !splitPlayers.includes(p));
    let shuffled = remainingPlayers.sort(() => Math.random() - 0.5);
    let mid = Math.ceil(shuffled.length / 2);

    setTeams({
      teamA: [splitPlayers[0], splitPlayers[1], ...shuffled.slice(0, mid)],
      teamB: [splitPlayers[2], splitPlayers[3], ...shuffled.slice(mid)],
    });
  };

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
          placeholder="meno hráča"
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
        označ 4 hráčov, ktorí budú rozdelení
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
              splitPlayers.length >= 4 && !splitPlayers.includes(player)
            }
          >
            {player} {splitPlayers.includes(player) ? "(rozdeľ)" : ""}
          </button>
        ))}
      </div>
      <button
        onClick={generateTeams}
        className="w-full bg-green-500 text-white p-2 rounded"
        disabled={splitPlayers.length !== 4}
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
          {teams.teamA.map((player) => (
            <p key={player}>{player}</p>
          ))}
        </div>
        <div className="border p-4 rounded bg-gray-100">
          <h2 className="text-xl font-bold">Tím B</h2>
          {teams.teamB.map((player) => (
            <p key={player}>{player}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
