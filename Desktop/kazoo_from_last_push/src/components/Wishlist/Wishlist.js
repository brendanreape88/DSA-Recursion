import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';
import ProductGrid from '../ProductGrid/ProductGrid';
import ProductDetailModal from '../Modals/ProductDetailModal/ProductDetailModal';
import ProfileHeader from '../Headers/ProfileHeader/ProfileHeader';
import ProfileImageCard from '../Profile/ProfileImageCard';
import styles from './styles';
import firebase from 'firebase';
import { RFPercentage } from 'react-native-responsive-fontsize';

function Wishlist(props) {
  const {
    navigation,
    extraData,
    onCardPress,
    product,
    onAddToBag,
    onModalCancel,
    onFavouritePress,
    user,
    shippingMethods,
    isProductDetailVisible,
    appConfig,
    view,
    screen,
  } = props;

  const route = useRoute();
  const currentUser = useSelector((state) => state.app.user);
  const currentUserWishlist = useSelector((state) => state.app.wishlist);
  const profileView = useSelector((state) => state.app.profileView);
  const otherUser = useSelector((state) => state.app.otherUser);
  const [otherUserWishlist, setOtherUserWishlist] = useState([]);
  const fetchData =
    profileView === 'friend' || profileView === 'following' ? true : false;
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    if (fetchData) {
      const wishlistDB = firebase
        .firestore()
        .collection(`users/${otherUser.id}/wishlist`);
      return wishlistDB.onSnapshot((snapshot) =>
        setOtherUserWishlist(
          snapshot?.docs?.map((doc) => ({ id: doc?.id, ...doc?.data() })),
        ),
      );
    }
  }, [fetchData, otherUser.id]);

  const renderEmptyList = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: themeBackgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: RFPercentage(3),
            color: themeElementColor,
          }}>
          Wishlist is currently empty.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {profileView === 'current user' && (
        <>
          {screen !== 'wishlistNotifications' && (
            <>
              <ProfileHeader
                navigation={navigation}
                currentUser={currentUser}
                view={view}
              />
              <ProfileImageCard user={currentUser} view={view} />
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: themeBackgroundColor,
                  paddingTop: 5,
                }}>
                <View
                  style={{
                    width: '60%',
                    // height: 35,
                    borderBottomWidth: 1,
                    borderColor: '#34B6A6',
                    justifyContent: 'center',
                    backgroundColor: themeBackgroundColor,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#34B6A6',
                      fontSize: RFPercentage(4),
                      paddingBottom: 5,
                    }}>
                    Wishlist
                  </Text>
                </View>
              </View>
            </>
          )}
          {currentUserWishlist.length ? (
            <ProductGrid
              products={currentUserWishlist}
              onCardPress={onCardPress}
              itemContainerStyle={{ alignItems: 'center' }}
              extraData={extraData}
              appConfig={appConfig}
              ListEmptyComponent={renderEmptyList()}
            />
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: themeBackgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: RFPercentage(3),
                  color: themeElementColor,
                }}>
                Wishlist is currently empty.
              </Text>
            </View>
          )}
          <ProductDetailModal
            item={product}
            shippingMethods={shippingMethods}
            visible={isProductDetailVisible}
            onFavouritePress={onFavouritePress}
            wishlist={currentUserWishlist}
            user={user}
            onAddToBag={onAddToBag}
            onCancelPress={onModalCancel}
            appConfig={appConfig}
            navigation={navigation}
            orderAPIManager={route.params.orderAPIManager}
          />
        </>
      )}

      {fetchData && (
        <>
          <ProfileHeader
            navigation={navigation}
            otherUser={otherUser}
            view={view}
          />
          <ProfileImageCard user={otherUser} view={view} />
          <View
            style={{
              alignItems: 'center',
              backgroundColor: themeBackgroundColor,
              paddingTop: 5,
            }}>
            <View
              style={{
                width: '60%',
                // height: 35,
                borderBottomWidth: 1,
                borderColor: '#34B6A6',
                justifyContent: 'center',
                backgroundColor: themeBackgroundColor,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#34B6A6',
                  fontSize: RFPercentage(4),
                  paddingBottom: 5,
                }}>
                Wishlist
              </Text>
            </View>
          </View>
          {otherUserWishlist.length ? (
            <ProductGrid
              products={otherUserWishlist}
              onCardPress={onCardPress}
              itemContainerStyle={{ alignItems: 'center' }}
              extraData={extraData}
              appConfig={appConfig}
              ListEmptyComponent={renderEmptyList()}
              purchaseFromWishlistID={otherUser.id}
            />
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: RFPercentage(3),
                  color: '#545454',
                }}>
                Wishlist is currently empty.
              </Text>
            </View>
          )}
          <ProductDetailModal
            item={product}
            shippingMethods={shippingMethods}
            visible={isProductDetailVisible}
            onFavouritePress={onFavouritePress}
            wishlist={currentUserWishlist}
            user={user}
            onAddToBag={onAddToBag}
            onCancelPress={onModalCancel}
            appConfig={appConfig}
            navigation={navigation}
            orderAPIManager={route.params.orderAPIManager}
          />
        </>
      )}
    </View>
  );
}

Wishlist.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  navigation: PropTypes.func,
  extraData: PropTypes.object,
  user: PropTypes.object,
  wishlist: PropTypes.array,
  shippingMethods: PropTypes.array,
  stripeCustomer: PropTypes.string,
  onCardPress: PropTypes.func,
  product: PropTypes.object,
  onAddToBag: PropTypes.func,
  onModalCancel: PropTypes.func,
  onFavouritePress: PropTypes.func,
  isProductDetailVisible: PropTypes.bool,
};

export default Wishlist;
