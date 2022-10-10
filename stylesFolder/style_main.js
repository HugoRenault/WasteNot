import { StyleSheet } from 'react-native';

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
    toolbarContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
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
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        margin: 2,
      },
    }
  );