import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import PurchasePanel from './PurchasePanel';
import { useSelector, useDispatch } from 'react-redux';
import { setOtherUserData, setProfileView } from '../../redux/reducers/app';
import arrowheadIcon from '../../../assets/icons/arrowhead-icon.png';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { firebase } from '../../Core/firebase/config';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';
import PurchaseDetail from './PurchaseDetail';
import ProductDetailModal from '../../components/Modals/ProductDetailModal/ProductDetailModal';

const PurchaseHistoryScreen = (props) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');
  const currentUser = useSelector((state) => state.app.user);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const recipientProfileView =
    selectedOrder?.recipient?.type === 'sub user'
      ? 'off-app friend'
      : selectedOrder?.recipient?.type;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [
    isProductDetailModalVisible,
    setIsProductDetailModalVisible,
  ] = useState(false);
  const [orderRecipient, setOrderRecipient] = useState(null);
  const isFocused = useIsFocused();
  const [headerTitle, setHeaderTitle] = useState('Purchase History');
  const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    setSelectedOrder(null);
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    const ordersArray = [];
    const ordersDB = firebase.firestore().collection('shopertino_orders');
    ordersDB
      .where('user_id', '==', currentUser.id)
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          ordersArray.push(data);
        });
      })
      .then(() => {
        setOrders(ordersArray);
      });
  }, [currentUser.id, isFocused]);

  const fetchOrderRecipient = (recipient) => {
    console.log('recipient', recipient);
    if (recipient.type === 'friend') {
      const usersDB = firebase.firestore().collection('users');
      usersDB
        .doc(recipient.friendID)
        .get()
        .then((doc) => {
          setOrderRecipient(doc.data());
        });
    } else if (recipient.type === 'following') {
      const followingDB = firebase.firestore().collection('following');
      followingDB
        .doc(recipient.documentID)
        .get()
        .then((doc) => {
          setOrderRecipient(doc.data());
        });
    } else if (recipient.type === 'sub user') {
      const subUsersDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/subUsers`);
      subUsersDB
        .doc(recipient.documentID)
        .get()
        .then((doc) => {
          setOrderRecipient(doc.data());
        });
    }
  };

  const onCardPress = (item) => {
    const newItem = {
      ...item,
      id: item.id || item.productID,
      categories: [item.category] || item.categories || [],
      // category: item.category || item.categories[0] || null,
      isFavourite: true,
    };
    setSelectedProduct(newItem);
    setIsProductDetailModalVisible(true);
  };

  const onModalCancel = () => {
    setIsProductDetailModalVisible(false);
  };

  console.log('selected order', selectedOrder);

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            if (!selectedOrder) {
              props.navigation.goBack();
            } else {
              setHeaderTitle('Purchase History');
              setSelectedOrder(null);
            }
          }}>
          <Image style={styles.headerIcon} source={arrowheadIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{headerTitle}</Text>
      </View>
      {/* <View
        style={{
          height: '5%',
          width: '100%',
          borderWidth: 1,
          borderColor: 'white',
          flexDirection: 'row',
        }}>
        <Text style={{ color: themeElementColor }}>Filter Results</Text>
        <TouchableOpacity>
          <Text style={{ color: themeElementColor }}>Year</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: themeElementColor }}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: themeElementColor }}>Day</Text>
        </TouchableOpacity>
      </View> */}
      {orders.length > 0 && !selectedOrder && (
        <ScrollView>
          {orders.map((order) => (
            <PurchasePanel
              order={order}
              setSelectedOrder={setSelectedOrder}
              fetchOrderRecipient={fetchOrderRecipient}
              setOrderRecipient={setOrderRecipient}
              setHeaderTitle={setHeaderTitle}
            />
          ))}
        </ScrollView>
      )}
      {orders.length === 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: themeElementColor,
            }}>
            No orders to show right now.
          </Text>
        </View>
      )}
      {selectedOrder && (
        <ScrollView style={{ width: '100%' }}>
          {selectedOrder.shopertino_products.map((product) => (
            <PurchaseDetail
              date={selectedOrder.createdAt}
              product={product}
              onCardPress={onCardPress}
            />
          ))}
          <View
            style={{
              backgroundColor: '#34B6A6',
              width: '100%',
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: RFPercentage(2),
                fontWeight: 'bold',
                color: 'white',
              }}>
              Order Number: {selectedOrder.id}
            </Text>
          </View>
          <View style={{ borderBottomWidth: 1, width: '100%', marginTop: 10 }}>
            <View style={{ borderBottomWidth: 1, marginHorizontal: 10 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: RFPercentage(3),
                  paddingBottom: 5,
                  color: themeElementColor,
                }}>
                Delivery Detail
              </Text>
            </View>
            {orderRecipient && (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setOtherUserData(orderRecipient));
                  dispatch(setProfileView(recipientProfileView));
                  props.navigation.navigate('Friend Profile');
                }}
                style={{
                  marginHorizontal: 10,
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Image
                  style={{
                    height: width * 0.12,
                    width: width * 0.12,
                    borderRadius: 65,
                    borderWidth: 2,
                    borderColor: '#4AE0CD',
                    marginRight: 10,
                  }}
                  source={{
                    uri:
                      orderRecipient.profilePictureURL ||
                      defaultProfilePhotoURL,
                  }}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: RFPercentage(3),
                    color: themeElementColor,
                  }}>
                  {orderRecipient.firstName} {orderRecipient.lastName}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ width: '100%', marginTop: 10 }}>
            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: RFPercentage(3),
                  paddingBottom: 5,
                  marginBottom: 5,
                  color: themeElementColor,
                }}>
                Payment Detail
              </Text>
            </View>
            <View
              style={{
                marginRight: 10,
                marginLeft: 30,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: themeElementColor,
                    fontSize: RFPercentage(2),
                  }}>
                  Items
                </Text>
                <Text
                  style={{
                    color: themeElementColor,
                    fontSize: RFPercentage(2),
                    fontWeight: 'bold',
                  }}>
                  ${selectedOrder.totalPrice}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginRight: 10,
                marginLeft: 30,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: themeElementColor,
                    fontSize: RFPercentage(2),
                  }}>
                  Shipping
                </Text>
                <Text
                  style={{
                    color: themeElementColor,
                    fontSize: RFPercentage(2),
                    fontWeight: 'bold',
                  }}>
                  ${selectedOrder.selectedShippingMethod.amount}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: themeElementColor,
                marginRight: 10,
                marginLeft: 30,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: themeElementColor,
                    fontSize: RFPercentage(2),
                  }}>
                  Tax
                </Text>
                <Text
                  style={{
                    color: themeElementColor,
                    fontSize: RFPercentage(2),
                    fontWeight: 'bold',
                  }}>
                  $0
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: themeElementColor,
                marginRight: 10,
                marginLeft: 30,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: themeElementColor,
                    fontSize: RFPercentage(2),
                    fontWeight: 'bold',
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    color: '#E5606E',
                    fontSize: RFPercentage(2),
                    fontWeight: 'bold',
                  }}>
                  ${selectedOrder.totalPrice}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginRight: 10,
                marginLeft: 30,
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: themeElementColor,
                  fontSize: RFPercentage(2),
                  fontWeight: 'bold',
                }}>
                Paid With
              </Text>
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: RFPercentage(2.5),
                color: themeElementColor,
                padding: 20,
                textAlign: 'center',
              }}>
              {selectedOrder.selectedPaymentMethod.title}
            </Text>
          </View>
        </ScrollView>
      )}
      {selectedProduct && (
        <ProductDetailModal
          item={selectedProduct}
          shippingMethods={props.shippingMethods}
          visible={isProductDetailModalVisible}
          onFavouritePress={props.onFavouritePress}
          wishlist={props.wishlist}
          user={currentUser}
          onAddToBag={props.onAddToBag}
          onCancelPress={onModalCancel}
          appConfig={props.route.params.appConfig}
          navigation={props.navigation}
          orderAPIManager={props.route.params.orderAPIManager}
        />
      )}
    </View>
  );
};

export default PurchaseHistoryScreen;
