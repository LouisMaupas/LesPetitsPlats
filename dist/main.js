(()=>{"use strict";!function(){const e=document.querySelectorAll(".inputs");let t;function s(){e.forEach((e=>{e.parentNode.parentNode.children[1].classList.remove("is-open"),e.classList.remove("input--open"),e.setAttribute("placeholder",t),e.parentNode.children[1].setAttribute("src","./public/logos/logo-arrow-bot.svg"),e.parentNode.classList.add("dropdown-header--white")}))}e.forEach((e=>e.addEventListener("click",(e=>{const o=e.currentTarget,r=o.parentNode,n=o.parentNode.children[0],c=o.parentNode.parentNode.children[1];let i;switch(console.log(t),t=n.placeholder,console.log(t),s(),n.classList.add("input--open"),setTimeout((()=>{c.classList.add("is-open")}),500),t){case"Ingredients":i="ingrédient";break;case"Appareil":i="appareil";break;case"Ustensiles":i="ustensile";break;default:console.log("Erreur dans le switch")}n.setAttribute("placeholder",`Rechercher un ${i}`),r.children[1].setAttribute("src","./public/logos/logo-arrow-top.svg"),r.classList.remove("dropdown-header--white")})))),window.onclick=function(e){e.path[0].classList.contains("inputs")||s()}}()})();