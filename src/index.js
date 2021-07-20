import {recipes} from "./recipes"
import { dropdown } from "./dropdowns"
import {search} from "./search"
dropdown()
search(recipes)



/*
BUGS :
- Les filtres mots-clés ne se réinitialise dans le dropdown que si on en utilise au moins 2/3 et qu'on les ferme tous :
Exemple : Je clique sur "blender" puis je ferme le badge "blender"
Dans le dropdown Appareil j'ai que le mots-clé Blender au lieu de tous les mots-clé.

- Si je fais une recherche dans la barre principale puis que je supprime la recherche, les recettes affichés ne sont pas les bonnes (ont devrait toutes les avoir)

- SI je fais une recherche dans la barre principale, que je la supprimer puis que je l'efface => recipesToDisplay pas revenu a 0 ?
=> Si je remets recipesToDisplay = recipes ALORS BUG car si j'ai un filtre en même temps ça le supprime

- Si je fais une recherche dans la barre principale, puis que je filtre, des nouvelles recettes vont s'ajouter au lieu d'en enlever :
Exemple je tape "Pizza" j'ai seulement la recette de pizza, si je filtre avec un "rouleau a patisserie" dans ustensiles 3 recettes apparaissent !

*/


/* TODO
Faire un Logigramme / diagramme d'activité pour chaque fonction !
Sur draw.io
https://www.google.com/url?sa=i&url=https%3A%2F%2Flaurent-audibert.developpez.com%2FCours-UML%2F%3Fpage%3Ddiagramme-activites&psig=AOvVaw2RuUjRwaWac3D0yxYglle3&ust=1625138520019000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKiD7fOev_ECFQAAAAAdAAAAABAD
*/

// TODO rendre rapprot de bug console.log lisible
// => https://webpack.js.org/concepts/configuration/#introductory-configuration