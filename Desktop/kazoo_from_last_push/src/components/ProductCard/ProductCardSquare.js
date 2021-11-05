import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
import heartFilled from '../../../assets/icons/wishlist-filled.png';

function ProductCard(props) {
  const view = useSelector((state) => state.app.profileView);
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { width } = Dimensions.get('window');
  const { onPress, item } = props;
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const activeTab = useSelector((state) => state.app.activeTab);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          height: width * 0.6,
          width: width * 0.45,
          marginRight:
            activeTab === 'notifications' ? width * 0.025 : width * 0.05,
          marginLeft: activeTab === 'notifications' ? width * 0.025 : 0,
          borderColor: 'white',
        }}>
        <View style={[styles.productCardImageConainer]}>
          <View style={{ borderRadius: 5, overflow: 'hidden' }}>
            <Image
              style={{
                width: '100%',
                height: width * 0.45,
                resizeMode: 'contain',
                borderRadius: 5,
                backgroundColor: 'white',
              }}
              source={{ uri: item.photo }}
            />
          </View>
        </View>
        {/* {item.purchased ? (
          <View
            style={[
              styles.productCardImageConainer,
              item.purchased && styles.purchasedProductOverlay,
            ]}
          />
        ) : (
          <></>
        )} */}
        <View style={{ height: 60, padding: 3 }}>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: 'bold',
              fontSize: 11,
              color: themeElementColor,
              textAlign: 'center',
              paddingTop: 5,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              color: themeElementColor,
              fontSize: 11,
              textAlign: 'center',
              paddingTop: 2,
            }}>
            {`$${item.price}.00`}
          </Text>
        </View>
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
