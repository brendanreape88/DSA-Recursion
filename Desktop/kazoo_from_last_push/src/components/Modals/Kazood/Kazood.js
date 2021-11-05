import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

const Kazood = ({
  showGiftModal,
  updateShowGiftModal,
  updateShowGiftViewNowModal,
  item,
  currentUser,
}) => {
  return (
    <Modal visible={showGiftModal}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>You just got Kazoo'd!</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: item.user.profilePictureURL }}
            style={styles.avatarImage}
          />
        </View>
        <View style={styles.wrappingContainer}>
          <Image
            source={{
              uri: item.data.wrapping,
            }}
            style={styles.wrappingImage}
          />
        </View>
        <View style={styles.wrappingMessageContainer}>
          <View style={styles.wrappingMessageContentContainer}>
            <Text style={styles.wrappingMessageText}>
              To: {currentUser.firstName}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.viewLaterButton}
            onPress={() => {
              updateShowGiftModal(false);
            }}>
            <Text style={styles.viewLaterButtonText}>View Later</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewNowButton}
            onPress={() => {
              updateShowGiftModal(false);
              updateShowGiftViewNowModal(true);
            }}>
            <Text style={styles.viewNowButtonText}>View Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Kazood;
