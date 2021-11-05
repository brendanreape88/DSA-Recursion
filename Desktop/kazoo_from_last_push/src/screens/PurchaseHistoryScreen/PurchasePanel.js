import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Moment from 'moment';

const PurchasePanel = ({
  order,
  setSelectedOrder,
  fetchOrderRecipient,
  setOrderRecipient,
  setHeaderTitle,
}) => {
  const momentDate = Moment(order.createdAt).format('MMM DD YYYY');
  const orderRecipient = order.recipient;
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  return (
    <TouchableOpacity
      style={{ marginTop: 10 }}
      onPress={() => {
        if (order.recipient) {
          setSelectedOrder(order);
          setHeaderTitle('Purchase Detail');
          fetchOrderRecipient(orderRecipient);
        } else {
          setSelectedOrder(order);
          setHeaderTitle('Purchase Detail');
          setOrderRecipient(null);
        }
      }}>
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            marginRight: 5,
            fontSize: RFPercentage(1.5),
            fontWeight: 'bold',
            color: themeElementColor,
          }}>
          {momentDate}
        </Text>
        <View
          style={{
            backgroundColor: 'black',
            height: 1,
            flex: 1,
            alignSelf: 'center',
          }}
        />
      </View>
      <View
        style={{
          minWidth: '100%',
          flexDirection: 'row',
          padding: 10,
          // borderWidth: 1,
        }}>
        {/* <Image
          style={{
            height: width * 0.3,
            width: width * 0.3,
            marginRight: 15,
            borderWidth: 1,
            borderColor: '#545454',
            borderRadius: 8,
          }}
          source={{ uri: order.shopertino_products[0].photo }}
        /> */}
        <View
          style={{
            justifyContent: 'space-between',
            // width: width * 0.6,
          }}>
          {/* <Text
            numberOfLines={2}
            style={{ fontSize: RFPercentage(2.5), fontWeight: 'bold' }}>
            {order.shopertino_products[0].name}
          </Text> */}
          <Text
            numberOfLines={1}
            style={{
              fontSize: RFPercentage(2),
              color: themeElementColor,
            }}>
            Order Number: {order.id}
          </Text>
          {order.recipient && (
            <Text
              numberOfLines={1}
              style={{
                fontSize: RFPercentage(2),
                marginTop: 10,
                color: themeElementColor,
              }}>
              Purchased for: {order.recipient.firstName}{' '}
              {order.recipient.lastName}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: themeElementColor,
            fontSize: RFPercentage(2),
            fontWeight: 'bold',
          }}>
          ${order.totalPrice}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PurchasePanel;
