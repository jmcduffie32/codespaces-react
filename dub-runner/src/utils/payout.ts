import { BuyInConfig } from "../interfaces/BuyInConfig";
import { Player } from "../interfaces/Player";

export function ctpTotal(
  players: Player[],
  buyInConfig: BuyInConfig = {}
): number {
  const ctpBuyIn = buyInConfig.ctpBuyIn || 5;
  return players.filter((p) => p.ctp).length * ctpBuyIn;
}

export function aceTotal(
  players: Player[],
  buyInConfig: BuyInConfig = {}
): number {
  const aceBuyIn = buyInConfig.aceBuyIn || 2;
  return players.filter((p) => p.ace).length * aceBuyIn;
}

export function bountyTotal(
  players: Player[],
  buyInConfig: BuyInConfig = {}
): number {
  const bountyBuyIn = buyInConfig.bountyBuyIn || 3;
  return players.filter((p) => p.bounty).length * bountyBuyIn;
}

export function otherTotal(
  players: Player[],
  buyInConfig: BuyInConfig = {}
): number {
  const otherBuyIn = buyInConfig.otherBuyIn || 0;
  return players.length * otherBuyIn;
}

export function actionTotal(
  players: Player[],
  buyInConfig: BuyInConfig = {}
): number {
  const actionBuyIn = buyInConfig.actionBuyIn || 5;
  return players.length * actionBuyIn;
}

export function cashTotal(
  players: Player[],
  buyInConfig: BuyInConfig = {}
): number {
  return (
    ctpTotal(players, buyInConfig) +
    aceTotal(players, buyInConfig) +
    bountyTotal(players, buyInConfig) +
    actionTotal(players, buyInConfig) +
    otherTotal(players, buyInConfig)
  );
}
