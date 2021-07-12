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
		allUstensils = [],
		recipesfiltered = [],
		badgesIng, badgesApp, badgesUst;

	/**
	* Document ready
	*/
	document.addEventListener('DOMContentLoaded', function () {
		fillFiltersArrays();
		displayRecipes(recipesToDisplay);
		addMainSearchEvent();
		manageInputs();
		manageKeywords();
	});
	/**
	 * Affiche à l'écran dans la grid de l'affichage principal, 
	 * toutes les recettes contenu dans le tableau passé en parametre
	 * (Par défaut le fichier recipes.js)
	 * @param {*} array 
	 */
	function displayRecipes(array = recipes) {
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

	// si l'utilisateur écrit au moins 3 caractères dans la barre de recherche principale
	// on appel la fonction de recherche principale : addMainSearchEvent()
	function addMainSearchEvent () {
		mainSearchInput.addEventListener('keyup', () => {
			if (mainSearchInput.value.length >= 2) {
				mainSearch(mainSearchInput.value)
			}
		});
	}
	/** Fonction recherche de la barre principale
	 * Appel displayRecipes() pour afficher les recettes qui n'ont
	 * des mots ou groupes de lettres dans :
	 * Le titre
	 * Les ingrédients
	 * Les appareils
	 * Les ustensile
	 * @param {*} request string user input
	 */
	function mainSearch(request) {
		// on test ing puis app puis ust => pour être + rapide algo de division pour mainSearch
		let goodRecipes = []
		recipes.forEach(recipe => {
			// titre
			if (recipe.name.indexOf(request) >= 0 ) goodRecipes.push(recipe)
			// ustensils
			recipe.ustensils.forEach(ustensil => {
				if(ustensil.indexOf(request) >= 0) goodRecipes.push(recipe)
			})
			// appareils
			if (recipe.appliance.indexOf(request) >=0 ) goodRecipes.push(recipe)
			// ingredients
			recipe.ingredients.forEach(ingredient => {
				if (ingredient.ingredient.indexOf(request) >=0 ) goodRecipes.push(recipe)
			})
		})
		displayRecipes(goodRecipes)
	}

	/**
	 * Si l'user saisi dans un inputs appel filterSearch()
	 */
	function manageInputs() {
		inputs.forEach((input) => {
			input.addEventListener('keyup', () => {
				if (input.value.length > 2) filtersSearch(input.value, input.id)
				if (input.value.length <= 2) {
					fillFiltersArrays()
					manageKeywords()
				}
			});
			input.addEventListener('click', () => {
				input.value = ''
			})
		});
	}


	/**
	 * Rempli les tableaux sources des mots-clés avec tous les mots-clés par défaut contenu dans recipes.js
	 */
	function fillFiltersArrays() {
		// Ingrédients
		function fillIngArray() {
			recipes.forEach((recipe) => {
				recipe.ingredients.forEach((recipe) => {
					if (!allIngredients.includes(recipe.ingredient)) {
						allIngredients.push(recipe.ingredient);
					}
				});
			});
		}
		// Appareils
		function fillAppArray() {
			recipes.forEach((recipe) => {
				if (!allAppliances.includes(recipe.appliance)) allAppliances.push(recipe.appliance);
			});
		}

		// Ustensiles
		function fillUstArray() {
			recipes.forEach((recipe) => {
				recipe.ustensils.forEach((recipe) => {
					if (!allUstensils.includes(recipe)) allUstensils.push(recipe);
				});
			});
		}
		fillAppArray()
		fillIngArray()
		fillUstArray()

	}


	// /**
	//  * Ajoute les keywords dans les filtres 
	//  * @param {*} dropdown le dropdown qui va recevoir les mots-clés 
	//  */
	function manageKeywords(dropdown = 'all') {
		switch (dropdown) {
			case 'ing':
				displayIng()
				break;
			case 'app':
				displayApp()
				break;
			case 'Ust':
				displayUst()
				break;
			case 'all':
				displayIng()
				displayApp()
				displayUst()
				break;
			default:
				console.log(`Erreur dans le switch de displayItems()`);
		}

		// ingredients
		function displayIng() {
			allIngredients.sort();
			bodyIngre.children[0].innerHTML = '';
			allIngredients.forEach((ingredient) => {
				bodyIngre.children[0].insertAdjacentHTML(
					'afterbegin',
					`<div class="filter-item" >
                <a class="ingre-item">${ingredient}</a>
                </div>`
				);
			});
		}

		// APPAREIL
		function displayApp() {
			allAppliances.sort();
			bodyApp.children[0].innerHTML = ''
			allAppliances.forEach((appliance) => {
				bodyApp.children[0].insertAdjacentHTML(
					'afterbegin',
					`<div class="filter-item" >
                     <a class="app-item">${appliance}</a>
                     </div>`
				);
			});
		}

		// USTENSILS
		function displayUst() {
			allUstensils.sort();
			bodyUst.children[0].innerHTML = '';
			allUstensils.forEach((ustensil) => {
				bodyUst.children[0].insertAdjacentHTML(
					'afterbegin',
					`<div class="filter-item" >
                <a class="ust-item">${ustensil}</a>
                </div>`
				);
			});
		}


		/**
		 * ajouter evenemnt d'ecoute sur les mots-clefs qui :
		 * - Appel la fonction : createIngreBadge()  pour créer un badge de filtre corespondant à l'ingredient cliqué
		 * - Appel la fonction : filterArray() qui Filtre le tableaux recipesToDisplay() pour enlever les recettes qui n'ont pas l'ingredient 
		 */
		function addEventsOnKeywords() {
			const ingreItem = document.querySelectorAll('.ingre-item'),
			appItem = document.querySelectorAll('.app-item'),
			ustItem = document.querySelectorAll('.ust-item'),
			items = [ingreItem, appItem, ustItem];
			items.forEach(index => {
				index.forEach((item) =>
					item.addEventListener('click', (e) => {
						createBadge(item.innerHTML, item.classList[0])
						filterArray(e.target.innerText, e.path[0]);
					})
				);
			})
		}
		addEventsOnKeywords();
	}


	/**
	 * Modifie le contenu des tableau de keywords selon la saisi de l'user passé en paramètre
	 * Et le tableau des recettes à afficher
	 */
	function filterArray() {
		// switch (array.classList.value) {
		// 	case 'ingre-item':
		// 		filterIng(item);
		// 		break;
		// 	case 'app-item':
		// 		filterApp(item);
		// 		break;
		// 	case 'ust-item':
		// 		filterUst(item);
		// 		break;
			
		// 	default:
		// 		console.log(`Erreur dans le switch de filterArray()`);
		// }
		filter()
		function filter() {
			let myItemsFiltered = []
			let badges = document.querySelectorAll('.badge-item')
			 badges.forEach(badge => {
				myItemsFiltered.push(badge.innerText)
			 })





			 	let dataToShow = recipes.filter(recipe => {
					let	toShow
					toShow = myItemsFiltered.reduce((acc, item)=> {
							// Une recherche pour les ingrédients
							recipe.ingredients.forEach(ingredient => {
								acc = (ingredient.ingredient.trim().toLowerCase()) == (item.trim().toLowerCase())
								if (acc) return acc
							})
							if (!acc) {
								// Une recherche pour les apps
								acc = (recipe.appliance.trim().toLowerCase()) == (item.trim().toLowerCase())
								if (acc) return acc
								// Une recherche pour les ust
								if (!acc) {
									recipe.ustensils.forEach(ustensil => {
									 	acc = (ustensil.trim().toLowerCase()) == (item.trim().toLowerCase())
										if (acc) return acc
									})
								}
							}
						return acc
					}, true)
					return toShow
				 })
		}








		// Appareils
		function filterApp(item) {
			recipesToDisplay.forEach((recipe) => {
				if (item === recipe.appliance) {
					recipesfiltered.push(recipe);
					displayRecipes(recipesfiltered)
				}
			});
		}
		// Ust
		function filterUst(item) {
			recipesToDisplay.forEach((recipe) => {
				recipe.ustensils.forEach(ust => {
					if (item === ust) {
						recipesfiltered.push(recipe);
						displayRecipes(recipesfiltered)
					}
				})
			});
		}

	}


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * Créer les badges de filtre quand on choisi un ingredient
	 * @param {*} ingredient 
	 */

	function createBadge(item, type) {
		let btnColor, div, badgeType
		if (type === 'ingre-item') {
			btnColor = 'btn-primary'
			div = badgeIngre
			badgeType = 'badge-ing'
			manageKeywords('ing')
		} else if (type === 'app-item') {
			btnColor = 'button--green'
			badgeType = 'badge-app'
			div = badgeApp
		} else if (type === 'ust-item') {
			btnColor = 'button--red'
			div = badgeUst
			badgeType = 'badge-app'
		}
		div.insertAdjacentHTML(
			'afterbegin',
			`<button type="button" class="btn badge-item ${btnColor} ${badgeType}">
            <span class="badge__text">${item}</span> 
            <a class="filter-close">
                <img src="public/logos/logo-cross.svg" class="ml-2" />
            </a>    
        </button>`
		);
		filterClose = document.querySelectorAll('.filter-close');
		addEventListenerFilterClose(item);
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * Retire visuellement le badge de filtre 
	 * @param {*} filtre 
	 */
	function addEventListenerFilterClose() {
		filterClose.forEach((item) =>
			item.addEventListener('click', (ev) => {
				closefilter(ev);
			})
		);
	}

	/**
	 * Supprime le badge
	 * @param {*} ev 
	 */
	function closefilter(ev) {
		const target = ev.target.parentElement.parentElement;
		target.classList.add('d-none');
		fillFiltersArrays();
		displayRecipes()
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// FILTER SEARCH ///////////
	//////////////////////////////
	/**
	 * Affiche les mots-clés qui correspondent à ce que l'utilisateur recherche dans le filtre
   * @param {*} userInput string
   * @param {*} array le tableau dans lequel itérer
   */
	function filtersSearch(userInput, array = 'main') {
		// Rend la 1er lettre de la saisie utilisateur en majuscule et le reste en miniscule
		let userInputLow = userInput.toLowerCase(),
		input = userInputLow.charAt(0).toUpperCase() + 
		userInputLow.slice(1);

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
			if (~element.indexOf(input)) tempArray.push(element);
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
		manageKeywords();
	}
}

export { search };