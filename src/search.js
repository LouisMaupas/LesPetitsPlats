function search (recipes) {
    const inputs = document.querySelectorAll('.inputs'),
    bodyIngre = document.getElementById('dropdown-body-Ingredients'),
    bodyApp = document.getElementById('dropdown-body-Appareil'),
    bodyUst = document.getElementById('dropdown-body-Ustensiles'); 





    // TODO 1 : Créer un tableau recipesToDisplay[] qui contiens toutes les recettes a afficher dans la grid (par défaut = toutes les recettes)
    // TODO 2 : créer une fonction displayRecipes() qui affiche dans la grid, toutes les recettes contenu dans le tableau recipesToDisplay[]

    // TODO 3 : Fonction recherche (Barre de recherche)
    // si l'utilisateur écrit au moins 3 caractères dans la barre de recherche principale
    // On filtre et modifie le tableau recipesToDisplay[] pour RETIRER les recettes qui n'ont PAS
    //  OU Un ingrédient ayant des lettres en commun avec la saisie utilisateur input
    // OU un ustentile ayant des lettres en commun avec la saisie utilisateur input
    // OU un appareil ayant des lettres en commun avec la saisie utilisateur input
    // on appel la fonction displayRecipes()

   // TODO 4 : créer et séparer 3 filtres différents

   // TODO 4-1) filtre ingrédients
   // Faire un tableau allIngredients[] qui contient TOUS les ingredients de TOUTES les recette
   // Afficher le elements du tableau allIngredients[] dans bodyIngre sous forme de mots-clefs cliquables
   // Si l'utilisateur clique sur un mot clef alors :
   //   - On affiche le mot clef dans un badge (donc on génère de toute pièce le badge en html =/= remplir)
   //   - On n'afficher QUE les RECETTES qui ont des INGREDIENTS ayant des lettres en communs avec la value de l'input du filtre ingrédient
   //   - on RETIRE de recipesToDisplay[] toutes les RECETTES qui ne possède PAS l'INGREDIENT CHOISI EN MOT-CLE
   //   - on appel displayRecipes()
   // On retire bodyIngre de l'affichage

   // TODO 4-2) filtre Appareil
   // TODO 4-3) filtre Ustensiles
   // TODO 4-4) voir si possible de factoriser un peu les 3 fonctions précédentes
















    /**
     * Document ready qui appelle la fonction d'écoute sur les inputs
     */
    document.addEventListener("DOMContentLoaded", function() {
        inputsKeypressListener()
    });


    /**
     * ajoute une evenement d'écoute sur tous les dropdowns
     * quand >= 3 lettres sont écrites dans l'input alors appel 
     * ()
     */
     function inputsKeypressListener(){
        inputs.forEach(inputs => inputs.addEventListener('keypress', (e) => {
            if (e.target.value.length >= 3 ) {
                displayResearch(e.currentTarget.value, e.target)
            }
        }))
    }

    function displayResearch(value, target){
        let result = []
        recipes.forEach(recipe => {
            let OneRecipe = recipe
            let theRecipes = OneRecipe.ingredients
            theRecipes.forEach(recipe => {
                if(recipe.ingredient.includes(value)){
                    result.push(recipe.ingredient)
                }
            })
        })
        console.log(result)

        switch(target.id){
            case 'Ingredients':
                bodyIngre.innerHTML = result
                break;
            case 'Appareil':
                bodyApp.innerHTML = result 
                break;
            case 'Ustensiles':
                bodyUst.innerHTML = result
                break;
            default:
                console.log('erreur dans le switch displayResearch()')   
        }
    }

}

export {search}