import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

const dark = '#231F20';

export default StyleSheet.create({
    container: {
      flex: 5,
      alignItems: 'center',
      justifyContent: 'flexStart',
      paddingTop: 100,
    },
    newsContainer: {
      backgroundColor: dark,
      width: 375,
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
      fontSize: 19,
      marginBottom:15,
    },
    recipeCard: {
      flex:1,
      
    },
    logo: {
      backgroundColor: 'grey',
      height: '100%',
      width:'100%', 
      flex:1
    },
    recipeLogoContainer: {
      flexDirection: 'row',
      width:'100%',
      justifyContent:'space-between',
      minHeight:150,
    },
    linearContainer: {
      flex:1,
      height:'100%',
      width:'100%',
    },
    smallArrow: {
      position: 'absolute',
      right: 20,
      bottom: 20,

    },

    starContainer: {
      flexDirection: 'row',
      alignItems:'center'
    },
    recipeDetailsContainer: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailsLogo: {
      backgroundColor: 'grey',
      height: '100%',
      width:'100%', 
      flex:1
    },
    recipeDetailsTitle: {
      flex:3,
      fontWeight: 'bold',
      fontSize: 25,
      margin:12,
      marginTop:15,
    },
    smallClose: {
      width:40,
      height:40,
      position: 'absolute',
      left:     20,
      top:      60,
      tintColor:'white'
    }
    }
    
  );