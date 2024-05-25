import { BuyInConfig, totalBuyIn } from '../interfaces/BuyInConfig';

function BuyInSummary({buyInConfig}: {buyInConfig: BuyInConfig}) {
    


    return (
      <div>
        <h2 className="pb-4 border-b-2 border-b-grey text-xl font-bold mb-4">
          Buy-In Summary
        </h2>
        <ul>
          <li>Action: ${buyInConfig.actionBuyIn}</li>
          <li>CTP: ${buyInConfig.ctpBuyIn}</li>
          <li>Bounty: ${buyInConfig.bountyBuyIn}</li>
          <li>Ace: ${buyInConfig.aceBuyIn}</li>
          <li>Other: ${buyInConfig.otherBuyIn}</li>
          <li>Total Buy-In: ${totalBuyIn(buyInConfig)}</li>
        </ul>
      </div>
    );
}
export default BuyInSummary;
