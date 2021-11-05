import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Home } from '../../components';
import DataAPIManager from '../../apis/DataAPIManager';
import {
  setUserData,
  setCategories,
  setWishlist,
  setShippingAddress,
  setProducts,
  loadOrderHistory,
  setSelectedCategory,
} from '../../redux/';
import {
  setPinGiftsFor,
  setItemToPin,
  setPinnedItemID,
} from '../../redux/reducers/app';
import AppConfig from '../../ShopertinoConfig';
import Header from '../../components/Headers/Header/Header';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldUpdate: false,
      isProductDetailVisible: false,
      product: {},
    };
    this.appConfig = props.route.params.appConfig;
    this.dataAPIManager = new DataAPIManager(AppConfig);
  }

  componentDidMount() {
    this.loadData();
    this.setShippingAddress();
  }

  componentDidUpdate() {
    if (this.state.shouldUpdate === false && this.props.allProducts.length) {
      this.setState({
        shouldUpdate: true,
      });
    }
  }

  componentWillUnmount() {
    this.dataAPIManager.unsubscribe && this.dataAPIManager.unsubscribe();
  }

  loadData = async () => {
    this.dataAPIManager.loadShopData(({ products, categories }) => {
      if (products) {
        this.loadProducts(products);
      }

      if (categories) {
        this.loadCategories(categories);
      }
    });
  };

  setShippingAddress = () => {
    if (this.props.user.shippingAddress) {
      this.props.setShippingAddress(this.props.user.shippingAddress);
    } else if (this.props.user.shipping) {
      this.props.setShippingAddress(this.props.user.shipping);
    }
  };

  onCardPress = (item) => {
    const newItem = {
      colors: item.colors,
      photo: item.photo,
      description: item.description,
      name: item.name,
      details: item.details,
      id: item.id,
      price: item.price,
      categories: [item.category] || item.categories || [],
      // category: item.category || item.categories[0] || null,
      isFavourite: true,
      sizes: item.sizes || [],
    };
    this.setState({
      product: newItem,
      isProductDetailVisible: !this.state.isProductDetailVisible,
    });
  };

  onCategoryPress = (item) => {
    this.props.navigation.navigate('CategoryProductGrid', {
      title: item.name,
      categoryId: item.id,
      products: item.products,
      appConfig: this.appConfig,
    });
    this.props.setSelectedCategory(item.id);
  };

  onAddToBag = () => {
    this.setState({ isProductDetailVisible: false });
  };

  onModalCancel = () => {
    this.setState({
      isProductDetailVisible: !this.state.isProductDetailVisible,
    });
    // this.props.setItemToPin(null);
    // this.props.setPinGiftsFor(null);
    // this.props.setPinnedItemID(null);
  };

  loadProducts = (products) => {
    this.props.setProducts(products);
  };

  loadCategories = (categories) => {
    this.props.setCategories(categories);
  };

  toggleProductDetailVisible = () => {
    this.setState({
      isProductDetailVisible: !this.state.isProductDetailVisible,
    });
  };

  render() {
    return (
      <>
        <Header navigation={this.props.navigation} route={this.props.route} />
        <Home
          categories={this.props.categories}
          newArrivals={this.props.allProducts}
          featured={this.props.allProducts}
          bestSellers={this.props.allProducts}
          navigation={this.props.navigation}
          shippingMethods={this.props.shippingMethods}
          onCardPress={this.onCardPress}
          wishlist={this.props.wishlist}
          user={this.props.user}
          onCategoryPress={this.onCategoryPress}
          onAddToBag={this.onAddToBag}
          product={this.state.product}
          isProductDetailVisible={this.state.isProductDetailVisible}
          onModalCancelPress={this.onModalCancel}
          appConfig={this.appConfig}
          toggleProductDetailVisible={this.toggleProductDetailVisible}
          giftToPin={this.props.route.params.item}
          friendDocumentID={this.props.route.params.friendDocumentID}
        />
      </>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object,
  categories: PropTypes.array,
  allProducts: PropTypes.array,
  shippingMethods: PropTypes.array,
  user: PropTypes.object,
  stripeCustomer: PropTypes.string,
  wishlist: PropTypes.array,
  setUserData: PropTypes.func,
  setCategories: PropTypes.func,
  setWishlist: PropTypes.func,
  setShippingAddress: PropTypes.func,
  setProducts: PropTypes.func,
};

const mapStateToProps = ({ products, checkout, app }) => {
  return {
    categories: products.categories,
    shoppingBag: products.shoppingBag,
    allProducts: products.allProducts,
    shippingMethods: checkout.shippingMethods,
    user: app.user,
    stripeCustomer: app.stripeCustomer,
    wishlist: app.user.wishlist,
  };
};

export default connect(mapStateToProps, {
  setUserData,
  setCategories,
  setWishlist,
  setShippingAddress,
  setProducts,
  loadOrderHistory,
  setPinGiftsFor,
  setItemToPin,
  setPinnedItemID,
  setSelectedCategory,
})(HomeScreen);
