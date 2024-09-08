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

export function recommenedPayout(
  players: Player[],
  buyInConfig: BuyInConfig = {}
): number[] {
  const payoutConfig: { [key: string]: number[] } = {
    '4': [4],
    '5': [5],
    '6': [6],
    '7': [7],
    '8': [8],
    '9': [9],
    '10': [8, 2],
    '11': [8, 3],
    '12': [8, 4],
    '13': [9, 4],
    '14': [9, 5],
    '15': [9, 6],
    '16': [9, 5, 2],
    '17': [9, 6, 2],
    '18': [9, 6, 3],
    '19': [10, 6, 3],
    '20': [10, 5, 3, 2],
    '21': [10, 6, 3, 2],
    '22': [10, 6, 4, 2],
    '23': [11, 6, 4, 2],
    '24': [11, 7, 4, 2],
    '25': [11, 7, 4, 3],
    '26': [11, 7, 5, 3],
    '27': [11, 7, 4, 3, 2],
    '28': [11, 7, 5, 3, 2],
  }
  return payoutConfig['' + players.length].map(v => v * (buyInConfig?.actionBuyIn || 5)) || [];
}
