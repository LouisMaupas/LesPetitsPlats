function search (recipes) {
    const inputs = document.querySelectorAll('.inputs'),
    bodyIngre = document.getElementById('dropdown-body-Ingredients'),
    bodyApp = document.getElementById('dropdown-body-Appareil'),
    bodyUst = document.getElementById('dropdown-body-Ustensiles'),
    mainSearchInput = document.getElementById('main-search-bar'),
    badgeIngre = document.getElementById('badges-ingredients'),
    badgeApp = document.getElementById('badges-appareil'),
    badgeUst = document.getElementById('badges-ustensiles'),
    grid = document.getElementById('grid');
    let filterClose = []
     

    /**
    * Document ready qui affiche les recettes à l'ouverture de la page
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
                        <div class="grid-ingredient col-5">
                        ${recipe.ingredients.map(ingredient => {
                            return `<div class="ingredient">
                                        <span class="food">
                                            ${ingredient.ingredient}:
                                        </span>
                                        <span class="quantity">
                                        ${ingredient.quantity || '' } ${ingredient.unit || ''}
                                        </span>
                                    </div>`
                        }).join('')}
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
                displayRecipes(recipesToDisplay)
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

   // TODO les ingrédients 
   /**
    * Array des ingrédients
    */
   let allIngredients = []

    /**
     * remplissage du tableau des ingrédients
     */
     recipes.forEach(recipe => {
            recipe.ingredients.forEach(recipe => {
                if (!allIngredients.includes(recipe.ingredient)) {
                    allIngredients.push(recipe.ingredient)
                } 
            })
        })

    /**
     * ajoute les ingrédients dans le body
     */
    allIngredients.forEach(ingredient => {
        bodyIngre.children[0].insertAdjacentHTML('afterbegin',`<div class="filter-item" >
        <a class="ingre-item">${ingredient}</a>
        </div>`)

    })
    // ajouter evenemnt d'ecoute de click sur les ingredietns dans le body
    let ingreItem = document.querySelectorAll('.ingre-item');
    ingreItem.forEach(item => item.addEventListener('click', () => {
        createIngreBadge(item.innerHTML)
    }))

    /**
     * Créer les badges de filtre quand on choisi un ingredient
     * @param {*} ingredient 
     */
    function createIngreBadge(ingredient){
        badgeIngre.insertAdjacentHTML('afterbegin',`<button type="button" class="btn btn-primary">
            <span class="badge__text">${ingredient}</span> 
            <a class="filter-close">
                <img src="public/logos/logo-cross.svg" class="ml-2" />
            </a>    
        </button>`)
        filterClose = document.querySelectorAll('.filter-close')
        addEventListenerFilterClose(ingredient)
    }

   // TODO 4-2) filtre Appareil
   /**
    * Array des appareils
    */
    let allAppliances = []

    /**
     * remplissage du tableau des appareils
     */
     recipes.forEach(recipe => {
            if(!allAppliances.includes(recipe.appliance)) allAppliances.push(recipe.appliance)
        })
    /**
     * ajoute les appareils dans le body
     */
     allAppliances.forEach(appliance => {
        bodyApp.children[0].insertAdjacentHTML('afterbegin',`<div class="filter-item" >
        <a class="app-item">${appliance}</a>
        </div>`)

    })
    // ajouter evenemnt d'ecoute de click sur les appareils  dans le body
    let appItem = document.querySelectorAll('.app-item');
    appItem.forEach(item => item.addEventListener('click', () => {
        createAppBadge(item.innerHTML)
    }))

    /**
     * Créer les badges de filtre quand on choisi un ingredient
     * @param {*} ingredient 
     */
    function createAppBadge(appliances){
        badgeApp.insertAdjacentHTML('afterbegin',`<button type="button" class="btn button--green">
            <span class="badge__text">${appliances}</span> 
            <a class="filter-close">
                <img src="public/logos/logo-cross.svg" class="ml-2" />
            </a>    
        </button>`)
        filterClose = document.querySelectorAll('.filter-close')
        addEventListenerFilterClose(appliances)
    }

   
   // TODO 4-3) filtre Ustensiles
    /**
    * Array des Ustensiles
    */
    let allUstensils = []

    /**
     * remplissage du tableau des Ustensiles
     */
    recipes.forEach(recipe => {
            recipe.ustensils.forEach(recipe => {
                if (!allUstensils.includes(recipe)) allUstensils.push(recipe)               
            })
        })
    /**
     * ajoute les Ustensiles dans le body
     */
     allUstensils.forEach(ingredient => {
        bodyUst.children[0].insertAdjacentHTML('afterbegin',`<div class="filter-item" >
        <a class="ingre-item">${ingredient}</a>
        </div>`)

    })
    console.log(allUstensils)
    allUstensils.sort()
    console.log(allUstensils)
    // ajouter evenemnt d'ecoute de click sur les ingredietns dans le body
   // let ingreItem = document.querySelectorAll('.ingre-item');
    ingreItem.forEach(item => item.addEventListener('click', () => {
        createUstBadge(item.innerHTML)
    }))

 /**
  * Créer les badges de filtre quand on choisi un ingredient
  * @param {*} ingredient 
  */
 function createUstBadge(ingredient){
     badgeIngre.insertAdjacentHTML('afterbegin',`<button type="button" class="btn btn-primary">
         <span class="badge__text">${ingredient}</span> 
         <a class="filter-close">
             <img src="public/logos/logo-cross.svg" class="ml-2" />
         </a>    
     </button>`)
     filterClose = document.querySelectorAll('.filter-close')
     addEventListenerFilterClose(ingredient)
 }

    // TODO 4-4) Gérer la fermeture des filtres 
    // Retirer visuellement le bouton avec display none
    // Retirer le filtre du bouton
    /**
     * Retire visuellement le badge de filtre et remets   
     * @param {*} filtre 
     */
    function addEventListenerFilterClose(ingredient) {
        filterClose.forEach(item => item.addEventListener('click', (ev) => {
        closefilter(ev)
      //  SupprimeLeFiltre(ingredient)
    }))
    }

    function closefilter(ev){
        const target = ev.path[2]
        target.classList.add('display-none')
    }
    
   // TODO 4-6) voir si possible de factoriser un peu les 3 fonctions précédentes




















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