import { extraCharacterData } from "./extraCharacterData.js";
import { translateFields } from "./app.js"; // Asumiendo que translateFields está exportada desde app.js

export async function getAllCharacters() {
  try {
    const response = await fetch("https://api-onepiece.com/characters");
    
    if (!response.ok) {
      throw new Error(`Error al obtener personajes: ${response.status}`);
    }

    const apiCharacters = await response.json();

    // Crear un Map para búsquedas rápidas de extraCharacterData por id
    const extraMap = new Map(extraCharacterData.map(e => [e.id, e]));

    // Merge API + extraCharacterData + traducciones
    return apiCharacters.map(char => {
      const extra = extraMap.get(char.id) || {};
      const merged = { ...char, ...extra };
      return translateFields(merged);
    });
    
  } catch (error) {
    console.error(error);
    return []; // Devuelve array vacío si hay error
  }
}
