import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Wishlist } from '../../components';
import { setWishlist } from '../../redux/';

class WishlistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProductDetailVisible: false,
      product: {},
      view: props.route.params.view || 'current user',
      otherUserID: props.route.params.otherUserID || null,
      otherUser: props.route.params.otherUser || null,
    };
    this.appConfig = props.route.params.appConfig;
  }

  onAddToBag = () => {
    this.setState({ isProductDetailVisible: false });
  };

  onCardPress = (item, purchaseFromWishlistID) => {
    this.setState({
      product: { purchaseFromWishlistID: purchaseFromWishlistID, ...item },
      isProductDetailVisible: !this.state.isProductDetailVisible,
    });
  };

  onModalCancel = () => {
    this.setState({
      isProductDetailVisible: !this.state.isProductDetailVisible,
    });
  };

  render() {
    return (
      <>
        <Wishlist
          shippingMethods={this.props.shippingMethods}
          onCardPress={this.onCardPress}
          product={this.state.product}
          onAddToBag={this.onAddToBag}
          onModalCancel={this.onModalCancel}
          user={this.props.user}
          isProductDetailVisible={this.state.isProductDetailVisible}
          appConfig={this.appConfig}
          navigation={this.props.navigation}
          isCurrentUser={this.props.isCurrentUser}
          view={this.state.view}
          otherUserID={this.state.otherUserID}
          otherUser={this.state.otherUser}
        />
      </>
    );
  }
}

WishlistScreen.propTypes = {
  user: PropTypes.object,
  wishlist: PropTypes.array,
  shippingMethods: PropTypes.array,
  setWishlist: PropTypes.func,
};

const mapStateToProps = ({ products, app, checkout }, ownProps) => {
  let user = app.user;
  if (ownProps.route.params.selectedFriendId) {
    user =
      app.friends.find(
        (item) => item.id === ownProps.route.params.selectedFriendId,
      ) || user;
  }
  return {
    user,
    wishlist: app.user.wishlist,
    shippingMethods: checkout.shippingMethods,
    stripeCustomer: app.stripeCustomer,
    isCurrentUser: user.id === app.user.id,
  };
};

export default connect(mapStateToProps, {
  setWishlist,
})(WishlistScreen);
