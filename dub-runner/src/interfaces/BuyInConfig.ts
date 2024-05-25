export interface BuyInConfig {
  aceBuyIn?: number;
  ctpBuyIn?: number;
  bountyBuyIn?: number;
  actionBuyIn?: number;
  otherBuyIn?: number;
}

export function totalBuyIn(buyInConfig: BuyInConfig) {

 return (
   (buyInConfig.aceBuyIn || 0) +
   (buyInConfig.ctpBuyIn || 0) +
   (buyInConfig.bountyBuyIn || 0) +
   (buyInConfig.actionBuyIn || 0) +
   (buyInConfig.otherBuyIn || 0)
 );
}
