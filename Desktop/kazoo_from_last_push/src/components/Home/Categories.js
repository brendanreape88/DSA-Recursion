import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import CategoryCard from '../CategoryCard/CategoryCard';
import { firebase } from '../../Core/firebase/config';
import AppConfig from '../../ShopertinoConfig';
import { useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { FlatGrid } from 'react-native-super-grid';

function Categories(props) {
  const [categories, setCategories] = useState([]);
  const categoriesPreview = categories;
  categories.length = 6;
  const { width } = Dimensions.get('window');
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    const categoriesArray = [];
    const categoriesFromDB = firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.CATEGORIES);
    categoriesFromDB
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          categoriesArray.push(data);
        });
      })
      .then(() => {
        setCategories(categoriesArray);
      });
  }, []);

  return (
    categories && (
      <View
        style={{
          // paddingLeft: 20,
          paddingVertical: 10,
          backgroundColor: themeBackgroundColor,
        }}>
        <View
          style={{
            paddingBottom: 10,
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: RFPercentage(4),
              color: themeElementColor,
              paddingLeft: 5,
              paddingBottom: 2,
            }}>
            Categories
          </Text>
          <Text
            style={{
              fontSize: RFPercentage(1.25),
              color: themeElementColor,
              paddingLeft: 5,
            }}>
            Browse our wide selection of products and services
          </Text>
        </View>
        <FlatGrid
          itemDimension={width * 0.45}
          data={categoriesPreview}
          style={{
            flex: 1,
          }}
          spacing={5}
          renderItem={({ item }) => (
            <CategoryCard
              item={item}
              onCategoryPress={() => props.onCategoryPress(item)}
            />
          )}
        />
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Categories')}
            style={{
              width: 100,
              alignItems: 'center',
              paddingTop: 5,
            }}>
            <Text
              style={{
                color: themeElementColor,
                textDecorationLine: 'underline',
                textDecorationColor: themeElementColor,
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  onCategoryPress: PropTypes.func,
  navigation: PropTypes.object,
};

export default Categories;
