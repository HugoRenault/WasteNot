import { StyleSheet } from 'react-native';
import RNU from 'react-native-units'

const dark = '#231F20';

export default StyleSheet.create({
    carouselContainer: {
        // TODO : finish carousel
    },
    container: {
      flex: 5,
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
        borderRadius: 16,
        elevation: 0,
        backgroundColor: dark,
        margin: 20,
      },
      ingredient_container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 12,
        paddingHorizontal: 32,
        borderRadius:24,
        elevation: 3,
        backgroundColor: dark,
        width: 160,
        marginVertical: 10,
      },
      ingredient_name: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        alignSelf:'center'
      },
      ingredient_list: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap:"wrap",
        marginVertical: 10,
  
      },
      tinyLogo: {
        width:100,
        height: 70,
        position: 'relative',
        bottom: 15,
        borderRadius:24,
      }
    }
  );