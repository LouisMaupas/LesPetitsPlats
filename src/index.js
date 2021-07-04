import {recipes} from "./recipes"
import { dropdown } from "./dropdowns"
import {search} from "./search"
dropdown()
search(recipes)


// TODO : trouver comment remplacer le child[0] dans 
//  bodyUst.children[0].insertAdjacentHTML('afterbegin',`<div class="filter-item" >

// TODO rendre rapprot de bug console.log lisible
// => https://webpack.js.org/concepts/configuration/#introductory-configuration


// => class d'objet

// Comment modifier recipesToDisplay à partir des mots-clefs des filtres ?
// comparer chaque ing - ou - ust - ou - app  avec le mot clef si corespondace alors garder la recette dans array temporaire.
// puis recipesToDisplay = array temporaire