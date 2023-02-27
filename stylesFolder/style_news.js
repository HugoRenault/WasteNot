import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

const dark = '#231F20';

export default StyleSheet.create({
    container: {
      flex: 5,
      alignItems: 'center',
      justifyContent: 'flexStart',
      height:300,
      paddingTop: 80,
    },
    newsContainer: {
      backgroundColor: dark,
      width: '90%',
      minHeight: 100,
      color: 'white',
      borderRadius: 24,
      padding: 25,
      margin: 10,
    },
    text: {
      color:'white',
      fontSize: 16,
    },
    title: {
      color:'white',
      fontWeight: 'bold',
      fontSize: 22,
      marginBottom:15

    },

    logo : {
      marginBottom:30,
      width: 120,
      height: 120,
    }
    
    }
  );