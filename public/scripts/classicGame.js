import { getAllCharacters } from "./characters.js";

let characters = [];
let targetCharacter = null;

document.addEventListener("DOMContentLoaded", async () => {
  characters = await getAllCharacters();

  // Elegir uno aleatorio
  targetCharacter = characters[Math.floor(Math.random() * characters.length)];
  console.log("DEBUG: El personaje a adivinar es:", targetCharacter.name);

  const guessBtn = document.getElementById("guessBtn");
  const guessInput = document.getElementById("guessInput");
  const result = document.getElementById("result");

  guessBtn.addEventListener("click", () => {
    const guess = guessInput.value.trim().toLowerCase();
    const guessedCharacter = characters.find(c => c.name.toLowerCase() === guess);

    if (!guessedCharacter) {
      result.innerHTML = "❌ Personaje no encontrado en la base de datos.";
      return;
    }

    if (guessedCharacter.name === targetCharacter.name) {
      result.innerHTML = `🎉 ¡Correcto! Era ${targetCharacter.name}.`;
    } else {
      // pistas: comparar campos
      let hints = [];
      if (guessedCharacter.faction === targetCharacter.faction) {
        hints.push("✅ Misma facción");
      } else {
        hints.push("❌ Facción distinta");
      }
      if (guessedCharacter.occupation === targetCharacter.occupation) {
        hints.push("✅ Mismo rol/ocupación");
      } else {
        hints.push("❌ Rol diferente");
      }
      if (guessedCharacter.bounty === targetCharacter.bounty) {
        hints.push("✅ Misma recompensa");
      } else {
        hints.push("❌ Recompensa distinta");
      }
      result.innerHTML = "No es correcto.<br>" + hints.join("<br>");
    }
  });
});
