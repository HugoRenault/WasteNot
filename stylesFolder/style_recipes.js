import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import RNU from 'react-native-units'


const dark = '#231F20';

export default StyleSheet.create({
    container: {
      flex: 5,
      alignItems: 'center',
      justifyContent: 'flexStart',
      paddingTop: 100,
    },
    scrollContainer: {
      alignItems: 'center',
      justifyContent: 'flexStart',
      paddingTop: 100,
      paddingBottom:100,
    },
    newsContainer: {
      backgroundColor: dark,
      width: RNU.vw(90),
      color: 'white',
      borderRadius: 24,
      padding: 25,
      marginBottom:10,
    },
    newsContainerNoPadding: {
      backgroundColor: dark,
      width: '90%',
      color: 'white',
      borderRadius: 24,
      overflow:'hidden',
      marginBottom: 20,
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
      flex:0.7,
      margin:25,
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
      flex:1,
    },
    recipeDetailsTitle: {
      fontWeight: 'bold',
      maxWidth:'80%',
      fontSize:30,
      alignSelf:'center',
      marginTop:20,
      fontFamily:'Cochin',
      flex:1,
      width:1,
  
    },
    smallClose: {
      position: 'absolute',
      left:     40,
      top:      70,
      tintColor:'white'
    },
    scrollRecipeDetails: {
      flexDirection:'column',
      alignItems:'center',
      paddingTop:40,
    },
    roundedView: {
      width:'100%', 
      height:53,
      position:'absolute',
      bottom:0,
    },
  
    loading: {
      height: 500,
      width: 500,
    }
    }
    
  );