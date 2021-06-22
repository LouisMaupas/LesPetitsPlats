import {recipes} from "./recipes"
import { dropdown } from "./dropdowns"
import {search} from "./search"
dropdown()
search(recipes)

// TODO : Quand on fait une recherche dans un filtre : il s'affiche notre recherche + tous le tableau 

// TODO : trouver comment remplacer le child[0] dans 
//  bodyUst.children[0].insertAdjacentHTML('afterbegin',`<div class="filter-item" >

// TODO rendre rapprot de bug console.log lisible
// => https://webpack.js.org/concepts/configuration/#introductory-configuration