(()=>{"use strict";!function(){const e=document.querySelectorAll(".inputs");let t,r;document.querySelectorAll(".dropdown"),e.forEach((e=>e.addEventListener("click",(e=>{const r=e.currentTarget,n=(r.parentNode.parentNode,r.parentNode),o=r.parentNode.children[0],s=r.parentNode.parentNode.children[1];t=o.placeholder,o.classList.add("input--open"),s.classList.add("is-open"),o.setAttribute("placeholder","ATTENTION CA DEPEND Rechercher un ingrédient"),n.children[1].setAttribute("src","./public/logos/logo-arrow-top.svg")})))),window.onclick=function(e){if(e.path[0].classList.contains("inputs"))return r=e.target.parentNode.children[0];e.target.classList.contains("dropdown")||e.target.classList.contains("inputs")||(r.parentNode.parentNode.children[1].classList.remove("is-open"),r.classList.remove("input--open"),r.setAttribute("placeholder",t),r.setAttribute("src","./public/logos/logo-arrow-bot.svg"))}}()})();