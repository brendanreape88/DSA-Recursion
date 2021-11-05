import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';

const AddFriend2 = ({ item, showModal, updateShowModal, onAdd }) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  return (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: themeBackgroundColor,
            borderColor: themeElementColor,
            ...styles.contentContainer,
          }}>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={{ color: themeElementColor, ...styles.messageText }}>
            Send friend request to {item.firstName}?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                //onAdd();
                updateShowModal(false);
              }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={styles.cancelButtonText}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                onAdd();
              }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={styles.sendButtonText}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddFriend2;
