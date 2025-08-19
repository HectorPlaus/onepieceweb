document.addEventListener('DOMContentLoaded', () => {

   
    const classicModeButton = document.getElementById('classic-mode');
    classicModeButton.addEventListener('click', () => {
        window.location.href = 'classicGame.html'; 
    });
  
    const fruitModetButton = document.getElementById('fruit-mode');
    if (fruitModetButton) {
      fruitModetButton.addEventListener('click', () => {
        window.location.href = 'fruitGame.html';
      });
    }
  
  });
  