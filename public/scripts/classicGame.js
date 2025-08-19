async function startGame() {
  const res = await fetch("https://api.api-onepiece.com/v2/characters/en");
  const data = await res.json();

  // personaje random
  const randomChar = data[Math.floor(Math.random() * data.length)];

  document.getElementById("game").innerHTML = `
    <p>Nombre: ${randomChar.name}</p>
    <p>Recompensa: ${randomChar.bounty || "❌"}</p>
    <p>Tripulación: ${randomChar.crew || "❌"}</p>
  `;
}
