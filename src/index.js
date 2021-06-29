import {recipes} from "./recipes"
import { dropdown } from "./dropdowns"
import {search} from "./search"
dropdown()
search(recipes)




// TODO Est-ce que les mots clés doivent pouvoir se cumuler ?
// BUG cumule des mots-clés dans les body


// TODO : trouver comment remplacer le child[0] dans 
//  bodyUst.children[0].insertAdjacentHTML('afterbegin',`<div class="filter-item" >

// TODO rendre rapprot de bug console.log lisible
// => https://webpack.js.org/concepts/configuration/#introductory-configuration
