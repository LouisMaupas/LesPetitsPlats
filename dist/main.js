(()=>{"use strict";!function(){const e=document.querySelectorAll(".inputs"),t=document.getElementById("Ingredients"),r=document.getElementById("Appareil"),n=document.getElementById("Ustensiles");function s(e){let t;switch(e.placeholder){case"Ingredients":t="ingrédient";break;case"Appareil":t="appareil";break;case"Ustensiles":t="ustensile";break;default:console.log("Erreur dans le switch")}e.setAttribute("placeholder",`Rechercher un ${t}`)}function i(){e.forEach((e=>{e.parentNode.parentNode.children[1].classList.remove("is-open"),e.classList.remove("input--open"),e.parentNode.children[1].setAttribute("src","./public/logos/logo-arrow-bot.svg"),e.parentNode.classList.add("dropdown-header--white")})),t.setAttribute("placeholder","Ingredients"),r.setAttribute("placeholder","Appareil"),n.setAttribute("placeholder","Ustensiles")}e.forEach((e=>e.addEventListener("click",(e=>{const t=e.currentTarget,r=t.parentNode,n=t.parentNode.children[0],s=t.parentNode.parentNode.children[1];i(),n.classList.add("input--open"),setTimeout((()=>{s.classList.add("is-open")}),500),r.children[1].setAttribute("src","./public/logos/logo-arrow-top.svg"),r.classList.remove("dropdown-header--white")})))),t.addEventListener("click",(e=>{s(e.currentTarget.parentNode.children[0])})),r.addEventListener("click",(e=>{s(e.currentTarget.parentNode.children[0])})),n.addEventListener("click",(e=>{s(e.currentTarget.parentNode.children[0])})),i(),window.onclick=function(e){e.path[0].classList.contains("inputs")||i()}}(),document.getElementById("main-search-bar")})();