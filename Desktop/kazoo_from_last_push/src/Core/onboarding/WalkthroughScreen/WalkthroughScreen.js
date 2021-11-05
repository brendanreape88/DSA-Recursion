import React, { useLayoutEffect } from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import AppIntroSlider from 'react-native-app-intro-slider';
import deviceStorage from '../utils/AuthDeviceStorage';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { IMLocalized } from '../../localization/IMLocalization';
import { RFPercentage } from 'react-native-responsive-fontsize';

const WalkthroughScreen = (props) => {
  const { navigation, route } = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const { width } = Dimensions.get('window');

  const slides = appConfig.onboardingConfig.walkthroughScreens.map(
    (screenSpec, index) => {
      return {
        key: index,
        text: screenSpec.description,
        title: screenSpec.title,
        icon: screenSpec.icon,
        image: screenSpec.image,
      };
    },
  );

  const _onDone = () => {
    deviceStorage.setShouldShowOnboardingFlow('false');
    if (appConfig.isDelayedLoginEnabled) {
      navigation.navigate('DelayedHome');
      return;
    }
    navigation.navigate('LoginStack', { screen: 'Welcome' });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const _renderItem = ({ item }) => (
    <>
      <StatusBar hidden />
      <ImageBackground source={item.image} style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <View
            style={{
              height: width * 0.18,
              width: width * 0.18,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: item.title === 'Welcome' ? '#4AE0CD' : 'transparent',
              padding: 10,
              borderRadius: 65,
              marginBottom: 20,
            }}>
            <Image
              style={{
                tintColor: '#4AE0CD',
                height: '100%',
                width: '100%',
                resizeMode: 'contain',
              }}
              source={item.icon}
            />
          </View>
          <Text
            style={{
              fontSize: RFPercentage(4),
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 20,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: RFPercentage(2.5),
              color: 'white',
              paddingHorizontal: '5%',
              textAlign: 'center',
              lineHeight: 30,
            }}>
            {item.text}
          </Text>
          {item.title === 'Welcome' && (
            <Text
              style={{
                fontSize: RFPercentage(2.5),
                color: 'white',
                paddingHorizontal: '5%',
                textAlign: 'center',
                lineHeight: 30,
              }}>
              ...Birthdays!
            </Text>
          )}
        </View>
      </ImageBackground>
    </>
  );

  const _renderNextButton = () => {
    return <Text style={styles.button}>{IMLocalized('Next')}</Text>;
  };

  const _renderSkipButton = () => {
    return <Text style={styles.button}>{IMLocalized('Skip')}</Text>;
  };

  const _renderDoneButton = () => {
    return <Text style={styles.button}>{IMLocalized('Done')}</Text>;
  };

  return (
    <AppIntroSlider
      data={slides}
      slides={slides}
      onDone={_onDone}
      renderItem={_renderItem}
      //Handler for the done On last slide
      showSkipButton={true}
      onSkip={_onDone}
      renderNextButton={_renderNextButton}
      renderSkipButton={_renderSkipButton}
      renderDoneButton={_renderDoneButton}
    />
  );
};

WalkthroughScreen.propTypes = {
  navigation: PropTypes.object,
};

export default WalkthroughScreen;
