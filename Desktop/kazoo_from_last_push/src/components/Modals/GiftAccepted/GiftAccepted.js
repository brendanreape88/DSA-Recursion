import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  Animated,
  ImageBackground,
} from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import arrowheadIcon from '../../../../assets/icons/arrowhead-icon.png';
import VideoPlayer from 'react-native-video-controls';
import playButton from '../../../../assets/icons/play-button.png';
import { firebase } from '../../../Core/firebase/config';
import ConfirmSize from './ConfirmSize';
import styles from './styles';

const GiftAccepted = ({
  showGiftAcceptedModal,
  updateShowGiftAcceptedModal,
  gift,
  avatar,
  notification,
  currentUser,
  navigation,
}) => {
  const [posted, setPosted] = useState(gift.posted);
  const [referenceID, setReferenceID] = useState(gift.id);
  const [showReplyAndPostButtons, setShowReplyAndPostButtons] = useState(
    notification.senderType === 'friend' ? true : false,
  );
  const [showGiftAccepted, setShowGiftAccepted] = useState(
    gift.status === 'Accepted' ? true : false,
  );
  const [showCreditMessage, setShowCreditMessage] = useState(
    gift.status === 'Redeemed' ? true : false,
  );
  const [showAcceptAndCreditButtons, setShowAcceptAndCreditButtons] = useState(
    gift.status === 'Await Recipient Action',
  );
  const [showConfirmSize, setShowConfirmSize] = useState(true);
  const [numberToConfirmSize, setNumberToConfirmSize] = useState(
    gift.items?.filter((item) => item.categories[0] === 'QfZY7cTsCBsM08poDJtH')
      .length,
  );
  const [acceptDisabled, setAcceptDisabled] = useState(
    numberToConfirmSize > 0 ? true : false,
  );
  const [successCount, setSuccessCount] = useState(0);
  const [confirmedSizesForOrder, setConfirmedSizesForOrder] = useState([]);
  const [unwrap, setUnwrap] = useState(!notification.seen);

  const checkSuccessCount = (c) => {
    if (c === numberToConfirmSize) {
      setAcceptDisabled(false);
    } else {
      setAcceptDisabled(true);
    }
  };
  const { width } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const slidesRef = useRef(null);

  const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';
  const defaultWrapping = 'https://i.ibb.co/k3zdbH9/wrapping4.png';

  const onUnwrap = () => {
    const notificationDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/notifications`);
    notificationDB
      .doc(notification.id)
      .update({
        seen: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        console.log('notification marked seen!');
        const giftCopy = { ...gift };
        const newMemory = {
          type: 'gift',
          senderFirstName: notification.senderFirstName,
          senderLastName: notification.senderLastName,
          referenceID: gift.id,
          ...giftCopy,
        };
        const memoriesDB = firebase
          .firestore()
          .collection(`users/${currentUser.id}/memories`);
        memoriesDB
          .doc(gift.id)
          .set(newMemory)
          .then(() => {
            console.log('new memory created!');
            setUnwrap(false);
            setShowAcceptAndCreditButtons(true);
          });
      });
  };

  const acceptGift = () => {
    const ordersDB = firebase.firestore().collection('shopertino_orders');
    ordersDB
      .doc(gift.orderDocID)
      .update({
        status: 'Accepted',
        confirmedSizes: confirmedSizesForOrder,
      })
      .then(() => {
        console.log('order record updated!');
        const giftsDB = firebase
          .firestore()
          .collection(`users/${currentUser.id}/gifts`);
        giftsDB
          .doc(gift.id)
          .update({ accepted: true })
          .then(() => {
            setShowConfirmSize(false);
            setShowAcceptAndCreditButtons(false);
            setShowGiftAccepted(true);
            setShowReplyAndPostButtons(true);
          });
      });
  };

  const redeemForCredit = () => {
    const ordersDB = firebase.firestore().collection('shopertino_orders');
    ordersDB
      .doc(gift.orderDocID)
      .update({ status: 'Redeemed' })
      .then(() => {
        console.log('order record updated!');
        const giftsDB = firebase
          .firestore()
          .collection(`users/${currentUser.id}/gifts`);
        giftsDB
          .doc(gift.id)
          .update({ accepted: false })
          .then(() => {
            setShowConfirmSize(false);
            setShowAcceptAndCreditButtons(false);
            setShowReplyAndPostButtons(true);
            setShowCreditMessage(true);
          });
      });
  };

  const togglePost = () => {
    delete gift.id;
    delete gift.posted;
    delete gift.dateCreated;
    delete gift.status;

    const newPost = {
      type: 'gift',
      datePosted: firebase.firestore.Timestamp.fromDate(new Date()),
      authorID: currentUser.id,
      authorFirstName: currentUser.firstName,
      authorLastName: currentUser.lastName,
      senderFirstName: notification.senderFirstName,
      senderLastName: notification.senderLastName,
      referenceID,
      ...gift,
    };

    setReferenceID(newPost.referenceID);

    if (!posted) {
      const postsDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/posts`);
      postsDB
        .doc(referenceID)
        .set(newPost)
        .then(() => {
          console.log('new gift post created!');
          setPosted(true);

          const friendsTop = firebase.firestore().collection('friends');
          friendsTop
            .doc(currentUser.id)
            .update({
              lastPost: firebase.firestore.Timestamp.fromDate(new Date()),
              recentPosts: firebase.firestore.FieldValue.arrayUnion({
                postID: newPost.referenceID,
                datePosted: firebase.firestore.Timestamp.fromDate(new Date()),
              }),
            })
            .then(() => {
              console.log('new post added to top-level friend doc!');

              const giftsDB = firebase
                .firestore()
                .collection(`users/${currentUser.id}/gifts`);
              giftsDB
                .doc(referenceID)
                .update({ posted: true })
                .then(() => {
                  console.log('gift marked posted!');

                  const memoriesDB = firebase
                    .firestore()
                    .collection(`users/${currentUser.id}/memories`);
                  memoriesDB
                    .doc(referenceID)
                    .update({ posted: true })
                    .then(() => {
                      console.log('memory marked posted!');
                    });
                });
            });
        });
    } else {
      const postsDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/posts`);
      postsDB
        .doc(referenceID)
        .delete()
        .then(() => {
          console.log('gift post deleted!');
          setPosted(false);

          const friendsTop = firebase.firestore().collection('friends');
          friendsTop
            .doc(currentUser.id)
            .get()
            .then((doc) => {
              const arrayOfRecentPosts = doc.data().recentPosts;
              const arrayItemToRemove = arrayOfRecentPosts.find(
                (post) => post.postID === referenceID,
              );

              console.log('array item to remove', arrayItemToRemove);

              friendsTop.doc(currentUser.id).update({
                recentPosts: firebase.firestore.FieldValue.arrayRemove(
                  arrayItemToRemove,
                ),
              });
            })
            .then(() => {
              console.log('post removed from top-level friend doc!');

              const giftsDB = firebase
                .firestore()
                .collection(`users/${currentUser.id}/gifts`);
              giftsDB
                .doc(referenceID)
                .update({ posted: false })
                .then(() => {
                  console.log('gift marked unposted!');

                  const memoriesDB = firebase
                    .firestore()
                    .collection(`users/${currentUser.id}/memories`);
                  memoriesDB
                    .doc(referenceID)
                    .update({ posted: false })
                    .then(() => {
                      console.log('memory marked unposted!');
                    });
                });
            });
        });
    }
  };

  console.log('gift', gift);

  return (
    <Modal visible={showGiftAcceptedModal}>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => {
              updateShowGiftAcceptedModal(false);
            }}>
            <Image source={arrowheadIcon} style={styles.arrowIcon} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Your Gift</Text>
          </View>
          <TouchableOpacity style={styles.arrowButton}>
            <Image source={arrowheadIcon} style={styles.arrowIconHidden} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.messageContainer}>
            <Text style={styles.nameText}>
              {notification.senderFirstName} {notification.senderLastName}
            </Text>
            <View style={styles.messageContentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: 10,
                }}>
                <Image
                  source={{ uri: avatar || defaultProfilePhotoURL }}
                  style={styles.avatarImage}
                />
                <Text style={styles.messageText}>
                  {gift.message ? gift.message : 'No message included.'}
                </Text>
              </View>
              {gift.thumbnail && (
                <View
                  style={{
                    marginHorizontal: '2.5%',
                    maxWidth: '100%',
                    height: 300,
                    // borderWidth: 1,
                    // borderColor: 'red',
                  }}>
                  {!playVideo ? (
                    <>
                      <Image
                        source={{ uri: gift.thumbnail }}
                        style={{
                          height: 295,
                          resizeMode: 'cover',
                          width: width * 0.84,
                          borderRadius: 20,
                          // borderWidth: 1,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setPlayVideo(true);
                        }}
                        style={{
                          position: 'absolute',
                          left: width * 0.34,
                          top: 120,
                        }}>
                        <Image
                          source={playButton}
                          style={{ height: 60, width: 60 }}
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <VideoPlayer
                      source={{ uri: gift.video }}
                      style={{
                        ...styles.video,
                        width: width * 0.85, //0.81
                        borderRadius: 20,
                      }}
                    />
                  )}
                </View>
              )}
            </View>
          </View>

          {unwrap ? (
            <>
              <ImageBackground
                source={{ uri: gift.wrapping || defaultWrapping }}
                imageStyle={styles.wrappedGift_image}
                style={styles.wrappedGift}>
                <View style={styles.wrappedGift_nameTag}>
                  <Text style={styles.wrappedGift_nameText}>
                    {currentUser.firstName}
                  </Text>
                </View>
              </ImageBackground>
              <Text style={styles.wrappedGift_subText}>Unwrap to Reveal</Text>
            </>
          ) : (
            gift.items?.map((item) => (
              <>
                <View style={styles.memoryMediaContainer}>
                  <ScrollView
                    horizontal
                    pagingEnabled
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                      { useNativeDriver: false },
                    )}
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    scrollEventThrottle={32}
                    ref={slidesRef}
                    style={{ backgroundColor: 'white', borderRadius: 20 }}
                    bounces={false}>
                    {item.details.map((detail) => (
                      <Image
                        source={{ uri: detail }}
                        style={{
                          width: width * 0.9, // 0.81
                          resizeMode: 'contain',
                          borderRadius: 20,
                        }}
                        key={detail}
                      />
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.itemDetailsContainer}>
                  <Text style={styles.itemTitleText}>{item.name}</Text>
                  <Text numberOfLines={4} style={styles.itemDescriptionText}>
                    {item.description}
                  </Text>
                  {gift.status === 'Await Recipient Action' &&
                    item.categories[0] === 'QfZY7cTsCBsM08poDJtH' && (
                      <ConfirmSize
                        gift={gift}
                        item={item}
                        numberToConfirmSize={numberToConfirmSize}
                        setNumberToConfirmSize={setNumberToConfirmSize}
                        setAcceptDisabled={setAcceptDisabled}
                        successCount={successCount}
                        setSuccessCount={setSuccessCount}
                        checkSuccessCount={checkSuccessCount}
                        showConfirmSize={showConfirmSize}
                        confirmedSizesForOrder={confirmedSizesForOrder}
                        setConfirmedSizesForOrder={setConfirmedSizesForOrder}
                      />
                    )}
                </View>
              </>
            ))
          )}
        </ScrollView>

        {showGiftAccepted && (
          <Text
            style={{
              fontSize: RFPercentage(2.5),
              fontWeight: 'bold',
              color: 'white',
              paddingTop: 20,
              paddingBottom: 10,
              textAlign: 'center',
            }}>
            Gift accepted! 🎉
          </Text>
        )}

        {showCreditMessage && (
          <Text
            style={{
              fontSize: RFPercentage(2.5),
              fontWeight: 'bold',
              color: 'white',
              paddingTop: 20,
              paddingBottom: 10,
            }}>
            You got Kazoo Cash for this gift! 💸
          </Text>
        )}

        {unwrap ? (
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => onUnwrap()}>
                <Text style={styles.buttonText}>Unwrap</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => updateShowGiftAcceptedModal(false)}>
                <Text style={styles.redeemButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : !unwrap && showAcceptAndCreditButtons ? (
          <View style={styles.buttonContainer}>
            <View
              style={{ opacity: acceptDisabled ? 0.7 : 1, ...styles.button }}>
              <TouchableOpacity
                onPress={() => acceptGift()}
                disabled={acceptDisabled}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => redeemForCredit()}>
                <Text style={styles.redeemButtonText}>Redeem</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('Shout Out Screen', {
                  selectedFriendId: gift.sender,
                });
                updateShowGiftAcceptedModal(false);
              }}>
              <Text style={styles.buttonText}>Reply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => togglePost()}>
              <Text style={styles.buttonText}>
                {posted ? 'Unpost' : 'Post'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default GiftAccepted;
