import React from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';

const Filters = ({
  showFullPictureModal,
  setShowFullPictureModal,
  profilePictureURL,
}) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const { width, height } = Dimensions.get('window');
  const otherUser = useSelector((state) => state.app.otherUser);
  const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';

  return (
    <Modal visible={showFullPictureModal} transparent={true}>
      <TouchableOpacity
        onPress={() => setShowFullPictureModal(false)}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: themeBackgroundColor,
            height: height * 0.5,
            width: width * 0.9,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderWidth: 1,
            borderColor: themeElementColor,
          }}>
          <Image
            source={{ uri: profilePictureURL || defaultProfilePhotoURL }}
            style={{
              marginTop: 10,
              height: width * 0.85,
              width: width * 0.85,
              borderRadius: 20,
            }}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Text
              style={{
                color: themeElementColor,
                fontWeight: 'bold',
                fontSize: RFPercentage(3),
              }}>
              {otherUser.firstName} {otherUser.lastName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Filters;
