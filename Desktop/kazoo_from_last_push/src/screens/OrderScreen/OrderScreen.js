import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import cartIcon from '../../../assets/icons/shopping-cart.png';
import { connect } from 'react-redux';
import AppConfig from '../../ShopertinoConfig';
import giftConfirmation from '../../../assets/images/gift-confirmation.png';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';
import Header from '../../components/Headers/Header/Header';
//import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import styles from './styles';

const OrderScreen = (props) => {
  const { width, height } = Dimensions.get('window');
  const shortId = props.route.params.shortid;
  const orderId = props.route.params.orderId;
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <Header route={props.route} />
      <View style={styles.contentContainer}>
        <Image style={styles.image} source={giftConfirmation} />
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={{ color: themeElementColor, ...styles.paymentText }}>
          Payment Complete
        </Text>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={{ color: themeElementColor, ...styles.orderText }}>
          Your Order Code is
        </Text>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={{ color: themeElementColor, ...styles.orderIdText }}>
          {orderId}
        </Text>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={styles.detailsText}>
          and details have been sent to
        </Text>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={styles.emailText}>
          {props.user.email}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => props.navigation.navigate('Birthday Party')}>
        <Text style={{ color: themeBackgroundColor, ...styles.nextButtonText }}>
          DONE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = ({ checkout, app }) => {
  return {
    user: app.user,
    recipient: checkout.recipient,
    giftMessage: checkout.giftMessage,
    giftWrapping: checkout.giftWrapping,
  };
};

export default connect(mapStateToProps)(OrderScreen);
