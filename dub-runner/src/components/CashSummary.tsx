import { BuyInConfig } from "../interfaces/BuyInConfig";
import { Player } from "../interfaces/Player";
import {
  ctpTotal,
  aceTotal,
  bountyTotal,
  otherTotal,
  cashTotal,
} from "../utils/payout";

function CashSummary({
  buyInConfig,
  players,
  ctpCount=5
}: {
  buyInConfig: BuyInConfig;
  players: Player[];
  ctpCount: number;
}) {
  return (
    <>
      <h2 className="pb-4 my-4 border-b-2 border-b-gray text-xl font-bold">
        Money Collected
      </h2>
      <ul className="text-left">
        <li>Total CTP: ${ctpTotal(players, buyInConfig)}</li>
        <li>Total Ace: ${aceTotal(players, buyInConfig)}</li>
        <li>Total Bounty: ${bountyTotal(players, buyInConfig)}</li>
        <li>Total Other: ${otherTotal(players, buyInConfig)}</li>
        <li>Total Cash: ${cashTotal(players, buyInConfig)}</li>
      </ul>

      <h2 className="pb-4 my-4 border-b-2 border-b-gray text-xl font-bold">
        Payouts
      </h2>
      <ul className="text-left pb-8">
        <li>CTP: ${ctpTotal(players, buyInConfig) / ctpCount}</li>
        <li>Bounty: ${bountyTotal(players, buyInConfig)}</li>
        {/* {payouts(teams.length, players.length * 5).map((p, i) => (
              <li key={i}>Place: {i + 1} Payout: ${p}</li>
            ))} */}
      </ul>
    </>
  );
}

export default CashSummary;
