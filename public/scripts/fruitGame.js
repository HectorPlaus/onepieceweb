async function newFruit() {
  const res = await fetch("https://api.api-onepiece.com/v2/fruits/en");
  const data = await res.json();

  // fruta random
  const randomFruit = data[Math.floor(Math.random() * data.length)];

  document.getElementById("fruit-game").innerHTML = `
    <p>Nombre: ${randomFruit.name}</p>
    <p>Tipo: ${randomFruit.type}</p>
    <p>Poder: ${randomFruit.description}</p>
  `;
}
