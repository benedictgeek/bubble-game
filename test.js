// const numPlayers = (k, scores) => {
//   const sortedScores = scores.sort((a, b) => b - a);

//   const rank = [];

//   for (let index = 0; index < sortedScores.length; index++) {
//     const previousScore = sortedScores[index - 1];
//     const currentScore = sortedScores[index];
//     if (previousScore && previousScore == currentScore) {
//       rank.push(rank[rank.length - 1]);
//     } else {
//       rank.push(rank.length + 1);
//     }
//   }

//   console.log(rank.filter((item) => item <= k).length);
// };

// numPlayers(4, [5, 10, 10, 20, 20, 20, 60, 80, 100]);

const carParkingRoof = (cars, k) => {
  const sortedCarsAscending = cars.sort((a, b) => a - b);

  const distances = [];

  for (let index = 0; index < sortedCarsAscending.length - k; index++) {
    distances.push(sortedCarsAscending[index + k - 1] - sortedCarsAscending[index] + 1);
  }

  console.log(distances.sort((a, b) => a - b)[0]);
};

carParkingRoof([6, 2, 12, 7], 3);
