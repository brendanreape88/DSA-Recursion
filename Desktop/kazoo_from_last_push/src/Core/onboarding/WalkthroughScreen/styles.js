import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 25,
      color: 'white',
    },
    text: {
      fontSize: 25,
      fontStyle: 'italic',
      color: 'white',
      marginHorizontal: '5%',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 1)',
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 2,
      marginBottom: '20%',
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 60,
      tintColor: 'white',
    },
    button: {
      fontSize: 18,
      color: 'white',
      marginTop: 10,
    },
    logo: {
      width: '30%',
      height: '30%',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'red',
    },
    logoImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  });
};

export default dynamicStyles;
