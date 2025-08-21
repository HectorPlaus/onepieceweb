// Importamos los datos del archivo
import { characterData } from "./characterData.js";
import { arcOrder } from "./characterData.js";

let characters = Object.values(characterData);
let targetCharacter = characters[Math.floor(Math.random() * characters.length)];
console.log("DEBUG: a adivinar =>", targetCharacter.name);

const input = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const result = document.getElementById("result");

document.addEventListener("DOMContentLoaded", () => {

  function autocomplete(inp, arr) {
    let currentFocus;

    inp.addEventListener("input", function () {
      closeAllLists();
      if (!this.value) return false;
      currentFocus = -1;

      const a = document.createElement("DIV");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);

      arr.forEach(c => {
        if (c.name.toLowerCase().includes(this.value.toLowerCase())) {
          const b = document.createElement("DIV");
          b.innerHTML = `
          <img src="${c.hdImage}" alt="${c.name}">
          <span>${c.name}</span>
          <input type="hidden" value="${c.name}">
        `;
          b.addEventListener("click", () => {
            inp.value = c.name;
            closeAllLists();
          });
          a.appendChild(b);
        }
      });
    });

    inp.addEventListener("keydown", function (e) {
      let x = document.querySelector(".autocomplete-items");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode === 40) { // ↓
        currentFocus++;
        addActive(x);
      } else if (e.keyCode === 38) { // ↑
        currentFocus--;
        addActive(x);
      } else if (e.keyCode === 13) { // enter
        e.preventDefault();
        if (currentFocus > -1 && x) x[currentFocus].click();
      }
    });

    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
      Array.from(x).forEach(el => el.classList.remove("autocomplete-active"));
    }

    function closeAllLists(elmnt) {
      document.querySelectorAll(".autocomplete-items").forEach(el => {
        if (elmnt != el && elmnt != inp) el.parentNode.removeChild(el);
      });
    }

    document.addEventListener("click", (e) => closeAllLists(e.target));
  }

  // Inicializar autocompletar con nombres e imágenes
  autocomplete(input, characters);


  guessBtn.addEventListener("click", () => {
  const guess = input.value.trim();
  const guessedCharacter = characters.find(
    (c) => c.name.toLowerCase() === guess.toLowerCase()
  );
  // Mostrar encabezados al primer intento
if (!document.querySelector(".headers-grid")) {
  const headers = `
    <div class="headers-grid">
      <div>Imagen</div>
      <div>Género</div>
      <div>Tripulación</div>
      <div>Fruta del Diablo</div>
      <div>Haki</div>
      <div>Recompensa</div>
      <div>Edad</div>
      <div>Altura</div>
      <div>Estado</div>
      <div>Origen</div>
      <div>Primera Aparición</div>
    </div>
  `;
  result.insertAdjacentHTML("afterbegin", headers);
}


  if (!guessedCharacter) {
    result.innerHTML += `<div class="card fail">❌ Personaje no encontrado en la base de datos.</div>`;
    return;
  }

  // Preparar pistas
  let hints = [];

  // Imagen
  hints.push(`<div style="display:flex; align-items:center; gap:8px;"> 
      <img src="${guessedCharacter.hdImage}" class="guessed-img"">
    </div>`);

  // Género
  hints.push(`<div class="card ${guessedCharacter.gender === targetCharacter.gender ? "success" : "fail"}">
        ${guessedCharacter.gender}
      </div>`);

  // Tripulación
  hints.push(`<div class="card ${guessedCharacter.crew === targetCharacter.crew ? "success" : "fail"}">
        ${guessedCharacter.crew || "Desconocida"}
      </div>`);

  // Fruta del Diablo
  hints.push(`<div class="card ${guessedCharacter.devilfruittype === targetCharacter.devilfruittype ? "success" : "fail"}">
        ${guessedCharacter.devilfruittype || "Ninguna"}
      </div>`);

  // Haki
  hints.push(`<div class="card ${guessedCharacter.haki === targetCharacter.haki ? "success" : "fail"}">
        ${guessedCharacter.haki || "Ninguno"}
      </div>`);

  // Recompensa
  let bountyGuess = parseInt(guessedCharacter.bounty2.replace(/\D/g, ""));
let bountyTarget = parseInt(targetCharacter.bounty2.replace(/\D/g, ""));

let bountyClass = guessedCharacter.name === targetCharacter.name 
  ? "success" 
  : (bountyGuess === bountyTarget ? "success" : "fail");
let bountyHint = "";
if (bountyGuess > bountyTarget) {
  bountyHint = "down"; // la recompensa del objetivo es menor
} else if (bountyGuess < bountyTarget) {
  bountyHint = "up"; // la recompensa del objetivo es mayor
}
hints.push(`
  <div class="card ${bountyClass} ${bountyHint}">
    ${guessedCharacter.bounty2 || "Desconocida"}
  </div>
`);

  // Edad
  let ageHintClass = "";
if (guessedCharacter.age > targetCharacter.age) {
  ageHintClass = "down"; // el target es menor
} else if (guessedCharacter.age < targetCharacter.age) {
  ageHintClass = "up"; // el target es mayor
}

hints.push(`
  <div class="card ${guessedCharacter.age === targetCharacter.age ? "success" : "fail"} ${ageHintClass}">
    ${guessedCharacter.age}
  </div>
`);


  // Altura
  let heightHint = "";
  if (guessedCharacter.height > targetCharacter.height) {
    heightHint = "down";
  } else if (guessedCharacter.height < targetCharacter.height) {
    heightHint = "up";
  }
  hints.push(`<div class="card ${guessedCharacter.height === targetCharacter.height ? "success" : "fail"} ${heightHint}">
        ${guessedCharacter.height} cm
      </div>`);
   
  // Estado
  hints.push(`<div class="card ${guessedCharacter.state === targetCharacter.state ? "success" : "fail"}">
        ${guessedCharacter.state || "Desconocido"}
      </div>`);

  // Origen
  hints.push(`<div class="card ${guessedCharacter.origin === targetCharacter.origin ? "success" : "fail"}">
        ${guessedCharacter.origin || "Desconocido"}
      </div>`);

  // Obtener el número del arco
const guessArc = arcOrder[guessedCharacter.firstappearance];
const targetArc = arcOrder[targetCharacter.firstappearance];

let firstAppearanceHint = ""  ;

if(!guessArc || !targetArc) {
  firstAppearanceHint = "ℹ️ Orden desconocido";
} else if (guessArc === targetArc) {
  firstAppearanceHint = "✅ Igual";
}
else if (guessArc < targetArc) {
  firstAppearanceHint = "up";
}
else {
  firstAppearanceHint = "down";
}
hints.push(`
  <div class="card ${guessArc === targetArc ? "success" : "fail"} ${firstAppearanceHint}">
    ${guessedCharacter.firstappearance}
  </div>
`);


  

  // Acumular resultados
  result.innerHTML += `<div class="grid">${hints.join("")}</div>`;

  input.value = ""; // Limpiar el campo
});


});
