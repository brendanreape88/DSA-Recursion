import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import search from '../../../assets/icons/search.png';
import { useSelector } from 'react-redux';

const FilterAndSearch = ({ setShowFilters, applyFilters }) => {
  const { width, height } = Dimensions.get('window');
  const [searchValue, setSearchValue] = useState('');
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const themeSearchBarBackgroundColor =
    theme === 'dark' ? '#2B2B2B' : '#D9D9D9';
  const themeSearchBarElementColor = theme === 'dark' ? '#979797' : '#545454';
  return (
    <View
      style={{
        // borderWidth: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: themeBackgroundColor,
      }}>
      <TouchableOpacity
        onPress={() => setShowFilters(true)}
        style={{
          borderWidth: 1,
          borderColor: themeElementColor,
          // paddingHorizontal: 10,
          // paddingVertical: 5,
          height: '70%',
          width: '18%',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: themeElementColor,
            fontSize: RFPercentage(2),
            fontWeight: 'bold',
          }}>
          Filters
        </Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: themeSearchBarBackgroundColor,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderRadius: 8,
          width: '80%',
          height: '70%',
          paddingHorizontal: 10,
        }}>
        <Image
          source={search}
          style={{
            tintColor: themeSearchBarElementColor,
            height: width * 0.05,
            width: width * 0.05,
          }}
        />
        <TextInput
          style={{
            borderRadus: 8,
            backgroundColor: themeSearchBarBackgroundColor,
            padding: 10,
            width: '80%',
            color: themeElementColor,
            fontSize: 12,
          }}
          placeholder={'Search'}
          placeholderTextColor={themeSearchBarElementColor}
          onChangeText={(text) => setSearchValue(text)}
          onSubmitEditing={() =>
            applyFilters({
              searchValue: searchValue,
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
          value={searchValue}
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
};

export default FilterAndSearch;
