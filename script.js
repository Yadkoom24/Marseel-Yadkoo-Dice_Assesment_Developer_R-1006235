// <!-- Note this template is take form https://www.w3schools.com and I modify it for my purposes for this assesment -->

function rolldice_list(numdice_list) {
  const dice_list = [];
  for (let i = 0; i < numdice_list; i++) {
    dice_list.push(Math.floor(Math.random() * 6) + 1);
  }
  return dice_list;
}

function processRoll(dice_list) {
  dice_list.sort((a, b) => a - b);
  if (dice_list.includes(3)) {
    while (dice_list.includes(3)) {
      dice_list.splice(dice_list.indexOf(3), 1);
    }
    return 0;
  }
  const lowestdice_list = dice_list.shift();
  return lowestdice_list;
}

function simulateGame(numdice_list) {
  let dice_list = rolldice_list(numdice_list);
  let totalScore = 0;

  while (dice_list.length > 0) {
    const rollScore = processRoll(dice_list);
    totalScore += rollScore;

    if (dice_list.length > 0) {
      dice_list = rolldice_list(dice_list.length);
    }
  }

  return totalScore;
}

function runSimulation() {
  const numSimulations = parseInt(
    document.getElementById("num-simulations").value,
    10
  );
  const numdice_list = parseInt(
    document.getElementById("num-dice_list").value,
    10
  );
  const results = Array(13).fill(0);
  const startTime = performance.now();

  for (let i = 0; i < numSimulations; i++) {
    const totalScore = simulateGame(numdice_list);
    if (totalScore < results.length) {
      results[totalScore]++;
    }
  }

  const endTime = performance.now();
  const elapsedTime = (endTime - startTime) / 1000;

  const resultDiv = document.getElementById("results");

  resultDiv.innerHTML = `<h2>Results for ${numSimulations} simulations using ${numdice_list} dice_list:</h2>`;

  results.forEach((count, score) => {
    const proportion = count / numSimulations;
    resultDiv.innerHTML += `Total ${score} occurs ${proportion.toFixed(
      2
    )} times, occurred ${count} times.<br>`;
  });

  const timeDiv = document.getElementById("time");
  timeDiv.textContent = `Total simulations took ${elapsedTime.toFixed(
    1
  )} seconds.`;
}
