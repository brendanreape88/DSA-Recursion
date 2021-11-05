import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import tcgBannerBottom from '../../../assets/images/tcg-banner-bottom.jpeg';
import tcgLogo from '../../../assets/images/tcg-logo.png';

const BannerBottom = ({ applyFilters }) => {
  const theme = useSelector((state) => state.app.theme);
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const { width } = Dimensions.get('window');
  return (
    <View style={{ height: '23%' }}>
      <ImageBackground
        source={tcgBannerBottom}
        resizeMode="cover"
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              height: width * 0.4,
              width: width * 0.4,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Image
              source={tcgLogo}
              style={{ height: width * 0.275, width: width * 0.175 }}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              applyFilters({
                searchValue: 'TCG',
                sortBy: null,
                colors: [],
                sizing: [],
                gender: [],
                categories: [],
                minPrice: null,
                maxPrice: null,
                minPantsSize: null,
                maxPantsSize: null,
                minShoeSize: null,
                maxShoeSize: null,
                shoeSize: null,
              })
            }
            style={{
              paddingVertical: 10,
              paddingHorizontal: 30,
              backgroundColor: '#4AE0CD',
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: RFPercentage(2),
                fontWeight: 'bold',
              }}>
              Shop
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default BannerBottom;
