import { useState } from "react";

interface player {
  id: string;
  name: string;
  ctp: boolean;
  ace: boolean;
  bounty: boolean;
  oddDog: boolean;
  team: number;
}

function shuffle(array: number[]) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [ array[ currentIndex ], array[ randomIndex ] ] = [
      array[ randomIndex ], array[ currentIndex ] ];
  }

  return array;
}

const ODD_DOG = -10 // -10 is an arbitrary val for oddDog

const Match = () => {
  const [ players, setPlayers ] = useState<player[]>([]);


  const [ name, setname ] = useState("");
  const [ ctp, setCtp ] = useState(false);
  const [ ace, setAce ] = useState(false);
  const [ bounty, setBounty ] = useState(false);
  const [ oddDog, setOddDog ] = useState(false);

  function addPlayer(name: string, ctp: boolean, ace: boolean, bounty: boolean, oddDog: boolean): void {
    setPlayers((players) => [ ...players, { id: crypto.randomUUID(), name, ctp, ace, bounty, oddDog, team: -1 } ])
  }

  function updatePlayer(id: string, patch: Partial<player>): void {
    setPlayers((players) => players.map(p => p.id === id ? { ...p, ...patch } : p))
  }

  function assignTeams(players: player[]): void {
    const playerCount = players.length;
    let oddDogCount: number;
    switch (playerCount % 4) {
      case 0:
        oddDogCount = 0;
        break;
      case 1:
      case 3:
        oddDogCount = 1;
        break;
      case 2:
        oddDogCount = 2;
        break;
    }

    const numbers = []; // playerCount - oddDogCount
    for (let i = 1; i <= (playerCount - oddDogCount) / 2; i++) {
      numbers.push(i);
      numbers.push(i);
    }
    const shuffled = shuffle(numbers);

    const wantPartners = players.filter((p) => !p.oddDog);

    for (let i = 0; i < wantPartners.length; i++) {
      wantPartners[ i ].team = shuffled[ i ] || ODD_DOG;
    }

    const remaining = shuffled.slice(wantPartners.length);

    for (let i = oddDogCount; i > 0; i--) {
      remaining.push(ODD_DOG);
    }

    const oddDogIn = shuffle(remaining);

    const wantOddDog = players.filter((p) => p.oddDog)

    for (let i = 0; i < wantOddDog.length; i++) {
      wantOddDog[ i ].team = oddDogIn[ i ];
    }

    const sortedPlayers = wantPartners.concat(wantOddDog).sort((a, b) => b.team - a.team)

    setPlayers(sortedPlayers);
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="mx-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mg-4">
          <div className="flex md:items-center">
            <div className="md:flex md:items-center mr-4">
              <div className="md:w-1/3">
                <label className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name">
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  type="text" />
              </div>
            </div>


            <div className="md:flex md:items-start mx-4">
              <label htmlFor="" className="block text-gray-500 font-bold">
                <input
                  checked={ctp}
                  onChange={(e) => setCtp(e.target.checked)} type="checkbox" className="mr-2 leading-tight" />
                <span className="text-gray-800">CTP?</span>
              </label>
            </div>

            <div className="md:flex md:items-start mx-4">
              <label htmlFor="" className="block text-gray-500 font-bold">
                <input
                  checked={ace}
                  onChange={(e) => setAce(e.target.checked)} type="checkbox" className="mr-2 leading-tight" />
                <span className="text-gray-800">ACE?</span>
              </label>
            </div>

            <div className="md:flex md:items-start mx-4">
              <label htmlFor="" className="block text-gray-500 font-bold">
                <input
                  checked={bounty}
                  onChange={(e) => setBounty(e.target.checked)} type="checkbox" className="mr-2 leading-tight" />
                <span className="text-gray-800">BOUNTY?</span>
              </label>
            </div>

            <div className="md:flex md:items-start mx-4">
              <label htmlFor="" className="block text-gray-500 font-bold">
                <input
                  checked={oddDog}
                  onChange={(e) => setOddDog(e.target.checked)} type="checkbox" className="mr-2 leading-tight" />
                <span className="text-gray-800">ODD DOG?</span>
              </label>
            </div>

            <div className="block ml-4">
              <button
                type="button"
                onClick={() => {
                  addPlayer(name, ctp, ace, bounty, oddDog)
                }}
                className="bg-blue-500 text-white py-1 px-4 rounded">ADD</button>
            </div>
          </div>


        </form>
      </div>


      <div className="block mt-4 mx-auto">
        <button
          type="button"
          onClick={() => {
            assignTeams(players);
          }}
          className="bg-blue-500 text-white py-1 px-4 rounded">ASSIGN TEAMS</button>
      </div>


      <div className="flex flex-col items-start">
        {[ ...players ].sort((a, b) => a.team - b.team)
          .map(p =>
            <div
              className="bg-white shadow-md rounded my-2 py-1 px-4 flex"
              key={p.id}>
              <div className="font-bold">Name: {p.name}</div>
              <div className="md:flex md:items-start mx-4">
                <label htmlFor="" className="block text-gray-500 font-bold">
                  <input
                    checked={p.ctp}
                    onChange={(e) => updatePlayer(p.id, { ctp: e.target.checked })} type="checkbox" className="mr-2 leading-tight" />
                  <span className="text-gray-800">CTP</span>
                </label>
              </div>
              <div className="md:flex md:items-start mx-4">
                <label htmlFor="" className="block text-gray-500 font-bold">
                  <input
                    checked={p.ace}
                    onChange={(e) => updatePlayer(p.id, { ace: e.target.checked })} type="checkbox" className="mr-2 leading-tight" />
                  <span className="text-gray-800">ACE</span>
                </label>
              </div>
              <div className="md:flex md:items-start mx-4">
                <label htmlFor="" className="block text-gray-500 font-bold">
                  <input
                    checked={p.bounty}
                    onChange={(e) => updatePlayer(p.id, { bounty: e.target.checked })} type="checkbox" className="mr-2 leading-tight" />
                  <span className="text-gray-800">BOUNTY</span>
                </label>
              </div>
              <div className="md:flex md:items-start mx-4">
                <label htmlFor="" className="block text-gray-500 font-bold">
                  <input
                    checked={p.oddDog}
                    onChange={(e) => updatePlayer(p.id, { oddDog: e.target.checked })} type="checkbox" className="mr-2 leading-tight" />
                  <span className="text-gray-800">oddDog</span>
                </label>
              </div>

              <div className='font-bold'>Team: {p.team === -10 ? "Odd Dog" : p.team}</div>
            </div>
          )}
      </div>


    </div>
  )
}

export default Match;
