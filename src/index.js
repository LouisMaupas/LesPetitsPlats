import {recipes} from "./recipes"
import { dropdown } from "./dropdowns"
import {search} from "./search"
dropdown()
search(recipes)



/*
TODO : 
Finir filtres :
Quand l'user fais retiens le mot-clés tomate.
- Boucle sur le tableau ingredients en comparant tous les mots-clés avec le mot tomate
- Si le nombre de badge ingrédients =< 1
    - si mots-clé = tomate alors push mots-clés dans tempArray
    - sinon pass
- Sinon
    - on vide le tableau allIngredients

* Factorisé :
allIngredients = nombreBadges =<1 ? [] : allIngredients




Algo 1
Logigram
*/


/* TODO
Faire un Logigramme / diagramme d'activité pour chaque fonction !
Sur draw.io
https://www.google.com/url?sa=i&url=https%3A%2F%2Flaurent-audibert.developpez.com%2FCours-UML%2F%3Fpage%3Ddiagramme-activites&psig=AOvVaw2RuUjRwaWac3D0yxYglle3&ust=1625138520019000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKiD7fOev_ECFQAAAAAdAAAAABAD
*/

// TODO Est-ce que les mots clés doivent pouvoir se cumuler ?
// BUG cumule des mots-clés dans les body


// TODO : trouver comment remplacer le child[0] dans 
//  bodyUst.children[0].insertAdjacentHTML('afterbegin',`<div class="filter-item" >

// TODO rendre rapprot de bug console.log lisible
// => https://webpack.js.org/concepts/configuration/#introductory-configuration