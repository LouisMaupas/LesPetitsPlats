function search (recipes) {
    const inputs = document.querySelectorAll('.inputs'),
    bodyIngre = document.getElementById('dropdown-body-Ingredients'),
    bodyApp = document.getElementById('dropdown-body-Appareil'),
    bodyUst = document.getElementById('dropdown-body-Ustensiles'),
    mainSearchInput = document.getElementById('main-search-bar'),
    badgeIngre = document.getElementById('badges-ingredients'),
    badgeApp = document.getElementById('badges-appareil'),
    badgeUst = document.getElementById('badges-ustensiles'),
    filterItem = document.querySelectorAll('.filter-item'),
    ingreItem = document.querySelectorAll('.ingre-item'),
    grid = document.getElementById('grid');

    /**
    * Document ready qui appelle la fonction d'écoute sur les inputs
    */
        document.addEventListener("DOMContentLoaded", function() {
           displayRecipes(recipesToDisplay)
       });



    // TODO 1 : Créer un tableau recipesToDisplay[] qui contiens toutes les recettes a afficher dans la grid (par défaut = toutes les recettes)
    let recipesToDisplay = recipes

    // TODO 2 : créer une fonction displayRecipes() qui affiche dans la grid, toutes les recettes contenu dans le tableau recipesToDisplay[]
    /**
     * 
     * @param {*} array 
     */
    function displayRecipes(array) {
        let i
        grid.innerHTML = ''
        array.forEach(recipe => {
            i = i + 1
          //  console.log(typeof(i))
            // TODO probleme pour générer les ingredients car quantité variable
            // TYPEOF I NaN dans le DOM MAIS NUMBER DANS CONSOLE.LOG
            grid.insertAdjacentHTML('afterbegin',`<div class="grid-item">
                <div class="grid-img">
                    <img class="img" src="public/img/img.png" />
                </div>
                <div class="grid-content container-fluid p-4">
                    <div class="row mb-3">
                        <div class="grid-title col-9">
                            ${recipe.name}
                        </div>
                        <div class="grid-timer">
                            <img src="public/logos/logo-clock.svg" />
                            ${recipe.time} min
                        </div>
                    </div>
                    <div class="row d-flex">
                        <div id="ingredients-${i}" class="grid-ingredient col-5">
                            <div class="ingredient">
                                <span class="food">
                                    Lait de coco:
                                </span>
                                <span class="quantity">
                                    400ml
                                </span>
                            </div>
                            <div class="ingredient">
                                <span class="food">
                                    Jus de citron:
                                </span>
                                <span class="quantity">
                                    2
                                </span>
                            </div>
                        </div>
                        <div class="grid-recipe col-7">
                        ${recipe.description}
                        </div>
                    </div>
                </div>
            </div>`)
            // TODO PROBLEME POUR AFFICHER LES INGREDIENTS CAR PBLM POUR BOUCLER
            // let ingredients = document.getElementById('ingredients-${i}')
        })
    }

    // TODO 3 : Fonction recherche (Barre de recherche)
    // si l'utilisateur écrit au moins 3 caractères dans la barre de recherche principale
    // On filtre et modifie le tableau recipesToDisplay[] pour RETIRER les recettes qui n'ont PAS
    //  OU Un ingrédient ayant des lettres en commun avec la saisie utilisateur input
    // OU un ustentile ayant des lettres en commun avec la saisie utilisateur input
    // OU un appareil ayant des lettres en commun avec la saisie utilisateur input
    // on appel la fonction displayRecipes()
    mainSearchInput.addEventListener('keypress', () => {
            if (mainSearchInput.value.length >= 2 ) {
                recipesToDisplay.sort()
                console.log(recipesToDisplay)
                displayRecipes(recipesToDisplay)
                // TODO JUSTE POUR TESTER LES BADGES A SUPPRIMER APRES
                // NE S'AFFICHE PAS MAIS APPARAIT DNAS LE DOM DE LA CONSOLE
                createIngreBadge(mainSearchInput.value)
            }
        })



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


   let allIngredients = []

     recipes.forEach(recipe => {
            recipe.ingredients.forEach(recipe => {
                    allIngredients.push(recipe.ingredient)
            })
        })

    allIngredients.forEach(ingredient => {
        bodyIngre.children[0].insertAdjacentHTML('afterbegin',`<div class="filter-item" >
        <a class="ingre-item">${ingredient}</a>
        </div>`)
    })

    ingreItem.forEach(item => item.addEventListener('click', () => {
        console.log('TEST')
        createIngreBadge(item.value)
    }))

    function createIngreBadge(ingredient){
        badgeIngre.insertAdjacentHTML('afterbegin',`<button type="button" class="btn btn-primary">
            <span class="badge__text">${ingredient}</span> 
            <a>
                <img src="public/logos/logo-cross.svg" class="ml-2" />
            </a>    
        </button>`)
    }

    // TODO 4-1-2) Gérer la fermeture des filtres 
    // Retirer visuellement le bouton avec display none
    // Retirer le filtre du bouton

   // TODO 4-2) filtre Appareil
   // TODO 4-3) filtre Ustensiles
   // TODO 4-4) voir si possible de factoriser un peu les 3 fonctions précédentes




















    /**
     * ajoute une evenement d'écoute sur tous les dropdowns
     * quand >= 3 lettres sont écrites dans l'input alors appel 
     * ()
     */
    /*
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
    }*/

}

export {search}