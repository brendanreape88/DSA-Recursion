import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Product from './Product';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { firebase } from '../../Core/firebase/config';
import Arrowhead from '../../../assets/icons/arrowhead-flipped.png';
import { useSelector } from 'react-redux';

const CategoryProducts = ({ category, onCardPress, onCategoryPress }) => {
  const { width } = Dimensions.get('window');
  const [productsForCategory, setProductsForCategory] = useState([]);
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    const productsForCategoryArray = [];
    const productsDB = firebase.firestore().collection('shopertino_products');
    productsDB
      .where('category', '==', category.id)
      .limit(5)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          productsForCategoryArray.push(data);
        });
      })
      .then(() => {
        setProductsForCategory(productsForCategoryArray);
      });
  }, []);

  return (
    <View
      style={{
        paddingLeft: 20,
        paddingVertical: 10,
        backgroundColor: themeBackgroundColor,
      }}>
      <TouchableOpacity
        onPress={() => onCategoryPress(category)}
        style={{
          borderBottomWidth: 1,
          borderColor: '#D9D9D9',
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 10,
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: RFPercentage(2),
            color: themeElementColor,
          }}>
          {category.name}
        </Text>
        <Image
          source={Arrowhead}
          style={{
            marginLeft: 5,
            height: width * 0.03,
            width: width * 0.03,
            tintColor: themeElementColor,
          }}
        />
      </TouchableOpacity>
      <ScrollView horizontal={true}>
        {productsForCategory &&
          productsForCategory.map((product) => (
            <Product
              product={product}
              key={product.id}
              onCardPress={onCardPress}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default CategoryProducts;
