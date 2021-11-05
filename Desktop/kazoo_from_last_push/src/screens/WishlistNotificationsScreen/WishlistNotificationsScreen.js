import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WishlistNotificationsHeader from './WishlistNotificationsHeader';
import Notifications from './Notifications';
import { Wishlist } from '../../components';
import { connect } from 'react-redux';
import { setWishlist } from '../../redux/';

class WishlistNotificationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProductDetailVisible: false,
      product: {},
      view: 'notifications',
      userView: props.route.params.view || 'current user',
    };
    this.appConfig = props.route.params.appConfig;
  }

  onAddToBag = () => {
    this.setState({ isProductDetailVisible: false });
  };

  onCardPress = (item) => {
    this.setState({
      product: item,
      isProductDetailVisible: !this.state.isProductDetailVisible,
    });
  };

  onModalCancel = () => {
    this.setState({
      isProductDetailVisible: !this.state.isProductDetailVisible,
    });
  };

  onChangeToNotifications = () => {
    if (this.state.view === 'notifications') {
      return;
    }
    this.setState({
      view: 'notifications',
    });
  };

  onChangeToWishlist = () => {
    if (this.state.view === 'wishlist') {
      return;
    }
    this.setState({
      view: 'wishlist',
    });
  };

  render() {
    return (
      <>
        <WishlistNotificationsHeader
          onChangeToWishlist={this.onChangeToWishlist}
          onChangeToNotifications={this.onChangeToNotifications}
          view={this.state.view}
        />
        {this.state.view === 'wishlist' && (
          <Wishlist
            data={this.props.wishlist}
            shippingMethods={this.props.shippingMethods}
            onCardPress={this.onCardPress}
            product={this.state.product}
            onAddToBag={this.onAddToBag}
            onModalCancel={this.onModalCancel}
            wishlist={this.props.wishlist}
            user={this.props.user}
            isProductDetailVisible={this.state.isProductDetailVisible}
            appConfig={this.appConfig}
            navigation={this.props.navigation}
            view={this.state.userView}
            otherUserID={this.state.otherUserID}
            screen={'wishlistNotifications'}
          />
        )}
        {this.state.view === 'notifications' && (
          <Notifications
            navigation={this.props.navigation}
            appStyles={this.props.appStyles}
          />
        )}
      </>
    );
  }
}

WishlistNotificationsScreen.propTypes = {
  user: PropTypes.object,
  //wishlist: PropTypes.array,
  shippingMethods: PropTypes.array,
  setWishlist: PropTypes.func,
};

const mapStateToProps = ({ app, checkout }) => {
  return {
    user: app.user,
    friends: app.friends,
    wishlist: app.user.wishlist,
    shippingMethods: checkout.shippingMethods,
    stripeCustomer: app.stripeCustomer,
  };
};

export default connect(mapStateToProps, { setWishlist })(
  WishlistNotificationsScreen,
);
