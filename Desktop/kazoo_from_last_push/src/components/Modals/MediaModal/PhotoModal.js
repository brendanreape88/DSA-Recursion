import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import close from '../../../../assets/icons/close.png';
import styles from './styles';

const PhotoModal = ({
  showPhotoModal,
  setShowPhotoModal,
  selectProfilePhoto,
}) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  return (
    <Modal visible={showPhotoModal} transparent={true}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: themeBackgroundColor,
            borderColor: themeElementColor,
            ...styles.contentContainer,
          }}>
          <TouchableOpacity
            onPress={() => setShowPhotoModal(false)}
            style={{
              position: 'absolute',
              top: '5%',
              right: '5%',
              height: 15,
              width: 15,
            }}>
            <Image
              source={close}
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: '5%',
                right: '5%',
                tintColor: themeElementColor,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowPhotoModal(false);
              selectProfilePhoto('camera');
            }}>
            <Text
              adjustsFontSizeToFit={true}
              style={{ color: themeElementColor, ...styles.messageText }}>
              Take photo with camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowPhotoModal(false);
              selectProfilePhoto('storage');
            }}>
            <Text
              adjustsFontSizeToFit={true}
              style={{ color: themeElementColor, ...styles.messageText }}>
              Select photo from storage
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PhotoModal;
