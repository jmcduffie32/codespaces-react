import { useEffect, useState } from "react";
import _ from "lodash";
import { Player } from "../interfaces/Player";
import { ODD_DOG } from "../constants";
import { supabase } from "../supabase";
import RoundList from "./RoundList";
import { BuyInConfig } from "../interfaces/BuyInConfig";
import CashSummary from "./CashSummary";

// function payouts(numTeams: number, total: number): number[] {
//   const payoutSpots = Math.floor(numTeams * 0.4)
//   // const fib = [1, 2, 3, 5, 8, 13, 21];
//   // _.range(1, payoutSpots + 1).map((s) => 10*fib[s]);

//   switch (payoutSpots) {
//     case 1:
//       return [ total ];
//     case 2:
//       return [ 10, total - 10 ];
//     case 3:
//       return [ 10, 20, total - 30 ]
//     case 4:
//       return [ 10, 20, 30, total - 60 ]
//     case 5:
//       return [ 10, 20, 30, total - 60 ]
//   }
//   return [];
// }

const Match = () => {
  const [matchId, setMatchId] = useState<number>();
  const [matchCode, setCode] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Player[][]>([]);
  const [buyInConfig, setBuyInConfig] = useState<BuyInConfig>({});
  const [ctps, setCtps] = useState<string>("");

  async function getRound(code: string = "") {
    if (code.trim() == "") return;
    const data = (await supabase.from("round").select().eq("code", code)).data;
    if (data && data[0]) {
      setMatchId(data[0].id);
      const roundData = JSON.parse(data[0].data);
      setPlayers(roundData.players);
      setTeams(roundData.teams);
      setBuyInConfig(roundData.buyInConfig || {});
      setCtps(roundData.ctps || '');
    }
    console.log(data);
  }

  const handleInserts = (payload: any) => {
    console.log("Change received!", payload);
    const id = payload.new.id;
    const data = payload.new.data;
    if (id === matchId) {
      setPlayers(data.players);
      setTeams(data.teams);
      setBuyInConfig(data.buyInConfig || {});
      setCtps(data.ctps || '');
    }
  };

  useEffect(() => {
    // Listen to round updates
    supabase
      .channel("round_updates")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "round" },
        handleInserts
      )
      .subscribe();
  }, [matchId]);

  return !matchId ? (
    <div className="flex flex-col h-screen pb-4">
      <h1 className="bg-blue-500 text-white -mt-8 mb-4 -mx-8 py-2">DUBS</h1>
      <div className="flex flex-col items-center">
        <label className="text-lg font-bold">Enter Match Code</label>
        <input
          className="border border-gray-400 rounded p-2"
          placeholder="Match Code"
          type="text"
          value={matchCode}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded p-2 mt-2"
          onClick={() => getRound(matchCode)}
        >
          Submit
        </button>
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-2 mt-2">Or select from the list below</p>
        <RoundList
          onRoundSelected={(selectedId: string) => {
            setCode(selectedId);
            getRound(selectedId);
          }}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col h-screen pb-4">
      <h1 className="bg-blue-500 text-white -mt-8 mb-4 -mx-8 py-2">DUBS</h1>

      <div className="md:flex md:flex-row">
        <div className="md:w-2/3">
          <h2 className="pb-4 my-4 border-b-2 border-b-grey text-xl font-bold">
            Registration List
          </h2>
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
              {[...players].map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td className="">
                    <input type="checkbox" checked={p.ctp} readOnly />
                  </td>
                  <td className="">
                    <input type="checkbox" checked={p.ace} readOnly />
                  </td>
                  <td className="">
                    <input type="checkbox" checked={p.bounty} readOnly />
                  </td>
                  <td className="">
                    <input type="checkbox" checked={p.oddDog} readOnly />
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {ctps && ctps.length > 0 && (
        <>
          <h2 className="pb-4 mt-4  border-b-2 border-b-gray text-xl font-bold">
            CTPs
          </h2>
          <p>{ctps}</p>
        </>
      )}

      <h2 className="pb-4 mt-4  border-b-2 border-b-gray text-xl font-bold">
        Teams
      </h2>

      {teams.length > 0 && (
        <>
          <div className="flex flex-wrap justify-center">
            {[...teams]
              .sort((a, b) => a[0].team - b[0].team)
              .map((players) => (
                <div
                  className="w-2/5 shadow rounded m-2 p-2"
                  key={players[0].team}
                >
                  <div className="font-bold">
                    {players[0].team === ODD_DOG ? "Odd Dog" : players[0].team}
                  </div>
                  <div>{players[0].name}</div>
                  <div>{players[1]?.name || ""}</div>
                </div>
              ))}
          </div>
        </>
      )}

      <CashSummary buyInConfig={buyInConfig} players={players} />
    </div>
  );
};

export default Match;
