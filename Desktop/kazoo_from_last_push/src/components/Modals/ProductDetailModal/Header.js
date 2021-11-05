import React from 'react';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
// import Modal from 'react-native-modal';
import close from '../../../../assets/icons/close.png';
import AppStyles from '../../../AppStyles';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
import { useSelector } from 'react-redux';
import pin from '../../../../assets/icons/pin.png';

function Header(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const {
    headerContainerStyle,
    onCancelPress,
    onSharePress,
    setPinnedItemID,
    setPinGiftsFor,
    selectUser,
    unPinGift,
  } = props;

  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const { width } = Dimensions.get('window');
  const pinned = useSelector((state) => state.app.pinnedItemID);

  return (
    <View style={[styles.headerContainer, headerContainerStyle]}>
      <View
        style={{
          height: width * 0.07,
          width: width * 0.07,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          !pinned ? selectUser() : unPinGift();
        }}>
        <Image
          source={pin}
          style={{
            height: width * 0.07,
            width: width * 0.07,
            tintColor: pinned ? '#4AE0CD' : themeElementColor,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPinnedItemID(null);
          setPinGiftsFor(null);
          onCancelPress();
        }}
        style={[styles.headerIconContainer, styles.headerIconRightContainer]}>
        <Image
          style={{
            tintColor: themeElementColor,
            height: width * 0.06,
            width: width * 0.06,
          }}
          resizeMode={'contain'}
          source={close}
        />
      </TouchableOpacity>
    </View>
  );
}

Header.propTypes = {
  headerContainerStyle: PropTypes.object,
  onCancelPress: PropTypes.func,
  onSharePress: PropTypes.func,
};

export default Header;
