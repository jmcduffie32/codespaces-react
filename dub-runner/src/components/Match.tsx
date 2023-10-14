import { useEffect, useState } from "react";
import _ from "lodash";
import { XCircleIcon } from '@heroicons/react/24/outline';

interface player {
  id: string;
  name: string;
  ctp: boolean;
  ace: boolean;
  bounty: boolean;
  oddDog: boolean;
  team: number;
}

function shuffle(array: any[]) {
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

function ctpTotal(players: player[]): number {
  return players.filter(p => p.ctp).length * 5;
}

function aceTotal(players: player[]): number {
  return players.filter(p => p.ace).length * 2;
}

function bountyTotal(players: player[]): number {
  return players.filter(p => p.bounty).length * 3;
}

function actionTotal(players: player[]): number {
  return players.length * 5;
}

function cashTotal(players: player[]): number {
  return ctpTotal(players) + aceTotal(players) + bountyTotal(players) + actionTotal(players);
}

function payouts(numTeams: number, total: number): number[] {
  const payoutSpots = Math.floor(numTeams * 0.4)
  // const fib = [1, 2, 3, 5, 8, 13, 21];
  // _.range(1, payoutSpots + 1).map((s) => 10*fib[s]);

  switch (payoutSpots) {
    case 1:
      return [ total ];
    case 2:
      return [ 10, total - 10 ];
    case 3:
      return [ 10, 20, total - 30 ]
    case 4:
      return [ 10, 20, 30, total - 60 ]
    case 5:
      return [ 10, 20, 30, total - 60 ]
  }
  return [];
}

const ODD_DOG = 1000;

const Match = () => {
  const [ players, setPlayers ] = useState<player[]>(() => {
    const saved = localStorage.getItem('players');
    return saved ? JSON.parse(saved) : [];
  });
  const [ teams, setTeams ] = useState<player[][]>(() => {
    const saved = localStorage.getItem('teams');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players])

  useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teams));
  }, [teams])


  const [ name, setname ] = useState("");
  const [ ctp, setCtp ] = useState(false);
  const [ ace, setAce ] = useState(false);
  const [ bounty, setBounty ] = useState(false);
  const [ oddDog, setOddDog ] = useState(false);

  function reset() {
    setname("");
    setCtp(false);
    setAce(false);
    setBounty(false);
    setOddDog(false);
  }

  function addPlayer(name: string, ctp: boolean, ace: boolean, bounty: boolean, oddDog: boolean): void {
    setPlayers((players) => [ ...players, { id: crypto.randomUUID(), name, ctp, ace, bounty, oddDog, team: -1 } ])
    reset();
  }

  function updatePlayer(id: string, patch: Partial<player>): void {
    setPlayers((players) => players.map(p => p.id === id ? { ...p, ...patch } : p))
  }

  function removePlayer(id: string): void {
    setPlayers((players) => players.filter(p => p.id != id))
  }

  function assignTeams(players: player[]): void {
    const playerCount = players.length;
    let oddDogCount: number = 0;
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

    const wantPartners = shuffle(players.filter((p) => !p.oddDog));

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

    const teams = _.map(_.groupBy(sortedPlayers, (p) => p.team), (players, _team) => players)

    setTeams(teams);
  }

  return (
    <div className="flex flex-col h-screen pb-4">
      <h1 className="bg-blue-500 text-white -mt-8 mb-4 -mx-8 py-2">DUBS</h1>

<div className="md:flex md:flex-row">
      <div className="md:w-1/3 mx-auto ml-0 mr-4">
        <form onSubmit={(e) => e.preventDefault()} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mg-4">
          <div className="">
            <div className="mb-4 md:mr-4">
              <div className="">
                <label className="block text-left text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name">
                  Name
                </label>
              </div>
              <div className="">
                <input id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  type="text" />
              </div>
            </div>


            <div className="mb-2">
              <label htmlFor="" className="block text-left text-gray-500 font-bold">
                <input
                  checked={ctp}
                  onChange={(e) => setCtp(e.target.checked)} type="checkbox" className="mr-2 leading-tight" />
                <span className="text-gray-800">CTP</span>
              </label>
            </div>

            <div className="mb-2">
              <label htmlFor="" className="block text-left text-gray-500 font-bold">
                <input
                  checked={ace}
                  onChange={(e) => setAce(e.target.checked)} type="checkbox" className="mr-2 leading-tight" />
                <span className="text-gray-800">Ace</span>
              </label>
            </div>

            <div className="mb-2">
              <label htmlFor="" className="block text-left text-gray-500 font-bold">
                <input
                  checked={bounty}
                  onChange={(e) => setBounty(e.target.checked)} type="checkbox" className="mr-2 leading-tight" />
                <span className="text-gray-800">Bounty</span>
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="" className="block text-left text-gray-500 font-bold">
                <input
                  checked={oddDog}
                  onChange={(e) => setOddDog(e.target.checked)} type="checkbox" className="mr-2 leading-tight" />
                <span className="text-gray-800">Chance to be Odd Dog?</span>
              </label>
            </div>

            <button
              type="button"
              onClick={() => {
                addPlayer(name, ctp, ace, bounty, oddDog)
              }}
              className="bg-blue-500 text-white w-full py-1 md:px-4 rounded">ADD</button>
          </div>


        </form>
      </div>

<div className="md:w-2/3">
      <h2 className="pb-4 my-4 border-b-2 border-b-grey text-xl font-bold">Registration List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>CTP</th>
            <th>ACE</th>
            <th>BOUNTY</th>
            <th>ODD</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {[ ...players ]
            .map(p =>
              <tr key={p.id}>
                <td>{p.name}</td>
                <td className="">
                  <input
                    checked={p.ctp}
                    onChange={(e) => updatePlayer(p.id, { ctp: e.target.checked })} type="checkbox" className="mr-2 leading-tight" />
                </td>
                <td className="">
                  <input
                    checked={p.ace}
                    onChange={(e) => updatePlayer(p.id, { ace: e.target.checked })} type="checkbox" className="mr-2 leading-tight" />
                </td>
                <td className="">
                  <input
                    checked={p.bounty}
                    onChange={(e) => updatePlayer(p.id, { bounty: e.target.checked })} type="checkbox" className="mr-2 leading-tight" />
                </td>
                <td className="">
                  <input
                    checked={p.oddDog}
                    onChange={(e) => updatePlayer(p.id, { oddDog: e.target.checked })} type="checkbox" className="mr-2 leading-tight" />
                </td>
                <td>
                  <XCircleIcon className="h-6 w-6 text-gray-500" onClick={() => removePlayer(p.id)} />
                </td>
              </tr>
            )}
        </tbody>
      </table>
</div>
      </div>


      <h2 className="pb-4 mt-4  border-b-2 border-b-gray text-xl font-bold">Teams</h2>
      <div className="block my-4 md:mx-auto">
        <button
          type="button"
          onClick={() => {
            assignTeams(players);
          }}
          className="bg-blue-500 text-white w-full py-1 px-4 rounded">ASSIGN TEAMS</button>
      </div>

      {teams.length > 0 &&
        <>
          <div className="flex flex-wrap justify-center">
            {[ ...teams ]
              .sort((a, b) => a[ 0 ].team - b[ 0 ].team)
              .map(players =>
                <div className="w-2/5 shadow rounded m-2 p-2" key={players[ 0 ].team}>
                  <div className='font-bold'>{players[ 0 ].team === ODD_DOG ? "Odd Dog" : players[ 0 ].team}</div>
                  <div>{players[ 0 ].name}</div>
                  <div>{players[ 1 ]?.name || ""}</div>
                </div>
              )}

          </div>
        </>
      }

      <h2 className="pb-4 my-4 border-b-2 border-b-gray text-xl font-bold">Money Collected</h2>
      <ul className="text-left">
        <li>Total CTP: ${ctpTotal(players)}</li>
        <li>Total Ace: ${aceTotal(players)}</li>
        <li>Total Bounty: ${bountyTotal(players)}</li>
        <li>Total Cash: ${cashTotal(players)}</li>
      </ul>

      <h2 className="pb-4 my-4 border-b-2 border-b-gray text-xl font-bold">Payouts</h2>
      <ul className="text-left pb-8">
        <li>CTP: ${ctpTotal(players) / 5}</li>
        <li>Bounty: ${bountyTotal(players)}</li>
        {payouts(teams.length, players.length*5).map((p, i) => (
          <li key={i}>Place: {i + 1} Payout: ${p}</li>
        ))}
      </ul>
    </div>
  )
}

export default Match;
