import { dropdown } from "./dropdowns";

function search (recipes) {
    const recipesArray = recipes,
    mainSearch = document.getElementById('main-search-bar'),
    inputs = document.querySelectorAll('.inputs'),
    inputIngre = document.getElementById('Ingredients'),
    inputApp = document.getElementById('Appareil'),
    inputUst = document.getElementById('Ustensiles'),
    bodyIngre = document.getElementById('dropdown-body-Ingredients');
    console.log(recipes)


        let listTest = new Array("Bob ", "Alice ", "Ceaser ", "David")
        console.log(listTest)

        bodyIngre.innerHTML = listTest
/*
            recipes.forEach(recette => {
                let UneRecette = recette
                let ingredients = UneRecette.ingredients
                ingredients.forEach(ingredient => {
                    listTest.push(ingredient.ingredient)
                })
            })
        */
 

    /**
     * fonction auto-appelée qui ajoute une evenement d'écoute sur tous les dropdowns
     * quand >= 3 lettres sont écrites dans l'input alors appel researchView() 
     */
    (function inputsKeypressListener(){
        inputs.forEach(inputs => inputs.addEventListener('keypress', (e) => {
            if (e.target.value.length >= 3 ) {researchView(e.currentTarget.value, e.target)}
        }))
    })();

    /**
     *  Appel la fonction recherche et affiche les résultats dans le dropdown body
     * @param {*} inputValue les caractères tapés dans l'input pour effecteur la recherche 
     * @param {*} target l'input à l'origine de la recherche
     */
    function researchView (inputValue, target) {
        researchEngine(inputValue)

        function displayResearch(resultResearch){
         //   console.log(resultResearch)
        }

    }

    /**
     * La fonction de recherche en elle-meme, recupere string et appel la fonction qui affichera le resulat 
     * @param {*} inputValue 
     */
    function researchEngine(inputValue) {
        researchView().displayResearch(result)
    }

}

export {search}