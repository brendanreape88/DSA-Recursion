import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
import AppConfig from '../../ShopertinoConfig';
import heartFilled from '../../../assets/icons/wishlist-filled.png';

function ProductCard(props) {
  const view = useSelector((state) => state.app.profileView);
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { cardConainerStyle, onPress, item } = props;
  const theme = useSelector((state) => state.app.theme);
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          borderColor: themeElementColor,
          ...styles.productCardConainer,
          ...cardConainerStyle,
        }}>
        <View style={[styles.productCardImageConainer]}>
          <Image style={styles.productCardImage} source={{ uri: item.photo }} />
        </View>
        {item.purchased ? (
          <View
            style={[
              styles.productCardImageConainer,
              item.purchased && styles.purchasedProductOverlay,
            ]}
          />
        ) : (
          <></>
        )}
        <Text
          style={{ color: themeElementColor, ...styles.productCardDescription }}
          numberOfLines={2}>
          {item.name}
        </Text>
        <Text
          style={{
            color: themeElementColor,
            ...styles.productCardPrice,
          }}>{`${AppConfig.currency}${item.price}`}</Text>
      </TouchableOpacity>
      {view === 'current user' && (
        <Image source={heartFilled} style={styles.favorite} />
      )}
    </>
  );
}

ProductCard.propTypes = {
  cardConainerStyle: PropTypes.object,
  item: PropTypes.object,
  onPress: PropTypes.func,
};

export default ProductCard;
