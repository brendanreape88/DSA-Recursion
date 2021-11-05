import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import ProductCard from '../ProductCard/ProductCard';
import ProductCardSquare from '../ProductCard/ProductCardSquare';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useColorScheme } from 'react-native-appearance';
import { useSelector } from 'react-redux';
import dynamicStyles from './styles';

const { width } = Dimensions.get('window');

function ProductGrid(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const {
    products,
    ListFooterComponent,
    itemContainerStyle,
    ListEmptyComponent,
    purchaseFromWishlistID,
  } = props;
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const categories = useSelector((state) => state.products.categories);
  const [categoryName, setCategoryName] = useState(null);
  const categoryId = useSelector((state) => state.app.selectedCategory);
  const activeTab = useSelector((state) => state.app.activeTab);
  const showCategoryTitle =
    categoryName && products.length > 0 && activeTab === 'shop' ? true : false;

  useEffect(() => {
    if (categoryId) {
      const foundCategory = categories.find((cat) => cat.id === categoryId);
      setCategoryName(foundCategory.name);
    }
  }, [categoryId, categories]);

  const renderProductCardSquare = ({ item, index }) => (
    <ProductCardSquare
      key={index}
      item={item}
      appConfig={props.appConfig}
      onPress={() => props.onCardPress(item, purchaseFromWishlistID)}
      cardConainerStyle={{ width: 0.41 * width }}
    />
  );

  return (
    <View
      style={{
        backgroundColor: themeBackgroundColor,
        ...styles.container,
        paddingLeft: 5,
      }}>
      {showCategoryTitle && (
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: RFPercentage(4),
                color: themeElementColor,
                paddingBottom: 2,
              }}>
              {categoryName}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: RFPercentage(1.25),
              color: themeElementColor,
            }}>
            Purchase the latest items for your friends
          </Text>
        </View>
      )}
      <FlatGrid
        data={products}
        extraData={products}
        itemDimension={0.41 * width}
        itemContainerStyle={itemContainerStyle}
        renderItem={renderProductCardSquare}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        purchaseFromWishlistID={purchaseFromWishlistID}
      />
    </View>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
  ListFooterComponent: PropTypes.any,
  itemContainerStyle: PropTypes.object,
  navigation: PropTypes.func,
  onCardPress: PropTypes.func,
};

export default ProductGrid;
