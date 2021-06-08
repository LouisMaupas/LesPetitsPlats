import {recipes} from "./recipes"
import { dropdown } from "./dropdowns"
import {search} from "./search"
dropdown()
search(recipes)

// TODO BUGS :
// Comment afficher la liste des ingrédients ? (ligne 56) (function displayRecipes(array))
// On ne peut pas cliquer sur les items du body

// TODO rendre rapprot de bug console.log lisible
// => https://webpack.js.org/concepts/configuration/#introductory-configuration