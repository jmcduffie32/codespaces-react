import _ from 'lodash';
import { ODD_DOG } from '../constants';
import { Player } from '../interfaces/Player';

export function shuffle(array: any[]) {
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

export function assignToHoles(teams: any[], oddDogs: any[]) {
  oddDogs = oddDogs.length > 0 ? oddDogs[0] : [];
  const holes = [1, 10, 3, 8, 12, 16, 5, 18, 14, 7, 11, 15, 6, 17, 13, 9, 2, 4]

  const groups = []
  const assignments: {[key: string]: any[]} = {};
  if (oddDogs.length === 2) {
    groups.push([teams.shift(), [oddDogs[0]]]);
    groups.push([teams.shift(), [oddDogs[1]]]);
  } else if ((oddDogs.length + teams.length * 2) % 4 === 3) {
    groups.push([teams.shift(), [oddDogs[0]]]);
  } else if (oddDogs.length === 1) {
    groups.push([teams.shift(), teams.shift(), [oddDogs[0]]]);
  }
  while (teams.length > 0) {
    const foursome = [teams.shift(), teams.shift()];
    groups.push(foursome);
  }
  groups.forEach((group, i) => {
    assignments[`${holes[i]}`] = group;
  })
  return assignments;
}

export function assignTeams(players: Player[]) {
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
    const shuffled = _.shuffle(_.shuffle(numbers));

    const wantPartners = players.filter((p) => !p.oddDog);

    for (let i = 0; i < wantPartners.length; i++) {
      wantPartners[ i ].team = shuffled[ i ] || ODD_DOG;
    }

    const remaining = shuffled.slice(wantPartners.length);

    for (let i = oddDogCount; i > 0; i--) {
      remaining.push(ODD_DOG + i);
    }

    const oddDogIn = _.shuffle(remaining);

    const wantOddDog = players.filter((p) => p.oddDog);

    for (let i = 0; i < wantOddDog.length; i++) {
      wantOddDog[ i ].team = oddDogIn[ i ];
    }

    const sortedPlayers = wantPartners
      .concat(wantOddDog)
      .sort((a, b) => b.team - a.team);

    const teams = _.map(
      _.groupBy(sortedPlayers, (p) => p.team),
      (players, _team) => players
    );

    return teams;
  }
