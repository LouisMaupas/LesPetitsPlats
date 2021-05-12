function dropdown () {
  const inputs = document.querySelectorAll('.inputs');

  inputs.forEach(inputs => inputs.addEventListener('input', (e) => {
    console.log(e.currentTarget.parentNode) // header
    console.log(e.currentTarget.parentNode.parentNode.children[1]) // body
  }))


}

export {dropdown}