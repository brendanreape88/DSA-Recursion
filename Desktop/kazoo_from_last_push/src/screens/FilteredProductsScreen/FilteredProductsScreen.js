import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../../components/Headers/Header/Header';
import { ProductGrid, ProductDetailModal } from '../../components';
import { RFPercentage } from 'react-native-responsive-fontsize';

const FilteredProductsScreen = (props) => {
  const [isProductDetailVisible, setIsProductDetailVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const appConfig = props.route.params.appConfig;
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts,
  );
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  const onCardPress = (item) => {
    const newItem = {
      colors: item.colors,
      photo: item.photo,
      sizes: item.sizes,
      description: item.description,
      name: item.name,
      details: item.details,
      id: item.id,
      price: item.price,
      categories: [item.category] || item.categories || [],
      // category: item.category || item.categories[0] || null,
      isFavourite: true,
      // purchased: itemInGifts ? true : false,
    };
    setProduct(newItem);
    setIsProductDetailVisible(!isProductDetailVisible);
  };

  const onAddToBag = () => {
    setIsProductDetailVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header navigation={props.navigation} route={props.route} />
      {filteredProducts.length === 0 ? (
        <View
          style={{
            flex: 1,
            backgroundColor: themeBackgroundColor,
            justifyContent: 'center',
            alignContent: 'center',
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              color: '#545454',
              fontWeight: 'bold',
              fontSize: RFPercentage(3),
              textAlign: 'center',
            }}>
            No products matched your search.
          </Text>
        </View>
      ) : (
        <>
          <ProductGrid
            products={filteredProducts}
            onCardPress={onCardPress}
            itemContainerStyle={{ alignItems: 'center' }}
            // extraData={extraData}
            appConfig={appConfig}
          />
          <ProductDetailModal
            shippingMethods={props.shippingMethods}
            item={product}
            visible={isProductDetailVisible}
            wishlist={props.wishlist}
            user={props.user}
            onAddToBag={onAddToBag}
            onCancelPress={() =>
              setIsProductDetailVisible(!isProductDetailVisible)
            }
            appConfig={appConfig}
            navigation={props.navigation}
            orderAPIManager={props.route.params.orderAPIManager}
          />
        </>
      )}
    </View>
  );
};

export default FilteredProductsScreen;
