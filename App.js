import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Pressable, Image, SafeAreaView, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [text, setText] = useState('Scannez le code barre de votre aliment !')
  const [showScan, setShowScan] = useState(false);
  const [arr, setArr] = useState([]);
  const [products, setProducts] = useState([]);
  
  const getProduct = async (code) => {
    let response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}`)
    let data = await response.json()
    console.log('the data is here :', data)

    let arrOfObj = [...products];
    console.log('name', data.product.product_name)
    console.log('image', data.product.image_front_small_url)
    arrOfObj.push({name: data.product.product_name, image: data.product.image_front_small_url});
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
      <Text style={styles.maintext}>{text}</Text>
    </View>
)
  }
  if (showScan === false) {
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.ingredient_list}>
      {products.map((product, index) => {
        return (
          <View style={styles.ingredient_container}>   
          <Image
        style={styles.tinyLogo}
        source={{
          uri: product.image,
        }}
      />       
            <Text style={styles.ingredient_name}>{product.name}</Text>
          </View>
        );
      })}
    </ScrollView>
    <Pressable style={styles.create_button} onPress={addIngredient}><Text style={styles.button_text}>Scanner un article</Text></Pressable>
      </SafeAreaView>
    )
  }

  // Return the View
  return (
    <Text>...</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    color:'black'
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  },
  button_text:{
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
  
    },
    create_button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
      margin: 20,
    },
    ingredient_container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'grey',
      width: 150,
      marginVertical: 10,
    },
    ingredient_name: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    ingredient_list: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      flexWrap:"wrap",
      marginVertical: 10,

    },
    tinyLogo: {
      width: 80,
      height: 50,
    }
  }
);
