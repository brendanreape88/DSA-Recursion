import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import styles from './styles';

const Gift = ({
  showGiftViewNowModal,
  updateShowGiftViewNowModal,
  updateShowGiftAcceptedModal,
  item,
  currentUser,
  rejectGift,
}) => {
  return (
    <Modal visible={showGiftViewNowModal}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Your Gift</Text>
        </View>
        <View style={styles.upperContainer}>
          <Text style={styles.nameText}>
            {item.user.firstName} {item.user.lastName}
          </Text>
          <View style={styles.messageContainer}>
            <Image
              source={{ uri: item.user.profilePictureURL }}
              style={styles.avatarImage}
            />
            <Text style={styles.messageText}>{item.data.message}</Text>
          </View>
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
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitleText}>{item.data.name}</Text>
          <Text numberOfLines={6} style={styles.itemDescriptionText}>
            {item.data.description}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() => {
              rejectGift();
            }}>
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => {
              updateShowGiftViewNowModal(false);
              updateShowGiftAcceptedModal(true);
            }}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Gift;
