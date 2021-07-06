/**
 *  * Gère les dropdowns ainsi que l'affichage de leur badge
 */
 function dropdown () {
  const inputs = document.querySelectorAll('.inputs'),
  inputIngre = document.getElementById('Ingredients'),
  inputApp = document.getElementById('Appareil'),
  inputUst = document.getElementById('Ustensiles');

  /**
   * fonction auto-appelée qui ajoute une evenement d'écoute sur tous les dropdowns
   * au clic appel displayDropdowns()
   */
  (function inputsListener(){
      inputIngre.addEventListener('click', (e) => {
          const target = e.currentTarget;
          displayDropdowns(target)
      })
    
      inputApp.addEventListener('click', (e) => {
          const target = e.currentTarget;
          displayDropdowns(target)
      })
    
      inputUst.addEventListener('click', (e) => {
          const target = e.currentTarget;
          displayDropdowns(target)
      })
  })();

  /**
   * gère l'ouverture des dropdowns
   * @param {*} target = input.addEventListener('click', (e) => {target = e.currentTarget}
   */
    function displayDropdowns(target) {
        const input = target.parentNode.children[0],
        header = target.parentNode,
        body = target.parentNode.parentNode.children[1];
        let placeholder = input.placeholder,
            newPlaceHolder;
        let clickTarget = input.parentNode.parentNode.children[1];
        hideDropdonw()
        input.classList.add('input--open');
        setTimeout(() => {
          body.classList.add('is-open'); 
        clickTarget.firstElementChild.classList.remove('d-none');
        }, 500);    
        header.children[1].setAttribute("src", "./public/logos/logo-arrow-top.svg");
        header.classList.remove('dropdown-header--white')
        switch(placeholder) {
            case 'Ingredients':
              newPlaceHolder = 'ingrédient';
              break;
            case 'Appareil':
              newPlaceHolder = 'appareil';
              break; 
            case 'Ustensiles':
              newPlaceHolder = 'ustensile';
              break;
            default:
              console.log(`Erreur dans le switch displayDropdowns()`);       
          }
        input.setAttribute('placeholder', `Rechercher un ${newPlaceHolder}`);
    }


  /**
   * Ferme tous les dropsdonws
   */
  function hideDropdonw() {
    inputs.forEach(input => {
      let clickTarget = input.parentNode.parentNode.children[1]
      clickTarget;
      clickTarget.firstElementChild.classList.add('d-none');
      input.parentNode.parentNode.children[1].classList.remove('is-open');
      input.classList.remove('input--open');
      input.parentNode.children[1].setAttribute("src", "./public/logos/logo-arrow-bot.svg");
      input.parentNode.classList.add('dropdown-header--white');
    })
    inputIngre.setAttribute('placeholder', 'Ingredients');
    inputApp.setAttribute('placeholder', 'Appareil');
    inputUst.setAttribute('placeholder', 'Ustensiles');
  }

  /**
   * Au clic dans la fenetre ferme tous les dropdowns
   * @param {*} e 
   */
   window.onclick = function(e) {
     if (!e.target.classList.contains('inputs')) {
      hideDropdonw()
    }
   }
}

export {dropdown}