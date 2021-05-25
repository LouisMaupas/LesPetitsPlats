/**
 * Gère le déploiement des dropdowns ainsi que leurs badges
 */
function dropdown () {
  const inputs = document.querySelectorAll('.inputs');
  let A, B; // A = le placeHolder du 1er input et B le placeholder du 2nd input si on click sur un 2nd
  /* OUVERTURE */
  inputs.forEach(inputs => inputs.addEventListener('click', (e) => {
    const target = e.currentTarget,
      header = target.parentNode,
      input = target.parentNode.children[0],
      body = target.parentNode.parentNode.children[1];
      if (A != undefined) { // si A est déjà associé à un placeholder
        B = input.placeholder // alors B = le placeholder du clickEvent
      } else {
        A = input.placeholder; // Sinon c'est A qui est = au placeholder du clickEvent
      }
      hideDropdonw() // On ferme tous les dropdowns
      input.classList.add('input--open');
      setTimeout(() => {
        body.classList.add('is-open'); 
       }, 500);

      let newPlaceHolder // variable qui va se placer dans le placeholder de l'input du dropdown déplié 
      switch(A) {
        case 'Ingredients': // si on a ouvert le 1er dropdown ...
          newPlaceHolder = 'ingrédient'; // alors la var = ingérdient
          break;
        case 'Appareil':
          newPlaceHolder = 'appareil';
          break; 
        case 'Ustensiles':
          newPlaceHolder = 'ustensile';
          break;
        default:
          console.log(`Erreur dans le switch`);       
      }
      if (input.placeholder.indexOf('Recherche') == -1) { // On boucle sur TOUS les inputs ; Celui qui a le mot Recherche ...
        console.log(input.placeholder)
      input.setAttribute('placeholder', `Rechercher un ${newPlaceHolder}`); ///
      }
      header.children[1].setAttribute("src", "./public/logos/logo-arrow-top.svg");
      header.classList.remove('dropdown-header--white')
  }))


  /* FERMETURE */
  function hideDropdonw() { 
    inputs.forEach(input => {
      input.parentNode.parentNode.children[1].classList.remove('is-open');
      input.classList.remove('input--open');
      if (B != undefined) {
        if (!input.placeholder.indexOf('Rechercher')) {
          input.setAttribute('placeholder', A);
          A = undefined
        } else {
          input.setAttribute('placeholder', B);
          B = undefined
        }
      } else {
        if (!input.placeholder.indexOf('Rechercher')) {
          input.setAttribute('placeholder', A);
          A = undefined
        }
      }
      input.parentNode.children[1].setAttribute("src", "./public/logos/logo-arrow-bot.svg");
      input.parentNode.classList.add('dropdown-header--white');
    })
   }

   window.onclick = function(e) {
     if (!e.path[0].classList.contains('inputs')) {
      hideDropdonw()
    }
   }

   /* affichages des badges */

}





export {dropdown}




/*


   fermeture
  let input;
  window.onclick = hideDropdonw;
  
  let hideDropdonw = function () {
    if (e.path[0].classList.contains('inputs')) {
      return input = e.target.parentNode.children[0];
    }
    if (!e.target.classList.contains('dropdown') && !e.target.classList.contains('inputs')) {
    input.parentNode.parentNode.children[1].classList.remove('is-open');
    input.classList.remove('input--open');
    input.setAttribute('placeholder', inputPlaceholder);
    console.log(input)
    input.parentNode.children[1].setAttribute("src", "./public/logos/logo-arrow-bot.svg");
    input.parentNode.classList.add('dropdown-header--white');
    }
  }

*/