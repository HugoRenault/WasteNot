// The fridge with all ingredients and scanner 

import React, { useState, useEffect } from 'react';
import { Text, View, Button, Pressable, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';


import styles from '../stylesFolder/style_fridge.js';

export default function IngredientsMains() {

  const storeData = async (value) => { //Async Storage storing data
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@ing', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => { //Async Storage getting data
    try {
      const jsonValue = await AsyncStorage.getItem('@ing')
      if (jsonValue == null){
        setProducts([])
      }
      else {      
        setProducts(jsonValue != null ? JSON.parse(jsonValue) : null);
      }
    } catch(e) {
      // error reading value
    }
  }
  const [hasPermission, setHasPermission] = useState(null); //permission for camera
  const [showScan, setShowScan] = useState(false); //switch to scan view
  const [products, setProducts] = useState([]); //list of ingredients



  const askForCameraPermission = () => { // ask camera permission
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }
  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
    getData();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => { //when bar code is scanned

    setShowScan(false)

    getProduct(data) // get Product from barcode 

    Alert.alert("L'ingrédient a été ajouté avec succès");

  };
   function deleteIngredient(name) {
    array = [...products]
    console.log(name)
    array = array.filter((ingredient) => ingredient.name !== name)
    storeData(array)

    setProducts(array)
    }
    
  const getProduct = async (code) => {  //with the code request open food facts to get data
    let response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}`)
    let data = await response.json()

    if(data.status_verbose==="product not found"){return}

    let arrOfObj = [...products];
    arrOfObj.push({name: data.product.product_name, image: data.product.image_front_small_url, id:data.code}); // push scanned product to existing list
    storeData(arrOfObj) // store the list of ingredients
    setProducts(arrOfObj);

  }



  function Ingredient(props) { //style for each ingredient 
    return (
      <Pressable onLongPress={()=>deleteIngredient(props.product.name)} >
<View style={styles.ingredient_container} key={props.product.id}>   
      <Image
          style={styles.tinyLogo}
          source={{
            uri: props.product.image,
          }}
        />   
        <View style={{display:'flex', flex:1, justifyContent:'center'}}>
        <Text style={styles.ingredient_name}>{props.product.name}</Text>
        </View>
      </View>
      </Pressable>
      
    )
  }

  if (hasPermission === null) { //if not yet asked, request camera permission
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) { //if no camera permission 
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }
  
  if (showScan === true) { //scanner view
    return (
      <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={{ height: 400, width: 400, backgroundColor:'black' }} />
      </View>
      <Text style={styles.maintext}>Scan your item!</Text>
      <Pressable style={styles.create_button} onPress={() => setShowScan(false)}><Text style={styles.button_text}>Annuler</Text></Pressable>
    </View>
)
  }
  if (showScan === false) { //fridge view
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.ingredient_list}>
          {products.map((product, index) => { //for each ingredient in list show this style with data 
            return (
              <Ingredient product={product}/>
            );
          })}
        </ScrollView>
        <Pressable style={[styles.create_button,{marginBottom:50}]} onPress={()=>setShowScan(true)}><Text style={styles.button_text}>Scan your item</Text></Pressable>
      </SafeAreaView>
    )
  }
}