(()=>{"use strict";document.querySelectorAll(".inputs").forEach((e=>e.addEventListener("click",(e=>{const t=e.currentTarget,o=(t.parentNode.parentNode,t.parentNode),r=t.parentNode.children[0],n=t.parentNode.parentNode.children[1];r.classList.add("input--open"),n.classList.add("is-open"),r.setAttribute("placeholder","ATTENTION CA DEPEND Rechercher un ingrédient"),o.children[1].setAttribute("src","./public/logos/logo-arrow-top.svg")})))),window.onclick=function(e){if(!e.target.classList.contains("dropdown")&&!e.target.classList.contains("inputs")){const e=document.querySelectorAll(".inputs"),t=(document.querySelectorAll(".dropdown-header"),document.querySelectorAll(".dropdown-body"));t.forEach((e=>{e.classList.remove("is-open")})),e.forEach((e=>{e.classList.remove("input--open"),e.setAttribute("placeholder","ATTENTION CA DEPEND Ingrédient")})),t.forEach((e=>{e.children[1].setAttribute("src","./public/logos/logo-arrow-bot.svg")}))}}})();