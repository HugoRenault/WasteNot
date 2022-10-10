import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    carouselContainer: {
        // TODO : finish carousel
    },
    container: {
      flex: 5,
      backgroundColor: 'white',
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