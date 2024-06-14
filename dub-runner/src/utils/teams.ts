
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
  const teamCount = teams.length;
  const holes = [1, 10, 3, 8, 12, 16, 5, 18, 14, 7, 11, 15, 6, 17, 13, 9, 2, 4]

  const groups = []
  const assignments: {[key: string]: any[]} = {};
  if (oddDogs.length === 2) {
    const foursome_count = Math.floor(teamCount / 2) - 1;
    for (let i = 0; i < foursome_count; i++) {
      const foursome = [teams.shift(), teams.shift()];
      groups.push(foursome);
    }
    groups.push([teams.shift(), oddDogs[0]]);
    groups.push([teams.shift(), oddDogs[1]]);
    groups.forEach((group, i) => {
      assignments[`${holes[i]}`] = group;
    })
    
  } else if (oddDogs.length === 1) {
    const foursome_count = Math.ceil(teamCount / 2) - 1;
    for (let i = 0; i < foursome_count; i++) {
      const foursome = [teams.shift(), teams.shift()];
      groups.push(foursome);
    }
    console.log(teams, oddDogs)
    groups.push([teams.shift(), teams.shift(), oddDogs[0]].filter(Boolean));
    groups.forEach((group, i) => {
      assignments[`${holes[i]}`] = group;
    })
  }
  return assignments;
}
