import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';

const ShoutoutSent = ({
  showModal,
  setShowModal,
  setShoutoutText,
  setVideoButtonText,
  setVideoURL,
  navigation,
}) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  return (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.shoutoutContainer}>
        <View
          style={{
            backgroundColor: themeBackgroundColor,
            borderColor: themeElementColor,
            ...styles.shoutoutView,
          }}>
          <Text style={{ color: themeElementColor, ...styles.shoutoutText }}>
            Success! Your shoutout was sent!
          </Text>
          <TouchableOpacity
            style={styles.shoutoutButton}
            onPress={() => {
              setShowModal(false);
              setShoutoutText('');
              setVideoButtonText('ATTACH VIDEO');
              setVideoURL(null);
              navigation.navigate('Birthday Party');
            }}>
            <Text style={styles.shoutoutButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ShoutoutSent;
