import { useEffect, useState } from "react";
import _ from "lodash";
import { Player } from '../interfaces/Player';
import { ODD_DOG } from '../constants';
import { supabase } from '../supabase';


function ctpTotal(players: Player[]): number {
  return players.filter(p => p.ctp).length * 5;
}

function aceTotal(players: Player[]): number {
  return players.filter(p => p.ace).length * 2;
}

function bountyTotal(players: Player[]): number {
  return players.filter(p => p.bounty).length * 3;
}

function actionTotal(players: Player[]): number {
  return players.length * 5;
}

function cashTotal(players: Player[]): number {
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

const Match = () => {
  const [ matchId, _setMatchId ] = useState<number>(1)
  const [ players, setPlayers ] = useState<Player[]>(() => {
    const saved = localStorage.getItem('players');
    return saved ? JSON.parse(saved) : [];
  });
  const [ teams, setTeams ] = useState<Player[][]>(() => {
    const saved = localStorage.getItem('teams');
    return saved ? JSON.parse(saved) : [];
  });

  async function getRound() {
    const data = (await supabase.from("round").select().eq('id', matchId)).data;
    if (data && data[ 0 ]) {
      const roundData = JSON.parse(data[ 0 ].data)
      setPlayers(roundData.players)
      setTeams(roundData.teams)
    }
    console.log(data)
  }

  const handleInserts = (payload: any) => {
    console.log('Change received!', payload)
    const id = payload.new.id
    const data = payload.new.data
    if (id === matchId) {
      setPlayers(data.players)
      setTeams(data.teams)
    }
  }

  useEffect(() => {
    // Listen to round updates 
    supabase
      .channel('round_updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'round' }, handleInserts)
      .subscribe()
  }, [matchId])

  useEffect(() => {
    if (matchId) {
      getRound()
    }
  }, [ matchId ])

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [ players ])

  useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teams));
  }, [ teams ])

  return (
    <div className="flex flex-col h-screen pb-4">
      <h1 className="bg-blue-500 text-white -mt-8 mb-4 -mx-8 py-2">DUBS</h1>

      <div className="md:flex md:flex-row">

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
                        type='checkbox'
                        checked={p.ctp}
                        readOnly />
                    </td>
                    <td className="">
                      <input
                        type='checkbox'
                        checked={p.ace}
                        readOnly />
                    </td>
                    <td className="">
                      <input
                        type='checkbox'
                        checked={p.bounty}
                        readOnly />
                    </td>
                    <td className="">
                      <input
                        type='checkbox'
                        checked={p.oddDog}
                        readOnly />
                    </td>
                    <td>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>


      <h2 className="pb-4 mt-4  border-b-2 border-b-gray text-xl font-bold">Teams</h2>

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
        {payouts(teams.length, players.length * 5).map((p, i) => (
          <li key={i}>Place: {i + 1} Payout: ${p}</li>
        ))}
      </ul>
    </div>
  )
}

export default Match;
