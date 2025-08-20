import { characterData } from "./characterData.js";

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('characterContainer');
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const template = document.getElementById('characterCardTemplate');
  const gamesBtn = document.getElementById('gamesBtn');
  const jobFilter = document.getElementById('jobFilter');
  const crewFilter = document.getElementById('crewFilter');

  // Pasamos los datos de objeto a array
  const charactersArray = Object.values(characterData);

  searchBtn.addEventListener('click', () => {
    const name = searchInput.value.trim();
    const job = jobFilter.value;
    const crew = crewFilter.value;

    fetchCharacterByFilter({ name, job, crew });
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const name = searchInput.value.trim();
      if (name) fetchCharacterByName(name);
    }
  });

  gamesBtn.addEventListener('click', () => {
    window.location.href = 'pages/gamesMenu.html';
  });

  function fetchCharacterByName(name) {
    let filtered = charactersArray.filter(c =>
      c.name.toLowerCase().includes(name.toLowerCase())
    );

    renderCharacters(filtered);
  }

  function fetchCharacterByFilter({ name = '', job = '', crew = '' }) {
  let filtered = charactersArray;

  if (name) {
    filtered = filtered.filter(c =>
      String(c.name).toLowerCase().includes(name.toLowerCase())
    );
  }

  if (job) {
    filtered = filtered.filter(c =>
      String(c.rol || '').toLowerCase().includes(job.toLowerCase())
    );
  }

  if (crew) {
    filtered = filtered.filter(c =>
      String(c.crew || '').toLowerCase().includes(crew.toLowerCase())
    );
  }

  renderCharacters(filtered);
}


  function renderCharacters(characters) {
    container.innerHTML = '';

    if (characters.length === 0) {
      container.innerHTML = '<p>No se encontraron personajes.</p>';
      return;
    }

    characters.forEach(character => {
      const card = template.content.cloneNode(true);

      card.querySelector('.character-img').src = character.hdImage || './assets/img/defecto.png';
      card.querySelector('.character-img').alt = character.name;

      card.querySelector('.character-name').textContent = character.name || 'Desconocido';
      card.querySelector('.character-bounty').innerHTML = 
        `<img src="./assets/img/berry.png" alt="Berry" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 4px;">${character.bounty2 || 'N/A'}`;
      card.querySelector('.character-job').textContent = `Rol: ${character.rol || 'Desconocido'}`;
      card.querySelector('.character-fruit').textContent = `Fruta del Diablo: ${character.devilfruit || 'Ninguna'}`;
      card.querySelector('.character-crew').textContent = `Afiliación: ${character.crew || 'Desconocida'}`;
      card.querySelector('.character-state').textContent = `Estado: ${character.state || 'Desconocido'}`;
      card.querySelector('.character-age').textContent = `Edad: ${character.age || 'Desconocida'} Años`;
      card.querySelector('.character-size').textContent = `Altura: ${character.height || 'Desconocida'} cm`;
      card.querySelector('.character-gender').textContent = `Género: ${character.gender || 'Desconocido'}`;
      card.querySelector('.character-haki').textContent = `Haki: ${character.haki || 'Desconocido'}`;
      card.querySelector('.character-origin').textContent = `Origen: ${character.origin || 'Desconocido'}`;
      card.querySelector('.character-firstappearance').textContent = `Primera aparición: ${character.firstappearance || 'Desconocida'}`;

      container.appendChild(card);
    });
  }

  // Mostrar todos los personajes al inicio
  renderCharacters(charactersArray);
});
