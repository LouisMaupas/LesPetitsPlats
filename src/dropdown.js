function dropdown () {
  const inputs = document.querySelectorAll('.inputs'),
    dropdowns = document.querySelectorAll('.dropdown');
  let inputPlaceholder;

  /* OUVERTURE */
  inputs.forEach(inputs => inputs.addEventListener('click', (e) => {
    const target = e.currentTarget,
      dropdown = target.parentNode.parentNode,
      header = target.parentNode,
      input = target.parentNode.children[0],
      body = target.parentNode.parentNode.children[1];
      inputPlaceholder = input.placeholder;
    //  dropdowns.forEach(dropdowns => dropdowns.style.cursor = "not-allowed");
      input.classList.add('input--open');
      body.classList.add('is-open');
      input.setAttribute('placeholder', 'ATTENTION CA DEPEND Rechercher un ingrédient');
      header.children[1].setAttribute("src", "./public/logos/logo-arrow-top.svg")     ;
  }))

  /* fermeture*/
  let input;
  window.onclick = function hideDropdown (e) {
    if (e.path[0].classList.contains('inputs')) {
      return input = e.target.parentNode.children[0];
    }
    if (!e.target.classList.contains('dropdown') && !e.target.classList.contains('inputs')) {
    input.parentNode.parentNode.children[1].classList.remove('is-open');
    input.classList.remove('input--open');
    input.setAttribute('placeholder', inputPlaceholder);
    input.setAttribute("src", "./public/logos/logo-arrow-bot.svg");
    }
  }
}
export {dropdown}