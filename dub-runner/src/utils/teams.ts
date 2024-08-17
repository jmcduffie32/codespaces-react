
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
