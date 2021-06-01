function search (recipes) {
    const inputs = document.querySelectorAll('.inputs'),
    bodyIngre = document.getElementById('dropdown-body-Ingredients'),
    bodyApp = document.getElementById('dropdown-body-Appareil'),
    bodyUst = document.getElementById('dropdown-body-Ustensiles'); 

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
                console.log(recipe.ingredient)
                if(recipe.ingredient.includes(value)){
                    result.push(recipe.ingredient)
                }
            })
        })

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