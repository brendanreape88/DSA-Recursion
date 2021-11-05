import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Dimensions } from 'react-native';
import styles from './styles';

const NoPeeking = ({ showNoPeekingModal, updateShowNoPeekingModal }) => {
  const { width, height } = Dimensions.get('window');
  return (
    <Modal visible={showNoPeekingModal} transparent={true}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text adjustsFontSizeToFit={true} style={styles.messageText}>
            🙈 No peeking! It's not your birthday yet!
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                updateShowNoPeekingModal(false);
              }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={styles.buttonText}>
                close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NoPeeking;
