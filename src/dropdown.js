function dropdown () {
  const inputs = document.querySelectorAll('.inputs');
  let inputPlaceholder;

  /* OUVERTURE */
  inputs.forEach(inputs => inputs.addEventListener('click', (e) => {
    const target = e.currentTarget,
      header = target.parentNode,
      input = target.parentNode.children[0],
      body = target.parentNode.parentNode.children[1];
      // TODO Si le mot-clé recherche est deja la ne rien faire
      console.log(inputPlaceholder)
      inputPlaceholder = input.placeholder;
      console.log(inputPlaceholder)
      hideDropdonw()
      input.classList.add('input--open');
      setTimeout(() => {
        body.classList.add('is-open'); 
       }, 500);

      let newPlaceHolder
      switch(inputPlaceholder) {
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
      header.children[1].setAttribute("src", "./public/logos/logo-arrow-top.svg");
      header.classList.remove('dropdown-header--white')
  }))


  /* FERMETURE */
  function hideDropdonw() { 
    inputs.forEach(input => {
      input.parentNode.parentNode.children[1].classList.remove('is-open');
      input.classList.remove('input--open');
      input.setAttribute('placeholder', inputPlaceholder);
      input.parentNode.children[1].setAttribute("src", "./public/logos/logo-arrow-bot.svg");
      input.parentNode.classList.add('dropdown-header--white');
    })
   }

   window.onclick = function(e) {
     if (!e.path[0].classList.contains('inputs')) {
      hideDropdonw()
    }
   }

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