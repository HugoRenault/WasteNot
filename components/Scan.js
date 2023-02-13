import React, { useState, useEffect } from 'react';
import { Text, View, Button, Pressable, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Ingredient from './Ingredient.js';
import FloatingToolbar from './FloatingToolbar.js';

import styles from '../stylesFolder/style_ingredientsMain.js';

export default function IngredientsMains() {

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@ing', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@ing')
      setProducts(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch(e) {
      // error reading value
    }
  }
  const [hasPermission, setHasPermission] = useState(null);
  const [showScan, setShowScan] = useState(false);
  const [arr, setArr] = useState([]);
  const [products, setProducts] = useState([]);
  
  const getProduct = async (code) => {
    let response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}`)
    let data = await response.json()

    if(data.status_verbose==="product not found"){return}

    let arrOfObj = [...products];
    arrOfObj.push({name: data.product.product_name, image: data.product.image_front_small_url, id:data.code});
    storeData(arrOfObj)
    setProducts(arrOfObj);

  }


  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  const addIngredient = () => {
    setShowScan(true)
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
    getData();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    let arrOfObj = [...arr];
    arrOfObj.push(data);
    setArr(arrOfObj);
    setShowScan(false)

    getProduct(data)

    Alert.alert("L'ingrédient a été ajouté avec succès");

  };

  const clear = () => {
    setProducts([])
    storeData([])

  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }
  
  if (showScan === true) {
    return (
      <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={{ height: 400, width: 400, backgroundColor:'black' }} />
      </View>
      <Text style={styles.maintext}>Scannez le code barre de votre aliment !</Text>
      <Pressable style={styles.create_button} onPress={() => setShowScan(false)}><Text style={styles.button_text}>Annuler</Text></Pressable>
    </View>
)
  }
  if (showScan === false) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.ingredient_list}>
          {products.map((product, index) => {
            return (
              <Ingredient product={product}/>
            );
          })}
        </ScrollView>
        <Pressable style={[styles.create_button,{}]} onPress={addIngredient}><Text style={styles.button_text}>Scanner un article</Text></Pressable>
        <Pressable style={[styles.create_button,{marginBottom:50}]} onPress={clear}><Text style={styles.button_text}>Clear</Text></Pressable>

      </SafeAreaView>
    )
  }
}