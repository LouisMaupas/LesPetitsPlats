function dropdown () {
  const inputs = document.querySelectorAll('.inputs');

  inputs.forEach(inputs => inputs.addEventListener('click', (e) => {
    const target = e.currentTarget,
      dropdown = target.parentNode.parentNode,
      header = target.parentNode,
      input = target.parentNode.children[0],
      body = target.parentNode.parentNode.children[1];
      input.classList.add('input--open');
      body.classList.add('is-open');
      input.setAttribute('placeholder', 'ATTENTION CA DEPEND Rechercher un ingrédient')
      header.children[1].setAttribute("src", "./public/logos/logo-arrow-top.svg")
      /* fermeture*/
      window.onclick = function hideDropdown (e) {
        if (!e.target.classList.contains('dropdown') && !e.target.classList.contains('inputs')) {
          input.classList.remove('input--open')
          body.classList.remove('is-open');
          input.setAttribute('placeholder', 'ATTENTION CA DEPEND Ingrédient')
          header.children[1].setAttribute("src", "./public/logos/logo-arrow-bot.svg")
        }
      }
  }))
}





export {dropdown}