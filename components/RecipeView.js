// View w/ name, stars, rating and fading-in image

import { StyleSheet, Text, View } from 'react-native'
import React, { useState} from 'react'

const API_KEY_SPOONACULAR = '3ea3890b95c948f78f365ed1e69b2166';
const API_URL_FIND_BY_INGREDIENTS = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY_SPOONACULAR}`;



///// PARAMETRIZE /////
var ingredients_example = 'apple,flour,eggs,milk,sugar'
var ignorePantry = true
var ranking = 2 // minimize missing ingredients first
var number = 1
///////////////////////

function buildUrl(params){
  return(
    params.url + '&ingredients=' + params.ingredients + '&ignorePantry=' + params.ignorePantry + '&ranking=' + params.ranking + '&number=' + params.number
  )
}

const Recipes = async(flag) => {
  let params = {
    'url' : API_URL_FIND_BY_INGREDIENTS,
    'ingredients' : ingredients_example,
    'ignorePantry' : ignorePantry,
    'ranking' : ranking,
    'number' : number
  }
  var recipesList = []
  recipesList = await fetch(buildUrl(params)).then((data) => {
    flag(true);
    return(data.json())
  });
  return(recipesList)
}

export default function  RecipeView () {
    const [loaded, setIsLoaded] = useState(false)
    objs = Recipes(setIsLoaded)
    if(loaded){
       return(objs.map((obj) => {return(<Text>{obj.title}</Text>)}));
     }
     return(<Text>Loading...</Text>);
}

const styles = StyleSheet.create({})
