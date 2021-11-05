import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Profile } from '../../components';
import DataAPIManager from '../../apis/DataAPIManager';
import deviceStorage from '../../utils/deviceStorage';
import { logout } from '../../redux';
import { setWishlist } from '../../redux/';
import getBirthdayCountdown from '../BirthdayPartyScreen/getBirthdayCountdown';
import Moment from 'moment';
import ProductDetailModal from '../../components/Modals/ProductDetailModal/ProductDetailModal';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProductDetailVisible: false,
      product: {},
    };
    this.appConfig = props.route.params.appConfig;
    this.dataAPIManager = new DataAPIManager(this.appConfig);
  }

  onLogout = async () => {
    await deviceStorage.logoutDeviceStorage();
    await this.dataAPIManager?.logout();
    await this.props.logout();
    this.onItemPress('LoginStack');
  };

  onItemPress = (routeName, title) => {
    this.props.navigation.navigate(routeName, {
      title: title ? title : routeName,
      appConfig: this.appConfig,
    });
  };

  onAddToBag = () => {
    this.setState({ isProductDetailVisible: false });
  };

  onCardPress = (item, purchaseFromWishlistID) => {
    const newItem = {
      colors: item.colors,
      photo: item.photo,
      description: item.description,
      name: item.name,
      details: item.details,
      id: item.id || item.productID,
      price: item.price,
      categories: item.categories || [],
      isFavourite: true,
      purchased: item.recipient ? true : false,
      purchaseFromWishlistID: purchaseFromWishlistID,
    };

    this.setState({
      product: newItem,
      isProductDetailVisible: !this.state.isProductDetailVisible,
    });
  };

  onModalCancel = () => {
    this.setState({
      isProductDetailVisible: !this.state.isProductDetailVisible,
    });
  };

  render() {
    if (this.props.route.params.userFromSearch) {
      const birthdate = this.props.route.params.userFromSearch.birthdate;
      const momentBirthdate = Moment(birthdate, 'MM/DD/YYYY');
      const birthdateDisplay = momentBirthdate.format('MMM D');
      momentBirthdate.year(new Date().getFullYear());

      if (momentBirthdate.isBefore(new Date())) {
        momentBirthdate.add(1, 'year');
      }

      const birthdayCountdown = getBirthdayCountdown(momentBirthdate.toDate());

      this.props.route.params.userFromSearch[
        'birthdateDisplay'
      ] = birthdateDisplay;
      this.props.route.params.userFromSearch[
        'birthdayCountdown'
      ] = birthdayCountdown;
    }

    return (
      <>
        <Profile
          onLogout={this.onLogout}
          onItemPress={this.onItemPress}
          navigation={this.props.navigation}
          shippingMethods={this.props.shippingMethods}
          onCardPress={this.onCardPress}
          product={this.state.product}
          onAddToBag={this.onAddToBag}
          onModalCancel={this.onModalCancel}
          isProductDetailVisible={this.state.isProductDetailVisible}
          appConfig={this.appConfig}
          route={this.props.route}
          previousOtherUser={this.props.route.params.previousOtherUser}
          previousProfileView={this.props.route.params.previousProfileView}
        />

        <ProductDetailModal
          item={this.state.product}
          shippingMethods={this.props.shippingMethods}
          visible={this.state.isProductDetailVisible}
          onFavouritePress={this.props.onFavouritePress}
          wishlist={this.props.wishlist}
          user={this.props.user}
          onAddToBag={this.onAddToBag}
          onCancelPress={this.onModalCancel}
          appConfig={this.appConfig}
          navigation={this.props.navigation}
          orderAPIManager={this.props.route.params.orderAPIManager}
        />
      </>
    );
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
  isCurrentUser: PropTypes.bool,
};

const mapStateToProps = ({ app, checkout }, ownProps) => {
  let user = app.user;
  if (ownProps.route.params.selectedFriendId) {
    user =
      app.friends.find(
        (item) => item.id === ownProps.route.params.selectedFriendId,
      ) || user;
  }
  return {
    user,
    isCurrentUser: user.id === app.user.id,
    wishlist: app.user.wishlist,
    shippingMethods: checkout.shippingMethods,
    stripeCustomer: app.stripeCustomer,
  };
};

export default connect(mapStateToProps, { logout, setWishlist })(ProfileScreen);
