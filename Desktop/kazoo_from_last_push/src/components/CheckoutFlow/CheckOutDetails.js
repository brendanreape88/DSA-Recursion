import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
import { useSelector } from 'react-redux';

function CheckOutDetails(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const {
    containerStyle,
    selectedShippingMethod,
    totalPrice,
    selectedPaymentMethod,
    appConfig,
    amountOfKazooCashToUse,
  } = props;
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeTitleColor = theme === 'dark' ? 'lightgrey' : '#545454';
  const themeValueColor = theme === 'dark' ? 'white' : '#545454';

  const paymentValue = {
    key: 'Apple Pay',
    apple: 'Apple Pay',
    google: 'Google Pay',
  };
  const payment = {
    key: 'Payment',
    title: 'Payment',
    value: selectedPaymentMethod.isNativePaymentMethod
      ? paymentValue[selectedPaymentMethod.key]
      : `${selectedPaymentMethod.brand} ${selectedPaymentMethod.last4}`,
  };
  const shipping = {
    key: 'Shipping',
    title: 'Shipping',
    value: selectedShippingMethod.label,
  };
  const total = {
    key: 'Total',
    title: 'Total',
    value: `${appConfig.currency}${totalPrice}`,
  };
  const kazooCash = {
    key: 'Kazoo Cash Used',
    title: 'Kazoo Cash Used',
    value: `${appConfig.currency}${amountOfKazooCashToUse}`,
  };
  const newTotal = {
    key: 'New Total',
    title: 'New Total',
    value: `${appConfig.currency}${totalPrice - amountOfKazooCashToUse}`,
  };
  const checkoutDetail = amountOfKazooCashToUse
    ? [payment, shipping, total, kazooCash, newTotal]
    : [payment, shipping, total];

  const renderCheckOutDetails = ({ index, item, checkoutDetail }) => {
    if (props.isStripeCheckoutEnabled && item.title === 'Payment') {
      return null;
    }

    if (
      props.selectedPaymentMethod.isNativePaymentMethod &&
      item.title === 'Shipping'
    ) {
      return null;
    }
    return (
      <View
        key={item.key}
        style={{
          backgroundColor: themeBackgroundColor,
          borderBottomWidth: index === checkoutDetail.length - 1 ? 0 : 0.5,
          ...styles.checkOutItemContainer,
        }}>
        <View style={styles.checkOutTitleContainer}>
          <Text style={{ color: themeTitleColor, ...styles.checkOutTitle }}>
            {item.title}
          </Text>
        </View>
        <View style={styles.checkOutValueContainer}>
          <Text style={{ color: themeValueColor, ...styles.checkOutValue }}>
            {item.value}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.checkOutDetailContainer, containerStyle]}>
      {checkoutDetail.map((item, index) =>
        renderCheckOutDetails({ item, index, checkoutDetail }),
      )}
    </View>
  );
}

CheckOutDetails.propTypes = {
  selectedShippingMethod: PropTypes.object,
  selectedPaymentMethod: PropTypes.object,
  containerStyle: PropTypes.any,
  totalPrice: PropTypes.any,
};

export default CheckOutDetails;
