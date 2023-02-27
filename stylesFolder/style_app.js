import { StyleSheet } from 'react-native';
import RNU from 'react-native-units'

const dark = '#231F20';
const toolbarHeight = 42;
const iconHeight = 24;

export default StyleSheet.create({
    carouselContainer: {
        // TODO : finish carousel
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    toolBarContainer: {
      position: 'absolute',
      bottom: 20,
      width: RNU.vw(100),
      height: toolbarHeight,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    toolbar: {

      backgroundColor: 'white',
      alignItems: 'center',
      alignSelf:'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      backgroundColor: dark, // desaturate
      height: toolbarHeight, // Switch to RNU
      width: RNU.vw(81), //RNU.vw(61)
      borderRadius:50,
    },
    circle: {
      width: 55,
      height: 55,
      borderRadius: 55/2,
      backgroundColor: dark,
      flexDirection: 'ro',
      alignContent: 'center',
      justifyContent: 'center',
    },
    noCircle: {
    
    },
    toolIcon: {
      width:iconHeight,
      height:iconHeight,
      tintColor:"white",// comme Walter
      marginLeft:4,
    },
    maintext: {
      fontSize: 16,
      margin: 20,
      color:'black'
    },
    button_text:{
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    
      },
      create_button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height:51.25,
        width:51.25, // sqrt(2*32^2) + 6
        backgroundColor: "",
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
      },
    }
  );
