import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  Linking,
  Share,
} from 'react-native';
import deviceStorage from '../../utils/deviceStorage';
import { logout } from '../../redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DataAPIManager from '../../apis/DataAPIManager';
import arrowheadIcon from '../../../assets/icons/arrowhead-icon.png';
import arrowFlipped from '../../../assets/icons/arrowhead-flipped.png';
import arrowUp from '../../../assets/icons/arrowhead-up.png';
import cart from '../../../assets/icons/cart.png';
import account from '../../../assets/icons/account.png';
import follow from '../../../assets/icons/follow.png';
import orders from '../../../assets/icons/orders.png';
import notifications from '../../../assets/icons/notifications.png';
import security from '../../../assets/icons/security.png';
import wishlist from '../../../assets/icons/wishlist.png';
import key from '../../../assets/icons/key.png';
import { RFPercentage } from 'react-native-responsive-fontsize';
import styles from './styles';

class FollowAndInviteFriendsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFollowOptions: false,
      showAccountOptions: false,
      showOrderOptions: false,
      showNotificaionOptions: false,
      showPrivacyOptions: false,
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

  // const SettingsScreen = ({ navigation }) => {
  //   onLogout = async () => {
  //     await deviceStorage.logoutDeviceStorage();
  //     await this.dataAPIManager?.logout();
  //     await this.props.logout();
  //     this.onItemPress('LoginStack');
  //   };

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {
              this.props.navigation.navigate('Settings');
            }}>
            <Image style={styles.headerIcon} source={arrowheadIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Follow and Invite Friends</Text>
        </View>
        <ScrollView>
          <TouchableOpacity style={styles.button} onPress={onShare}>
            <Text style={styles.buttonText}>Invite Friends</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ app }) => {
  return {
    user: app.user,
  };
};

export default connect(mapStateToProps, { logout })(
  FollowAndInviteFriendsScreen,
);
