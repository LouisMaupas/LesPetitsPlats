import {recipes} from "./recipes"
import { dropdown } from "./dropdowns"
import {search} from "./search"
dropdown()
search(recipes)


/*
REPRENDRE : A CHAQUE RECHERCHE OU FILTRAGE on appel la meme fonction qui va faire :
- JE verifie ce que dis la recherche 
- Je pose un filtre 
(ou l'inverse)
- Je retourne le resutlat


BUGS :

- Si je fais une recherche dans la barre principale, puis que je filtre, des nouvelles recettes vont s'ajouter au lieu d'en enlever :
Exemple je tape "Pizza" j'ai seulement la recette de pizza, si je filtre avec un "rouleau a patisserie" dans ustensiles 3 recettes apparaissent !

*/

// TODO 2nd algo faire avec une boucle ? 


/* TODO
Faire un Logigramme / diagramme d'activité pour chaque fonction !
Sur draw.io
https://www.google.com/url?sa=i&url=https%3A%2F%2Flaurent-audibert.developpez.com%2FCours-UML%2F%3Fpage%3Ddiagramme-activites&psig=AOvVaw2RuUjRwaWac3D0yxYglle3&ust=1625138520019000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKiD7fOev_ECFQAAAAAdAAAAABAD
*/

// TODO rendre rapprot de bug console.log lisible
// => https://webpack.js.org/concepts/configuration/#introductory-configuration