/**
 * Gère le déploiement des dropdowns ainsi que leurs badges
 */
function dropdown () {
  const inputs = document.querySelectorAll('.inputs'),
  inputIngre = document.getElementById('Ingredients'),
  inputApp = document.getElementById('Appareil'),
  inputUst = document.getElementById('Ustensiles');

  inputs.forEach(inputs => inputs.addEventListener('click', (e) => {
    const target = e.currentTarget,
    header = target.parentNode,
    input = target.parentNode.children[0],
    body = target.parentNode.parentNode.children[1];
    hideDropdonw()
    input.classList.add('input--open');
    setTimeout(() => {
      body.classList.add('is-open'); 
    }, 500);    
    header.children[1].setAttribute("src", "./public/logos/logo-arrow-top.svg");
    header.classList.remove('dropdown-header--white')
  }))


  /*  gestion du input*/ 
  inputIngre.addEventListener('click', (e) => {
    const target = e.currentTarget,
        input = target.parentNode.children[0];
        inputDisplay(input)
  })

  inputApp.addEventListener('click', (e) => {
    const target = e.currentTarget,
        input = target.parentNode.children[0];
        inputDisplay(input)
  })

  inputUst.addEventListener('click', (e) => {
    const target = e.currentTarget,
        input = target.parentNode.children[0];
        inputDisplay(input)
  })
  hideDropdonw() 
  function inputDisplay(input) {
    let placeholder = input.placeholder
    let newPlaceHolder
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
          console.log(`Erreur dans le switch`);       
      }
    input.setAttribute('placeholder', `Rechercher un ${newPlaceHolder}`);
    
  }

  /* FERMETURE */
  function hideDropdonw() {
    inputs.forEach(input => {
      input.parentNode.parentNode.children[1].classList.remove('is-open');
      input.classList.remove('input--open');
      input.parentNode.children[1].setAttribute("src", "./public/logos/logo-arrow-bot.svg");
      input.parentNode.classList.add('dropdown-header--white');
    })
    inputIngre.setAttribute('placeholder', 'Ingredients');
    inputApp.setAttribute('placeholder', 'Appareil');
    inputUst.setAttribute('placeholder', 'Ustensiles');
  }

   window.onclick = function(e) {
     if (!e.path[0].classList.contains('inputs')) {
      hideDropdonw()
    }
   }
   /* TODO affichages des badges */

}

export {dropdown}