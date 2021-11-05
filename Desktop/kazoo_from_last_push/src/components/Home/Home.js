import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileView } from '../../redux/reducers/app';
import { updateFilteredProducts } from '../../redux/reducers/products';
import { useColorScheme } from 'react-native-appearance';
import BannerTop from './BannerTop';
import BannerBottom from './BannerBottom';
import Categories from './Categories';
import FilterAndSearch from './FilterAndSearch';
import Filters from './Filters';
import RecommendedProducts from './RecommendedProducts';
import ProductDetailModal from '../Modals/ProductDetailModal/ProductDetailModal';
import { firebase } from '../../Core/firebase/config';
import AppConfig from '../../ShopertinoConfig';
import dynamicStyles from './styles';
import AppStyles from '../../AppStyles';
import { useIsFocused } from '@react-navigation/native';

function Home(props) {
  const route = useRoute();
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const {
    navigation,
    categories,
    newArrivals,
    shippingMethods,
    onModalCancelPress,
    onAddToBag,
    wishlist,
    user,
    isProductDetailVisible,
    product,
    appConfig,
    toggleProductDetailVisible,
    giftToPin,
    onCardPress,
    friendDocumentID,
  } = props;
  const pinGiftsFor = useSelector((state) => state.app.pinGiftsFor);
  const [shortProductsList, setShortProductsList] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const showKazooCash = useSelector((state) => state.app.showKazooCash);
  const kazooCash = useSelector((state) => state.app.kazooCashBalance);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    const productsArray = [];
    const productsFromDB = firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.PRODUCTS);
    productsFromDB
      .limit(5)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          productsArray.push(data);
        });
      })
      .then(() => {
        setShortProductsList(productsArray);
      });
  }, []);

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    dispatch(setProfileView(null));
    if (giftToPin) {
      const modifiedGiftToPin = {
        ...giftToPin,
        pinned: true,
        friendDocumentID: friendDocumentID,
      };
      onCardPress(modifiedGiftToPin);
    }
  }, [isFocused, dispatch, friendDocumentID, giftToPin, onCardPress]);

  if (!newArrivals.length) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          color={AppStyles.colorSet[colorScheme].mainThemeForegroundColor}
        />
      </View>
    );
  }

  const applyFilters = async (filtersProfile) => {
    if (!filtersProfile) {
      return;
    }
    const productsArray = [];
    let productsQuery = firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.PRODUCTS);
    if (filtersProfile.minPrice) {
      productsQuery = productsQuery.where(
        'price',
        '>=',
        filtersProfile.minPrice,
      );
    }
    if (filtersProfile.maxPrice) {
      productsQuery = productsQuery.where(
        'price',
        '<=',
        filtersProfile.maxPrice,
      );
    }
    if (filtersProfile.colors.length) {
      productsQuery = productsQuery.where(
        'colors',
        'array-contains-any',
        filtersProfile.colors,
      );
    }
    if (filtersProfile.sortBy === 'Low-Hi') {
      productsQuery = productsQuery.orderBy('price', 'asc');
    }
    if (filtersProfile.sortBy === 'Hi-Low') {
      productsQuery = productsQuery.orderBy('price', 'desc');
    }
    productsQuery
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          productsArray.push(data);
        });
      })
      .then(() => {
        const filteredProductsArray = productsArray.filter((prod) => {
          let returnValue = true;
          if (filtersProfile.searchValue) {
            returnValue = prod.name
              .toLowerCase()
              .includes(filtersProfile.searchValue.toLowerCase());
          }
          if (returnValue && filtersProfile.categories.length) {
            returnValue =
              filtersProfile.categories.indexOf(prod.category) !== -1;
          }
          if (returnValue && filtersProfile.sizing.length) {
            returnValue = filtersProfile.sizing.some(
              (size) => prod.sizes?.length && prod.sizes.includes(size),
            );
          }
          if (returnValue && filtersProfile.minShoeSize) {
            returnValue = prod.sizes?.some(
              (size) => size >= filtersProfile.minShoeSize,
            );
          }
          if (returnValue && filtersProfile.minShoeSize) {
            returnValue = prod.sizes?.some(
              (size) => size <= filtersProfile.minShoeSize,
            );
          }
          return returnValue;
        });

        dispatch(updateFilteredProducts(filteredProductsArray));
        navigation.navigate('Filtered Products');
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: themeBackgroundColor }}>
      {showKazooCash && (
        <View
          style={{
            position: 'absolute',
            right: 9,
            top: '1.5%',
            borderWidth: 1,
            borderColor: '#E5606E',
            borderRadius: 20,
            backgroundColor: themeBackgroundColor,
            zIndex: 100,
            padding: 5,
            marginRight: 3,
          }}>
          <Text style={{ color: themeElementColor }}>${kazooCash}</Text>
        </View>
      )}
      <ScrollView style={{ backgroundColor: themeBackgroundColor, flex: 1 }}>
        <FilterAndSearch
          setShowFilters={setShowFilters}
          applyFilters={applyFilters}
        />
        <BannerTop applyFilters={applyFilters} />
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          applyFilters={applyFilters}
        />
        <Categories
          navigation={navigation}
          categories={categories}
          onCategoryPress={props.onCategoryPress}
        />
        <RecommendedProducts onCardPress={props.onCardPress} screen={'home'} />
        <BannerBottom applyFilters={applyFilters} />
        <View style={{ height: 200 }} />
      </ScrollView>
      <ProductDetailModal
        item={product}
        shippingMethods={shippingMethods}
        visible={isProductDetailVisible}
        wishlist={wishlist}
        user={user}
        onAddToBag={onAddToBag}
        onCancelPress={onModalCancelPress}
        appConfig={appConfig}
        navigation={navigation}
        orderAPIManager={route.params.orderAPIManager}
        pinGiftsFor={pinGiftsFor}
        isProductDetailVisible={isProductDetailVisible}
        toggleProductDetailVisible={toggleProductDetailVisible}
      />
    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.object,
  categories: PropTypes.array,
  newArrivals: PropTypes.array,
  bestSellers: PropTypes.array,
  featured: PropTypes.array,
  user: PropTypes.object,
  wishlist: PropTypes.array,
  shippingMethods: PropTypes.array,
  stripeCustomer: PropTypes.string,
  onCardPress: PropTypes.func,
  onCategoryPress: PropTypes.func,
  onAddToBag: PropTypes.func,
  product: PropTypes.object,
  onModalCancelPress: PropTypes.func,
  isProductDetailVisible: PropTypes.bool,
};

export default Home;
