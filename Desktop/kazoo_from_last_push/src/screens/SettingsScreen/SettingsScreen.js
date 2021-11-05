import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  Share,
  Alert,
} from 'react-native';
import * as Sentry from '@sentry/react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import deviceStorage from '../../utils/deviceStorage';
import { logout, setTheme } from '../../redux';
import { connect } from 'react-redux';
import DataAPIManager from '../../apis/DataAPIManager';
import arrowheadIcon from '../../../assets/icons/arrowhead-icon.png';
import arrowUp from '../../../assets/icons/arrowhead-up.png';
import cart from '../../../assets/icons/cart.png';
import account from '../../../assets/icons/account.png';
import follow from '../../../assets/icons/follow.png';
import orders from '../../../assets/icons/orders.png';
import notifications from '../../../assets/icons/notifications.png';
import wishlist from '../../../assets/icons/wishlist.png';
import key from '../../../assets/icons/key.png';
import wallet from '../../../assets/icons/wallet.png';
import sun from '../../../assets/icons/sun.png';
import { RFPercentage } from 'react-native-responsive-fontsize';
import styles from './styles';

class SettingsScreen extends Component {
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

  onShare = async () => {
    try {
      const message =
        "I'm inviting you to join Kazoo! Follow the link below to join the Party!";
      const title = 'Join Kazoo';
      const link = await dynamicLinks().buildShortLink({
        link: `https://kazoome.com?uid=${this.props.user.id}`,
        domainUriPrefix: 'https://kazoome.page.link',
        social: {
          title: title,
          imageUrl:
            'https://uploads-ssl.webflow.com/5fe020e262d74fae93ae6b27/5fe1841f3be2b11103d3cf41_icon-22-p-500.png',
          descriptionText: message,
        },
        ios: {
          bundleId: 'com.kazoome',
          appStoreId: '1564866696',
          // fallbackUrl: 'https://beta.itunes.apple.com/v1/app/1564866696',
        },
        android: {
          packageName: 'com.kazoome.android',
        },
      });

      await Share.share({
        message: Platform.OS === 'ios' ? message : `${message} ${link}`,
        title,
        url: link,
      });
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert(error.message);
    }
  };

