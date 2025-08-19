import { extraCharacterData } from "./extraCharacterData.js";


document.addEventListener('DOMContentLoaded', () => {

  const container = document.getElementById('characterContainer');
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const template = document.getElementById('characterCardTemplate');
  const gamesBtn = document.getElementById('gamesBtn');

  searchBtn.addEventListener('click', () => {
    console.log('Botón de búsqueda presionado'); // Verifica si esto aparece en la consola
    const name = searchInput.value.trim();
    if (name) fetchCharacterByName(name);
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const name = searchInput.value.trim();
      if (name) fetchCharacterByName(name);
    }
  });


    gamesBtn.addEventListener('click', () => {
        window.location.href = 'gamesMenu.html'; 
    });

  function enrichCharacter(character) {
    const extra = extraCharacterData[character.id] || {};
    return {
      ...character,
      hdImage: extra.hdImage || './assets/img/luffy.png', //Gravic StudioLab Img
      nickname: extra.nickname || 'Sin apodo',
      gender: extra.gender || 'Desconocido',
      haki: extra.haki || 'Desconocido',
      origin: extra.origin || 'Desconocido',
      firstappearance: extra.firstappearance || 'Desconocida',
      bounty2: extra.bounty2?.trim() || null,
      curiosities: extra.curiosities || []
    };
  }

  function fetchCharacterByName(name) {
    fetch(`https://api.api-onepiece.com/v2/characters/en`)
      .then(res => res.json())
      .then(characters => {
        console.log(characters);  // Verifica toda la estructura aquí
        const filtered = characters.filter(char =>
          char.name.toLowerCase().includes(name.toLowerCase())
        );

        if (filtered.length > 0) {
          const translated = filtered.map(translateFields);
          const enriched = translated.map(enrichCharacter).map(mapApiCharacterToTemplate);
          renderCharacters(enriched);
        } else {
          container.innerHTML = '<p>No se encontró ningún personaje.</p>';
        }
      })
      .catch(err => {
        console.error('Error al buscar personaje:', err);
        container.innerHTML = '<p>Error al buscar personaje.</p>';
      });
  }



  function translateFields(character) {
    // Traducción de estado
    const statusTranslations = {
      "vivant": "Vivo",
      "living": "Vivo",
      "deceased": "Muerto",
      // Agregar otros estados según sea necesario
    };

    const ageTranslations = {
      "ans": "Años",
    };

    // Traducción del rol (puedes agregar más traducciones)
    const jobTranslations = {
      "Captain": "Capitán",
      "First Mate": "Primer Oficial",
      "Navigator": "Navegante",
      "Cook": "Cocinero",
      "Chairman": "Presidente",
      "Helmsman": "Timonel",
      "Shipwright": "Carpintero",
      "Sniper": "Francotirador",
      "Archaeologist": "Arqueólogo",
      "Musician": "Músico",
      "Swordsman": "Espadachín",
      "Marine": "Marino",
      "Lieutenant": "Teniente",
      "Admiral": "Almirante",
      "Officer": "Oficial",
      "Sub-Admiral": "Subalmirante",
      "Right-hand man": "Mano derecha",
      "Carpenter": "Carpintero",
      "Fighter": "Luchador",
      "Vice-Captain": "Vice Capitán",
      "General Sucré": "General Dulce",
      "Vedette": "Vigilante",
      "Pirate": "Pirata",
      "Subordinate": "Subordinado",
      "Vice-Admiral": "Vice Almirante"     // Agregar más jobs
    };

    const nameTranslations = {
      "Baggy / Le Clown": "Buggy, El Payaso",
      "Marchall D. Teach / Barbe Noire": "Marshall D. Teach / Barbanegra",
      "Edward Newgate / Barbe Blanche": "Edward Newgate / Barbablanca",
      "Barbe Rose": "Barba Rosa",
      "Barbos Bruneriguez / Barbe Brune": "Barbos Bruneriguez / Barbazul",
      "Haguar D. Sauro": "Jaguar D. Saul",
      "Charlotte Dent-de-chien": "Charlotte Katakuri",
      "Chavipère": "Nekomamushi",
      "Caborage": "Inuarashi",
      "Shiliew": "Shiryu",
      "Kobby": "Koby",
      "Hermep": "Helmeppo",
      "César Clown": "Caesar Clown",
      "Charlotte Slurp": "Charlotte Perospero",
      "Edward Weeble": "Edward Weevil",

    }

    // Traducción de afiliación (si se necesita)
    const crewTranslations = {
      "The Chapeau de Paille crew": "Piratas de Sombrero de Paja",
      "The Red-Haired Pirates": "Los Piratas del Pelo Rojo",
      "Armarda du Chapeau de Paille": "Armada del Sombrero de Paja",
      // Agregar más afiliaciones
    };
    const fruitTranslations = {
      "Fruit of the Shadow": "Fruta de la Sombra",
    }; // Puedes agregar traducciones de frutas aquí

    let translatedAge = character.age;

    if (translatedAge && translatedAge.includes("ans")) {
      translatedAge = translatedAge.replace("ans", ageTranslations["ans"]);
    }

    const translatedJob = jobTranslations[character.job] || character.job || 'Desconocido';
    const crewName = character.crew?.name;
    const translatedCrew = crewTranslations[crewName] || crewName;
    const translatedFruit = fruitTranslations[character.devil_fruit?.name] || character.devil_fruit?.name || 'Ninguna';

    return {
      ...character,
      name: nameTranslations[character.name] || character.name || 'Desconocido',
      status: statusTranslations[character.status] || character.status || 'Desconocido',
      age: translatedAge || 'Desconocida',
      job: translatedJob,
      crew: {
        ...character.crew,
        name: translatedCrew || 'Desconocida',
      },
      devil_fruit: {
        ...character.devil_fruit,
        name: translatedFruit || 'Ninguna',
      },
    };
  }

  function renderCharacters(characters) {
    container.innerHTML = '';  // Limpiar contenido previo

    characters.forEach(character => {
      const card = template.content.cloneNode(true);

      // Traducir los valores antes de renderizar
      const translatedCharacter = translateFields(character);
      card.querySelector('.character-img').src = translatedCharacter.picture;
      card.querySelector('.character-img').alt = translatedCharacter.name;

      card.querySelector('.character-name').textContent = translatedCharacter.name || 'Desconocido';
      card.querySelector('.character-bounty').innerHTML = `<img src="./assets/img/berry.png" alt="Berry" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 4px;">${translatedCharacter.bounty}`;
      card.querySelector('.character-job').textContent = `Rol: ${translatedCharacter.job || 'Desconocido'}`;
      card.querySelector('.character-fruit').textContent = `Fruta del Diablo: ${translatedCharacter.devil_fruit.name || 'Ninguna'}`;
      card.querySelector('.character-crew').textContent = `Afiliación: ${translatedCharacter.crew.name || 'Desconocida'}`;
      card.querySelector('.character-state').textContent = `Estado: ${translatedCharacter.status || 'Desconocido'}`;
      card.querySelector('.character-age').textContent = `Edad: ${translatedCharacter.age || 'Desconocida'}`;
      card.querySelector('.character-size').textContent = `Altura: ${translatedCharacter.size || 'Desconocida'}`;
      card.querySelector('.character-gender').textContent = `Genero: ${translatedCharacter.gender || 'Desconocido'}`;
      card.querySelector('.character-haki').textContent = `Haki: ${translatedCharacter.haki || 'Desconocido'}`;
      card.querySelector('.character-origin').textContent = `Origen: ${translatedCharacter.origin || 'Desconocido'}`;
      card.querySelector('.character-firstappearance').textContent = `Primera aparición: ${translatedCharacter.firstappearance || 'Desconocida'}`;
      card.querySelector('.character-nickname').textContent = `Apodo: ${translatedCharacter.nickname || 'Sin apodo'}`;



      container.appendChild(card);
    });
  }


  function mapApiCharacterToTemplate(character) {
    return {
      name: character.name,
      nickname: character.nickname || 'Sin apodo',
      job: character.job || 'Desconocido',
      bounty: character.bounty2?.trim() ? character.bounty2 : (character.bounty ?? 'N/A'),
      picture: character.hdImage || character.fruit?.filename || '',
      devil_fruit: {
        name: character.fruit?.roman_name || 'Ninguna',
        description: character.fruit?.description || ''
      },
      crew: {
        name: character.crew?.name || 'Desconocida',
        roman_name: character.crew?.roman_name || ''
      },
      size: character.size || 'Desconocida',
      age: character.age || 'Desconocida',
      status: character.status || 'Desconocido',
      gender: character.gender || 'Desconocido',
      haki: character.haki || 'Desconocido',
      origin: character.origin || 'Desconocido',
      firstappearance: character.firstappearance || 'Desconocida',
      curiosities: character.curiosities || []
    };
  }

function fetchAllCharacters() {
  fetch(`https://api.api-onepiece.com/v2/characters/en`)
    .then(res => res.json())
    .then(characters => {
      const translated = characters.map(translateFields);
      const enriched = translated.map(enrichCharacter).map(mapApiCharacterToTemplate);
      renderCharacters(enriched);
    })
    .catch(err => {
      console.error('Error al cargar personajes:', err);
      container.innerHTML = '<p>Error al cargar personajes.</p>';
    });
}
  fetchAllCharacters(); // Cargar todos los personajes al inicio


});


