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
				`<div class="grid-item cut-text">
				<div class="grid-img">
					<img class="img" src="public/img/img.png" />
				</div>
				<div class="grid-content container-fluid p-4">
					<div class="row mb-3">
						<div class="grid-title col-sm">
							${recipe.name}
						</div>
						<div class="grid-timer col-sm d-flex justify-content-end my-auto">
							<img src="public/logos/logo-clock.svg" class="mr-1" />
							${recipe.time} min
						</div>
					</div>
					<div class="row d-flex">
						<div class="grid-ingredient cut-text col-5">
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
						<div class="grid-recipe cut-text col-7">
						${recipe.description}
						</div>
					</div>
				</div>
			</div>`
			);
		});
	}
	

	/**
	 * If user writes in a input, call filterSearch()
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

	/**
	 * If user writes at least 3 characters in the main search bar, call recipesToDisplay()
	 */
	function addMainSearchEvent() {
		mainSearchInput.addEventListener('keyup', function(e) {
			recipeNotFound()
			if (mainSearchInput.value.length >= 2) {
				mainSearch(mainSearchInput.value)

			}
			if ((mainSearchInput.value.length <= 2) && (e.key === 'Backspace')) {
				recipesToDisplay = recipes
				filterRecipes()
				displayRecipes(recipesToDisplay)
			}
		});
	}

	/** Main bar search function
	 * Call displayRecipes() to display recipes which contain the input in title, ingredients, appliances and ustensils.
	 * @param {*} request string user input
	 */
	function mainSearch(request) {
		filterRecipes()
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
	 * Sort the source-tables of keywords, to keep only the keywords of the recipes passed in parameter 
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
	* Create HTML of keywords in dropdowns 
	* @param {*} dropdown that receives the keywords 
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
		 * Add event listenner on click for the keywords
		 */
		function addListenerOnKeywords() {
			const ingreItem = document.querySelectorAll('.ingre-item'),
				appItem = document.querySelectorAll('.app-item'),
				ustItem = document.querySelectorAll('.ust-item'),
				items = [ingreItem, appItem, ustItem];
			items.forEach(index => {
				index.forEach((item) =>
					item.addEventListener('click', () => {
						createBadge(item.innerHTML, item.classList[0])
					})
				);
			})
		}
		addListenerOnKeywords();
	}


		/**
		 * Filter recipes according to the selecte filters + call displayRecipes()
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
	 * Generate HTML of the badges/filters when you choose an ing, ust or app
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
		mainSearch(mainSearchInput.value)
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
	 * Delete (the html of) badge and call the functions to adjust the  
	 * list of keywords available in the dropdown's filter and display recipes
	 * @param {*} ev 
	 */
	function closefilter(ev) {
		const target = ev.target.parentElement.parentElement;
		target.remove();
		manageKeywords()
		filterRecipes();
		mainSearch(mainSearchInput.value)
		displayRecipes();
		filterKeywords();
	}

	/**
	* Modify the keywords contains in dropdowns according to the research carried out 
   * @param {*} userInput string
   * @param {*} array in wich we iterate
   */
	function filtersSearch(userInput, array = 'main') {
		// Make the 1st letter of user inout uppercase and the rest lowercase
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
		// ~ increments and multiply by -1.
		// indexOf return the sought position by a number (ex 3). If the value is not found return -1.
		// Thanks to the tilde indexOf return 0 instead of -1 so the if condition will be false

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
 * Display a warning to the user that the search was unsucessful
 */
function recipeNotFound() {
	/* const text = document.createElement('div')
	text.classList.add('recipe-not-found')
	text.innerText = "Aucune recette ne correspond à votre critère… vous pouvez chercher 'tarte aux pommes', 'poisson' ... "
	document.body.append(text)*/
	if (grid.hasChildNodes() === false) alert("Aucune recette ne correspond à votre critère… vous pouvez chercher 'tarte aux pommes', 'poisson' ...")
}


export { search };