  render() {
    const { width } = Dimensions.get('window');
    const themeBackgroundColor =
      this.props.theme === 'dark' ? 'black' : 'white';
    const themeElementColor =
      this.props.theme === 'dark' ? '#E0E0E0' : '#2B2B2B';
    const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';

    return (
      <View
        style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image style={styles.headerIcon} source={arrowheadIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Settings</Text>
        </View>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              padding: 20,
              borderBottomWidth: 1,
              marginBottom: 1,
              borderColor: themeElementColor,
            }}>
            <Image
              source={{
                uri:
                  this.props.tempAvatar ||
                  this.props.user.profilePictureURL ||
                  defaultProfilePhotoURL,
              }}
              style={{
                height: width * 0.18,
                width: width * 0.18,
                borderRadius: 65,
                borderWidth: 2,
                borderColor: '#4AE0CD',
                marginBottom: 5,
              }}
            />
            <Text
              style={{
                marginBottom: 5,
                fontSize: RFPercentage(3),
                fontWeight: 'bold',
                color: themeElementColor,
              }}>
              {this.props.user.firstName + ' ' + this.props.user.lastName}
            </Text>
            <Text style={{ color: themeElementColor }}>
              {this.props.user.email}
            </Text>
          </View>
          <TouchableOpacity
            onPress={this.onShare}
            style={{
              backgroundColor: themeBackgroundColor,
              borderColor: themeElementColor,
              ...styles.button,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
                width: width * 0.08,
                height: width * 0.08,
              }}>
              <Image
                style={{
                  width: width * 0.06,
                  height: width * 0.07,
                  tintColor: themeElementColor,
                }}
                source={follow}
              />
            </View>
            <Text style={{ color: themeElementColor, ...styles.buttonText }}>
              Invite Friends
            </Text>
          </TouchableOpacity>
          {!this.state.showAccountOptions ? (
            <TouchableOpacity
              onPress={() => {
                this.setState({ showAccountOptions: true });
              }}
              style={{ borderColor: themeElementColor, ...styles.button }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 15,
                  width: width * 0.08,
                  height: width * 0.08,
                }}>
                <Image
                  style={{
                    height: width * 0.06,
                    width: width * 0.06,
                    tintColor: themeElementColor,
                  }}
                  source={account}
                />
              </View>
              <Text style={{ color: themeElementColor, ...styles.buttonText }}>
                Account
              </Text>
              <Image
                style={{
                  width: width * 0.04,
                  height: width * 0.04,
                  tintColor: themeElementColor,
                  position: 'absolute',
                  right: 15,
                }}
                source={arrowUp}
              />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={{ borderColor: themeElementColor, ...styles.button }}
                onPress={() => {
                  this.setState({ showAccountOptions: false });
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 15,
                    width: width * 0.08,
                    height: width * 0.08,
                  }}>
                  <Image
                    style={{
                      height: width * 0.06,
                      width: width * 0.06,
                      tintColor: themeElementColor,
                    }}
                    source={account}
                  />
                </View>
                <Text
                  style={{ color: themeElementColor, ...styles.buttonText }}>
                  Account
                </Text>
                <Image
                  style={{
                    width: width * 0.04,
                    height: width * 0.04,
                    tintColor: themeElementColor,
                    position: 'absolute',
                    right: 15,
                    transform: [{ rotateX: '180deg' }],
                  }}
                  source={arrowUp}
                />
              </TouchableOpacity>
              <View
                style={{
                  marginLeft: '12%',
                }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('My People')}
                  style={{
                    borderColor: themeElementColor,
                    ...styles.subButton,
                  }}>
                  <Text
                    style={{ color: themeElementColor, ...styles.buttonText }}>
                    My People
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Sizing')}
                  style={{
                    borderColor: themeElementColor,
                    ...styles.subButton,
                  }}>
                  <Text
                    style={{ color: themeElementColor, ...styles.buttonText }}>
                    Sizing
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Memories');
                  }}
                  style={{
                    borderColor: themeElementColor,
                    ...styles.subButton,
                  }}>
                  <Text
                    style={{ color: themeElementColor, ...styles.buttonText }}>
                    Memories
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Manage Addresses');
                  }}
                  style={{ padding: 15 }}>
                  <Text
                    style={{ color: themeElementColor, ...styles.buttonText }}>
                    Manage Addresses
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{ borderBottomWidth: 1, borderColor: themeElementColor }}
              />
            </>
          )}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Purchase History')}
            style={{ borderColor: themeElementColor, ...styles.button }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
                width: width * 0.08,
                height: width * 0.08,
              }}>
              <Image
                style={{
                  height: width * 0.06,
                  width: width * 0.06,
                  tintColor: themeElementColor,
                }}
                source={orders}
              />
            </View>
            <Text style={{ color: themeElementColor, ...styles.buttonText }}>
              Order History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Kazoo Wallet')}
            style={{ borderColor: themeElementColor, ...styles.button }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
                width: width * 0.08,
                height: width * 0.08,
              }}>
              <Image
                style={{
                  height: width * 0.06,
                  width: width * 0.06,
                  tintColor: themeElementColor,
                }}
                source={wallet}
              />
            </View>
            <Text style={{ color: themeElementColor, ...styles.buttonText }}>
              Kazoo Wallet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Shopping Bag');
            }}
            style={{ borderColor: themeElementColor, ...styles.button }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
                width: width * 0.08,
                height: width * 0.08,
              }}>
              <Image
                style={{
                  height: width * 0.06,
                  width: width * 0.07,
                  tintColor: themeElementColor,
                }}
                source={cart}
              />
            </View>
            <Text style={{ color: themeElementColor, ...styles.buttonText }}>
              My Cart
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Reset Password')}
            style={{ borderColor: themeElementColor, ...styles.button }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
                width: width * 0.08,
                height: width * 0.08,
              }}>
              <Image
                style={{
                  width: width * 0.06,
                  height: width * 0.06,
                  tintColor: themeElementColor,
                }}
                source={key}
              />
            </View>
            <Text style={{ color: themeElementColor, ...styles.buttonText }}>
              Reset Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ borderColor: themeElementColor, ...styles.button }}
            onPress={() => {
              this.props.navigation.navigate('Wishlist', {
                view: 'current user',
              });
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
                width: width * 0.08,
                height: width * 0.08,
              }}>
              <Image
                style={{
                  width: width * 0.06,
                  height: width * 0.07,
                  tintColor: themeElementColor,
                }}
                source={wishlist}
              />
            </View>
            <Text style={{ color: themeElementColor, ...styles.buttonText }}>
              Wishlist
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ borderColor: themeElementColor, ...styles.button }}
            onPress={() => {
              this.props.navigation.navigate('Wishlist + Notifications', {
                view: 'current user',
              });
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
                width: width * 0.08,
                height: width * 0.08,
              }}>
              <Image
                style={{
                  width: width * 0.06,
                  height: width * 0.06,
                  tintColor: themeElementColor,
                }}
                source={notifications}
              />
            </View>
            <Text style={{ color: themeElementColor, ...styles.buttonText }}>
              Notifications
            </Text>
            {/* <Image
              style={{
                width: width * 0.04,
                height: width * 0.04,
                tintColor: '#545454',
                position: 'absolute',
                right: 15,
              }}
              source={arrowFlipped}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ borderColor: themeElementColor, ...styles.button }}
            onPress={() => {
              let newTheme;
              if (this.props.theme === 'dark') {
                newTheme = 'light';
              } else {
                newTheme = 'dark';
              }
              this.props.setTheme(newTheme);
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
                width: width * 0.08,
                height: width * 0.08,
              }}>
              <Image
                style={{
                  width: width * 0.08,
                  height: width * 0.08,
                  tintColor: themeElementColor,
                }}
                source={sun}
              />
            </View>
            <Text style={{ color: themeElementColor, ...styles.buttonText }}>
              Toggle Theme
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
                width: width * 0.08,
                height: width * 0.08,
              }}>
              <Image
                style={{ width: width * 0.06, height: width * 0.06 }}
                source={security}
              />
            </View>
            <Text style={styles.buttonText}>Privacy and Security</Text>
            <Image
              style={{
                width: width * 0.04,
                height: width * 0.04,
                tintColor: '#545454',
                position: 'absolute',
                right: 15,
              }}
              source={arrowFlipped}
            />
          </TouchableOpacity> */}
          <View style={{ borderColor: themeElementColor, ...styles.button }} />
          <View
            style={{
              marginLeft: '12%',
            }}>
            <TouchableOpacity
              style={{
                borderColor: themeElementColor,
                ...styles.subButton,
              }}
              onPress={this.onLogout}>
              <Text style={{ color: themeElementColor, ...styles.buttonText }}>
                Log Out
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: themeElementColor,
                ...styles.subButton,
              }}>
              <Text style={{ color: themeElementColor, ...styles.buttonText }}>
                Feedback and Help
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{ color: themeElementColor, ...styles.buttonText }}>
                Terms and Conditions
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderTopWidth: 1,
              marginBottom: 1,
              borderColor: themeElementColor,
              backgroundColor: themeBackgroundColor,
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ app }) => {
  return {
    user: app.user,
    theme: app.theme,
    tempAvatar: app.avatar,
  };
};

export default connect(mapStateToProps, { logout, setTheme })(SettingsScreen);
