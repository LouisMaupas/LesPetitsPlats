import {recipes} from "./recipes"
import { dropdown } from "./dropdowns"
import {search} from "./search"
dropdown()
search(recipes)




/*
1) Finir la fonction de recherches lié aux filtres (badges qui apparaissent pour les 3 filtres + recettes modifiés en conséquent)
2) Factoriser sous forme d'objet tout le code
3) Attaquer la main search

*/

// TODO : trouver comment remplacer le child[0] dans 
//  bodyUst.children[0].insertAdjacentHTML('afterbegin',`<div class="filter-item" >

// TODO rendre rapprot de bug console.log lisible
// => https://webpack.js.org/concepts/configuration/#introductory-configuration


// => class d'objet

// Comment modifier recipesToDisplay à partir des mots-clefs des filtres ?
// comparer chaque ing - ou - ust - ou - app  avec le mot clef si corespondace alors garder la recette dans array temporaire.
// puis recipesToDisplay = array temporaire