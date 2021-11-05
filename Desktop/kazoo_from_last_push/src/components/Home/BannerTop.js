import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import tcgBanner from '../../../assets/images/tcg-banner.jpeg';

const BannerTop = ({ applyFilters }) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const { height } = Dimensions.get('window');
  return (
    <View style={{ height: height * 0.65 }}>
      <ImageBackground
        source={tcgBanner}
        resizeMode="cover"
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: '15%',
          }}>
          <View
            style={{
              width: '90%',
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <View>
              <Text
                style={{
                  color: 'white',
                  fontSize: RFPercentage(4),
                  fontWeight: 'bold',
                  paddingBottom: 2,
                }}>
                TCG
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: RFPercentage(4),
                  fontWeight: 'bold',
                  paddingBottom: 2,
                }}>
                LOS ANGELES
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: RFPercentage(1.25),
                }}>
                PLACE YOUR FEET IN COMFORT & STYLE
              </Text>
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
        </View>
      </ImageBackground>
    </View>
  );
};

export default BannerTop;
