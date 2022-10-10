import React, { useState, useEffect } from 'react';
import { Text, View, Button, Pressable, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import Ingredient from './Ingredient.js';
import FloatingToolbar from './FloatingToolbar.js';

import styles from '../stylesFolder/style_ingredientsMain.js';

export default function IngredientsMains() {
  const [hasPermission, setHasPermission] = useState(null);
  const [showScan, setShowScan] = useState(false);
  const [arr, setArr] = useState([]);
  const [products, setProducts] = useState([]);
  
  const getProduct = async (code) => {
    let response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}`)
    let data = await response.json()
    console.log('the data is here :', data)

    if(data.status_verbose==="product not found"){return}

    let arrOfObj = [...products];
    console.log('name', data.product.product_name)
    console.log('image', data.product.image_front_small_url)
    arrOfObj.push({name: data.product.product_name, image: data.product.image_front_small_url, id:data.code});
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
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    console.log('Type: ' + type + '\nData: ' + data)
    let arrOfObj = [...arr];
    arrOfObj.push(data);
    setArr(arrOfObj);
    console.log(data)
    setShowScan(false)

    getProduct(data)
    Alert.alert("L'ingrédient a été ajouté avec succès");
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
          style={{ height: 400, width: 400 }} />
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
    <Pressable style={styles.create_button} onPress={addIngredient}><Text style={styles.button_text}>Scanner un article</Text></Pressable>

      </SafeAreaView>
    )
  }
}