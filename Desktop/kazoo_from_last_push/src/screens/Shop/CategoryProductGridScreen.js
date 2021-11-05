import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { ProductGrid, ProductDetailModal } from '../../components';
import styles from './styles';
import AppStyles from '../../AppStyles';
import { Appearance } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { TNEmptyStateView } from '../../Core/truly-native';
import { firebase } from '../../Core/firebase/config';
import Header from '../../components/Headers/Header/Header';
import RecommendedProducts from '../../components/Home/RecommendedProducts';

class CategoryProductGridScreen extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.navThemeConstants[colorScheme];
    const { route } = props;
    props.navigation.setOptions({
      headerBackTitle: IMLocalized('Shop'),
      title:
        typeof route.params === 'undefined' ||
        typeof route.params.title === 'undefined'
          ? IMLocalized('Cartegory Grid')
          : route.params.title,
      headerTintColor: currentTheme.fontColor,

      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      },
    });
    this.state = {
      isProductDetailVisible: false,
      product: {},
      categoryProducts: [],
      categoryIdString: '',
    };

    this.appConfig = props.route.params.appConfig;
    this.categoryProducts = route.params.products;
    this.categoryId = route.params.categoryId;
    this.emptyStateConfig = {
      title: IMLocalized('Empty Category'),
      description: IMLocalized(
        'There are no products for this category. Please check back later',
      ),
      buttonName: IMLocalized('Go back'),
      onPress: () => this.props.navigation.goBack(),
    };
  }

  componentDidMount() {
    if (this.categoryProducts && this.categoryProducts.length) {
      this.setState({ categoryProducts: this.categoryProducts });
      this.setState({ categoryIdString: this.categoryId });
    } else {
      this.getCategoryProducts(this.categoryId);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.route.params.categoryId !== this.props.route.params.categoryId
    ) {
      this.getCategoryProducts(this.props.route.params.categoryId);
      this.setState({ categoryIdString: this.props.route.params.categoryId });
    }
  }

  getCategoryProducts = (categoryId) => {
    const categoryProductsArray = [];
    const categoryProductsRef = firebase
      .firestore()
      .collection('shopertino_products');
    categoryProductsRef
      .where('category', '==', categoryId)
      .orderBy('name')
      .orderBy('price')
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          categoryProductsArray.push(doc.data());
        });
      })
      .then(() => {
        this.setState({ categoryProducts: categoryProductsArray });
      });
  };

  onCardPress = (item) => {
    const newItem = {
      colors: item.colors || null,
      sizes: item.sizes || null,
      photo: item.photo,
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
    this.setState({
      //product: item,
      product: newItem,
      isProductDetailVisible: !this.state.isProductDetailVisible,
    });
  };

  onAddToBag = () => {
    this.setState({ isProductDetailVisible: false });
  };

  renderEmptyList = () => {
    return (
      <View style={styles.emptyViewContainer}>
        <TNEmptyStateView
          appStyles={AppStyles}
          emptyStateConfig={this.emptyStateConfig}
        />
      </View>
    );
  };

  render() {
    const { extraData, categoryTitle } = this.props;
    const themeBackgroundColor =
      this.props.theme === 'dark' ? 'black' : 'white';
    const themeElementColor = this.props.theme === 'dark' ? 'white' : 'black';

    return (
      <View
        style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
        <Header
          navigation={this.props.navigation}
          route={this.props.route}
          passedTitle={categoryTitle}
        />
        <View style={{ flex: 1 }}>
          {this.props.showKazooCash && (
            <View
              style={{
                position: 'absolute',
                right: 9,
                top: 8,
                borderWidth: 1,
                borderColor: '#E5606E',
                borderRadius: 20,
                backgroundColor: themeBackgroundColor,
                zIndex: 100,
                padding: 5,
              }}>
              <Text style={{ color: themeElementColor }}>
                ${this.props.kazooCashBalance}
              </Text>
            </View>
          )}
          <ScrollView style={{ flex: 1 }}>
            {this.state.categoryProducts.length > 0 && (
              <RecommendedProducts onCardPress={this.onCardPress} />
            )}
            <ProductGrid
              products={this.state.categoryProducts}
              onCardPress={this.onCardPress}
              itemContainerStyle={{ alignItems: 'center' }}
              extraData={extraData}
              appConfig={this.appConfig}
              ListEmptyComponent={this.renderEmptyList()}
            />
            <ProductDetailModal
              shippingMethods={this.props.shippingMethods}
              item={this.state.product}
              visible={this.state.isProductDetailVisible}
              wishlist={this.props.wishlist}
              user={this.props.user}
              onAddToBag={this.onAddToBag}
              onCancelPress={() =>
                this.setState({
                  isProductDetailVisible: !this.state.isProductDetailVisible,
                })
              }
              appConfig={this.appConfig}
              navigation={this.props.navigation}
              orderAPIManager={this.props.route.params.orderAPIManager}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

CategoryProductGridScreen.propTypes = {
  title: PropTypes.string,
  CategoryProductGridScreen: PropTypes.array,
  navigation: PropTypes.object,
  extraData: PropTypes.object,
  allProducts: PropTypes.array,
  user: PropTypes.object,
  wishlist: PropTypes.array,
  shippingMethods: PropTypes.array,
};

const mapStateToProps = ({ products, app, checkout }, ownProps) => {
  return {
    theme: app.theme,
    allProducts: products.allProducts,
    user: app.user,
    showKazooCash: app.showKazooCash,
    kazooCashBalance: app.kazooCashBalance,
    wishlist: app.user.wishlist,
    shippingMethods: checkout.shippingMethods,
    categoryTitle: (
      products.categories.find(
        (cat) => cat.id === ownProps.route.params.categoryId,
      ) || {}
    ).name,
  };
};

export default connect(mapStateToProps)(CategoryProductGridScreen);
