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
		myItemsFiltered = [];

	/**
	* Document ready
	*/
	document.addEventListener('DOMContentLoaded', function () {
		filterKeywords();
		displayRecipes();
		addMainSearchEvent();
		manageInputs();
		manageKeywords();
		recipeNotFound()
	});

	
	/**
	 * Display the recipes passed in parameter
	 * @param {*} array 
	 */
	function displayRecipes(array = recipesToDisplay) {
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
	

	/**
	 * Si l'utilisateur écrit dans un inputs appel filterSearch()
	 */
		 function manageInputs() {
			inputs.forEach((input) => {
				input.addEventListener('keyup', () => {
					if (input.value.length > 2) filtersSearch(input.value, input.id)
					if (input.value.length <= 2) {
						filterKeywords()
						manageKeywords()
					}
				});
				input.addEventListener('click', () => {
					input.value = ''
				})
			});
		}

	// Si l'utilisateur écrit au moins 3 caractères dans la barre de recherche principale
	// Appel la fonction de recherche principale : addMainSearchEvent()
	function addMainSearchEvent() {
		mainSearchInput.addEventListener('keyup', () => {
			recipeNotFound()
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
		filterRecipes()
		// TODO c recipesToDisplay[] quon modifie
		// on test ing puis app puis ust => pour être + rapide algo de division pour mainSearch
		// ENFIN SURTOUT faudrait FILTRER
		/*
		1) fitlerRecipes() filtre affiche et modifie recipesToDisplay[]
		2) ICI dans cette fonction on FILTRE SUR recipesToDisplay[] puis on displayRecipe(recipesToDisplay)
		*/
		let goodRecipes = []
		recipesToDisplay.forEach(recipe => {
			// titre
			if (recipe.name.indexOf(request) >= 0) {
				if (!goodRecipes.includes(recipe)) goodRecipes.push(recipe)
			} 
			// ustensils
			recipe.ustensils.forEach(ustensil => {
				if (ustensil.indexOf(request) >= 0){
					if (!goodRecipes.includes(recipe)) goodRecipes.push(recipe)
				} 
			})
			// appareils
			if (recipe.appliance.indexOf(request) >= 0){
				if (!goodRecipes.includes(recipe)) goodRecipes.push(recipe)
			}
			// ingredients
			recipe.ingredients.forEach(ingredient => {
				if (ingredient.ingredient.indexOf(request) >= 0) goodRecipes.push(recipe)
			})
		})
		recipesToDisplay = goodRecipes
		filterKeywords()
		displayRecipes()
	}

	/**
	 * Tri les tableaux sources de mots-clés de chaque filtre, pour ne garder que les mots-clés 
	 * issus de l'objet recettes passés en paramètre 
	 */
	function filterKeywords(recipes = recipesToDisplay) {
		// Ingrédients
		function fillIngArray() {
			allIngredients = []
			recipes.forEach((recipe) => {
				recipe.ingredients.forEach((recipe) => {
					if (!allIngredients.includes(recipe.ingredient)) allIngredients.push(recipe.ingredient)
				});
			});
		}
		// Appareils
		function fillAppArray() {
			allAppliances = []
			recipes.forEach((recipe) => {
		 		if (!allAppliances.includes(recipe.appliance)) allAppliances.push(recipe.appliance);
		 	})
		}
		// Ustensiles
		function fillUstArray() {
			allUstensils = []
			recipes.forEach((recipe) => {
				recipe.ustensils.forEach((recipe) => {
					if (!allUstensils.includes(recipe)) allUstensils.push(recipe);
				});
			});
		}
		fillAppArray()
		fillIngArray()
		fillUstArray()
		manageKeywords()
	}


	/**
	* Créer le html des keywords des filtres et les ajoutes dans leurs dropdowns 
	* @param {*} dropdown le dropdown qui va recevoir les mots-clés 
	*/
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
		 * ajouter l'evenement d'ecoute 'click' sur badges de mots-clefs :
		 */
		function addListenerOnKeywords() {
			const ingreItem = document.querySelectorAll('.ingre-item'),
				appItem = document.querySelectorAll('.app-item'),
				ustItem = document.querySelectorAll('.ust-item'),
				items = [ingreItem, appItem, ustItem];
			items.forEach(index => {
				index.forEach((item) =>
					item.addEventListener('click', (e) => {
						createBadge(item.innerHTML, item.classList[0])
					})
				);
			})
		}
		addListenerOnKeywords();
	}


		/**
		 * Filtre les recettes selon les filtres selectionnés + appel displayRecipes()
		 */
		function filterRecipes() {
			// Create an array containing all filters (keywords) as name / type objects
			myItemsFiltered = [];
			recipesToDisplay = recipes;
			let badges = document.querySelectorAll('.badge-item')
			badges.forEach(badge => {
				let type
				if (badge.classList.contains('badge-ing')) type = 'ing'
				if (badge.classList.contains('badge-app')) type = 'app'
				if (badge.classList.contains('badge-ust')) type = 'ust'
				myItemsFiltered.push({ name: badge.innerText, type: type })
			})
			// Search for each recipe if it is good (true) to be shown
			recipesToDisplay = recipesToDisplay.filter(recipe => {
				// A recipe is true if one of its components matches an item in the 'myItemsFiltered' array
				return myItemsFiltered.reduce((acc, item) => {
					if (acc) {
						// If the item is an ingredient we look for in the ingredients of the recipes ...
						if (item.type === 'ing') {
							for (const ingredient of recipe.ingredients) {
								acc = (ingredient.ingredient.trim().toLowerCase()) == (item.name.trim().toLowerCase())
							 	if (acc) return acc
							}
							if (acc) return acc
						}
						// If the item is an ingredient we look for in the ingredients of the appliances ...
						if (item.type === 'app') {
								acc = (recipe.appliance.trim().toLowerCase()) == (item.name.trim().toLowerCase())
								if (acc) return acc
						}
						// If the item is an ingredient we look for in the ingredients of the ustensils ...
						if (item.type === 'ust') {
							for (const ust of recipe.ustensils) {
								acc = (ust.trim().toLowerCase()) == (item.name.trim().toLowerCase())
								if (acc) return acc
							}
						}
						return acc
					}
				}, true)
			})
		}

	/**
	 * Génère le HTML des badges de filtre quand on choisi un ingredient
	 * @param {*} item 
	 * @param {*} type 
	 */
	function createBadge(item, type) {
		let btnColor, div, badgeType
		if (type === 'ingre-item') {
			btnColor = 'btn-primary'
			div = badgeIngre
			badgeType = 'badge-ing'
		} else if (type === 'app-item') {
			btnColor = 'button--green'
			badgeType = 'badge-app'
			div = badgeApp
		} else if (type === 'ust-item') {
			btnColor = 'button--red'
			div = badgeUst
			badgeType = 'badge-ust'
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
		filterRecipes()
		filterKeywords()
		displayRecipes()
	}

	/**
	 * Bind each filter close-buttons with close event
	 */
	function addEventListenerFilterClose() {
		filterClose.forEach((item) =>
			item.addEventListener('click', (ev) => {
				closefilter(ev);
			})
		);
	}

	/**
	 * Supprime (le html du) badge et appel les fonctions pour ajuster la 
	 * liste des mots-clés disponibles dans le dropdown du filtre et affichage des recettes
	 * @param {*} ev 
	 */
	function closefilter(ev) {
		const target = ev.target.parentElement.parentElement;
		target.remove();
		manageKeywords()
		filterRecipes();
		displayRecipes();
		filterKeywords();
	}

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

/**
 * If there are no recipes displayed on screen, then displays a message
 */
function recipeNotFound() {
	if (grid.hasChildNodes() == false) alert("Aucune recette ne correspond à votre critère… vous pouvez chercher 'tarte aux pommes', 'poisson' ... ")
}

export { search };