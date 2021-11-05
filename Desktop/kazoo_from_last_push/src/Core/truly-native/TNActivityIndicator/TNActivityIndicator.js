import React from 'react';
import { View, Text } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { UIActivityIndicator } from 'react-native-indicators';
import dynamicStyles from './styles';
import { useSelector } from 'react-redux';

const TNActivityIndicator = (props) => {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(props.appStyles, colorScheme);
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';

  return (
    <View style={{ backgroundColor: 'transparent', ...styles.container }}>
      <View style={styles.indicatorContainer}>
        <UIActivityIndicator
          color="#f5f5f5"
          size={30}
          animationDuration={400}
        />
        {props.text && props.text.length > 1 && (
          <Text style={styles.text}>{props.text}</Text>
        )}
      </View>
    </View>
  );
};

export default TNActivityIndicator;
