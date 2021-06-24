function search(recipes) {
	const inputs = document.querySelectorAll('.inputs'),
		bodyIngre = document.getElementById('dropdown-body-Ingredients'),
		bodyApp = document.getElementById('dropdown-body-Appareil'),
		bodyUst = document.getElementById('dropdown-body-Ustensiles'),
		mainSearchInput = document.getElementById('main-search-bar'),
		badgeIngre = document.getElementById('badges-ingredients'),
		badgeApp = document.getElementById('badges-appareil'),
		badgeUst = document.getElementById('badges-ustensiles'),
		grid = document.getElementById('grid');
	let recipesToDisplay = recipes,
		filterClose = [],
		allIngredients = [],
		allAppliances = [],
		allUstensils = [];

	/**
    * Document ready qui affiche les recettes à l'ouverture de la page
    */
	document.addEventListener('DOMContentLoaded', function() {
		fillIngArray();
		displayRecipes(recipesToDisplay);
		manageFilters();
		displayItems();
	});

	/**
     * Ajoute la fonction d'écoute Keyup sur les dropdown : 
	 * - Appel la fonction de recherche 
	 * - Appel l'affichage des résultats dans le body de chaque dropdowns
     */
	function manageFilters() {
		inputs.forEach((input) => {
			input.addEventListener('keyup', () => {
				if (input.value.length > 2) {
					filtersSearch(input.value, input.id);
					displayItems();
				}
			});
		});
	}

	/**
     * Affiche dans la grid de l'affichage principal, 
	 * toutes les recettes contenu dans le tableau passé en parametre de la fonction
     * @param {*} array 
     */
	function displayRecipes(array) {
		grid.innerHTML = '';
		array.forEach((recipe) => {
			grid.insertAdjacentHTML(
				'afterbegin',
				`<div class="grid-item">
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
                        ${recipe.ingredients
							.map((ingredient) => {
								return `<div class="ingredient">
                                        <span class="food">
                                            ${ingredient.ingredient}:
                                        </span>
                                        <span class="quantity">
                                        ${ingredient.quantity || ''} ${ingredient.unit || ''}
                                        </span>
                                    </div>`;
							})
							.join('')}
                        </div>
                        <div class="grid-recipe col-7">
                        ${recipe.description}
                        </div>
                    </div>
                </div>
            </div>`
			);
		});
	}
	

	// TODO : Fonction recherche (Barre de recherche)
	// si l'utilisateur écrit au moins 3 caractères dans la barre de recherche principale
	// On filtre et modifie le tableau recipesToDisplay[] pour RETIRER les recettes qui n'ont PAS
	//  des mots ou groupes de lettres dans :
	// - le titre
	// - les ingrédients 
	// - les appareils.
	// - La description ou pAS ???? 

	/**
	 * La fonction de recherche de la barre principale.
	 */
	mainSearchInput.addEventListener('keypress', () => {
		if (mainSearchInput.value.length >= 2) {
			recipesToDisplay.sort();
			displayRecipes(recipesToDisplay);
		}
	});

	// TODO : créer filtres 
	// Si l'utilisateur clique sur un mot clef alors :
	//   - On affiche le mot clef dans un badge 
	//   - On n'afficher QUE les RECETTES qui ont des INGREDIENTS ayant des lettres en communs avec la value de l'input du filtre ingrédient
	//   - on RETIRE de recipesToDisplay[] toutes les RECETTES qui ne possède PAS l'INGREDIENT CHOISI EN MOT-CLE
	//   - on appel displayRecipes()


	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
     * remplissage du tableau des ingrédients
     */
	function fillIngArray() {
		recipes.forEach((recipe) => {
			recipe.ingredients.forEach((recipe) => {
				if (!allIngredients.includes(recipe.ingredient)) {
					allIngredients.push(recipe.ingredient);
				}
			});
		});
	}

	/**
     * remplissage du tableau des appareils
     */
	recipes.forEach((recipe) => {
		if (!allAppliances.includes(recipe.appliance)) allAppliances.push(recipe.appliance);
	});

	/**
     * remplissage du tableau des Ustensiles
     */
	recipes.forEach((recipe) => {
		recipe.ustensils.forEach((recipe) => {
			if (!allUstensils.includes(recipe)) allUstensils.push(recipe);
		});
	});

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
     * Modifie le contenu du dropdown selon le contenu du tableau passé en paramètre
     * @param {*} dropdown 
     * @param {*} array 
     */
	function displayItems(dropdown, array) {
		bodyIngre.children[0].innerHTML = '';
		allIngredients.sort();
		allIngredients.forEach((ingredient) => {
			bodyIngre.children[0].insertAdjacentHTML(
				'afterbegin',
				`<div class="filter-item" >
            <a class="ingre-item">${ingredient}</a>
            </div>`
			);
		});
		// TODO faire de même pour les 2 autres filtres / factoriser
		addListenerToKeyworldsFilter();
	}

	// APPAREIL
	allAppliances.sort();
	allAppliances.forEach((appliance) => {
		bodyApp.children[0].insertAdjacentHTML(
			'afterbegin',
			`<div class="filter-item" >
			 <a class="app-item">${appliance}</a>
			 </div>`
		);
	});

	// USTENSILS
	allUstensils.sort();
	allUstensils.forEach((ustensil) => {
		bodyUst.children[0].insertAdjacentHTML(
			'afterbegin',
			`<div class="filter-item" >
        <a class="ust-item">${ustensil}</a>
        </div>`
		);
	});

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
     * ajouter evenemnt d'ecoute de click sur les ingredietns dans le body
     */
	function addListenerToKeyworldsFilter() {
		let ingreItem = document.querySelectorAll('.ingre-item');
		ingreItem.forEach((item) =>
			item.addEventListener('click', () => {
				createIngreBadge(item.innerHTML);
			})
		);
	}

	//appareils
	let appItem = document.querySelectorAll('.app-item');
	appItem.forEach((item) =>
		item.addEventListener('click', () => {
			createAppBadge(item.innerHTML);
		})
	);

	// ajouter evenemnt d'ecoute de click sur les ustentiles dans le body
	let ustItem = document.querySelectorAll('.ust-item');
	ustItem.forEach((item) =>
		item.addEventListener('click', () => {
			createUstBadge(item.innerHTML);
		})
	);

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
     * Créer les badges de filtre quand on choisi un ingredient
     * @param {*} ingredient 
     */
	function createIngreBadge(ingredient) {
		badgeIngre.insertAdjacentHTML(
			'afterbegin',
			`<button type="button" class="btn btn-primary">
            <span class="badge__text">${ingredient}</span> 
            <a class="filter-close">
                <img src="public/logos/logo-cross.svg" class="ml-2" />
            </a>    
        </button>`
		);
		filterClose = document.querySelectorAll('.filter-close');
		addEventListenerFilterClose(ingredient);
	}

	/**
     * Créer les badges de filtre quand on choisi un appliances
     * @param {*} appliances 
     */
	function createAppBadge(appliances) {
		badgeApp.insertAdjacentHTML(
			'afterbegin',
			`<button type="button" class="btn button--green">
            <span class="badge__text">${appliances}</span> 
            <a class="filter-close">
                <img src="public/logos/logo-cross.svg" class="ml-2" />
            </a>    
        </button>`
		);
		filterClose = document.querySelectorAll('.filter-close');
		addEventListenerFilterClose(appliances);
	}

	/**
  * Créer les badges de filtre quand on choisi un ustensils
  * @param {*} ustensils 
  */
	function createUstBadge(ustensils) {
		badgeUst.insertAdjacentHTML(
			'afterbegin',
			`<button type="button" class="btn button--red">
         <span class="badge__text">${ustensils}</span> 
         <a class="filter-close">
             <img src="public/logos/logo-cross.svg" class="ml-2" />
         </a>    
     </button>`
		);
		filterClose = document.querySelectorAll('.filter-close');
		addEventListenerFilterClose(ustensils);
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
     * Retire visuellement le badge de filtre 
	 * + TODO : Reinitialiser le tableau du filtre avec tous les elements (ingredients ou appareil ou ustensiels)   
     * @param {*} filtre 
     */
	function addEventListenerFilterClose(ustensils) {
		filterClose.forEach((item) =>
			item.addEventListener('click', (ev) => {
				closefilter(ev);
				//  réinitialiseLeTableauDe(ustensils)
			})
		);
	}

	function closefilter(ev) {
		const target = ev.target.parentElement.parentElement;
		target.classList.add('d-none');
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
     * Affiche les mots-clés qui correspondent à ce que l'utilisateur recherche dans le filtre
   * @param {*} userInput string
   * @param {*} array le tableau dans lequel itérer
   */
	function filtersSearch(userInput, array = 'main') {
		// TODO : mettre la recherche de l'user sous la forme de majuscule+minuscule : Exemple.

		let tempArray = [],
			iterableArray = [],
			allKeywords = allIngredients.concat(allAppliances).concat(allUstensils);

		switch (array) {
			case 'main':
				iterableArray = allKeywords;
				break;
			case 'Ingredients':
				iterableArray = allIngredients;
				break;
			case 'Appareil':
				iterableArray = allAppliances;
				break;
			case 'Ustensiles':
				iterableArray = allUstensils;
				break;
			default:
				console.log(`Erreur dans le 1er switch de filtersSearch`);
		}
		// le tilde ~ incrémente et rend négatif un résultat.
		// indexOf retourne la position en chiffre (ex 3) dans la phrase de la valeur cherché et si la valeur cherché n’est pas présente il retourne -1.
		// avec le tilde si indexOf ne trouve pas la valeur il va retourner 0 donc notre condition if sera false

		iterableArray.forEach((element) => {
			if (~element.indexOf(userInput)) tempArray.push(element);
		});
		switch (array) {
			case 'main':
				iterableArray = allKeywords;
				break;
			case 'Ingredients':
				allIngredients = tempArray;
				break;
			case 'Appareil':
				allAppliances = tempArray;
				break;
			case 'Ustensiles':
				allUstensils = tempArray;
				break;
			default:
				console.log(`Erreur dans le 2eme switch de filtersSearch`);
		}
	}
}

export { search };
