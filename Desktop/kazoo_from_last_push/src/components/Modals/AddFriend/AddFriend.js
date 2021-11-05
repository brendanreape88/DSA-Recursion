import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';

const AddFriend = ({ onAdd, showModal, updateShowModal, otherUser, view }) => {
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
          {view === 'pending' ? (
            <>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={{ color: themeElementColor, ...styles.messageText }}>
                Your friendship with {otherUser.firstName} is pending{' '}
              </Text>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  updateShowModal(false);
                }}>
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                  style={styles.cancelButtonText}>
                  Close
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={{ color: themeElementColor, ...styles.messageText }}>
                Send friend request to{' '}
                {otherUser ? otherUser.firstName : 'this person'}?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
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
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AddFriend;
