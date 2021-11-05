import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import BackArrow from '../../../assets/icons/arrowhead-icon.png';
import AddIcon from '../../../assets/icons/add.png';
import ProfileMemory from '../../components/Profile/ProfileMemory';
import VideoPlayer from 'react-native-video-controls';
import Moment from 'moment';
import { firebase } from '../../Core/firebase/config';
import playButton from '../../../assets/icons/play-button.png';
import { RFPercentage } from 'react-native-responsive-fontsize';
import NewMemoryModal from '../../components/Modals/NewMemoryModal/NewMemoryModal';
import { setSelectedMemoryIndex } from '../../redux/reducers/app';
import styles from './styles';

const MemoriesScreen = (props) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const fromProfile = props.route.params.fromProfile;
  const memoriesView = useSelector((state) => state.app.memoriesView);
  const currentUserMemories = useSelector((state) => state.app.memories);
  const otherUserMemories = useSelector((state) => state.app.otherUserMemories);
  const memories =
    memoriesView === 'current user' ? currentUserMemories : otherUserMemories;
  const formattedMemories = memories.map((mem) => {
    if (!mem.year) {
      const momentYear = Moment(mem.createdAt).format('YYYY');
      return {
        year: momentYear,
        ...mem,
      };
    } else {
      return mem;
    }
  });
  const yearsToDisplay = formattedMemories.map((fm) => {
    return fm.year;
  });
  const originalYears = [...new Set(yearsToDisplay)];
  const selectedMemoryIndex = useSelector(
    (state) => state.app.selectedMemoryIndex,
  );
  const selectedMemory = memories[selectedMemoryIndex]
    ? memories[selectedMemoryIndex]
    : null;

  const currentUserID = useSelector((state) => state.app.user.id);
  const currentUser = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const view = useSelector((state) => state.app.profileView);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState([]);
  const [searchStr, setSearchStr] = useState('');
  const friends = useSelector((state) => state.app.friends);
  const date = selectedMemory?.dateCreated?.toDate();
  const formattedDate = Moment(date).format('MMMM D YYYY');
  const zero = '0';
  const customMemoryMonth =
    selectedMemory?.month && selectedMemory?.month.length === 1
      ? zero.concat(selectedMemory?.month)
      : selectedMemory?.month;
  const formattedCustomMemoryMonth = customMemoryMonth
    ? Moment(customMemoryMonth, 'MM').format('MMMM')
    : null;
  const customMemoryDate =
    formattedCustomMemoryMonth && selectedMemory?.day && selectedMemory?.year
      ? `${formattedCustomMemoryMonth} ${selectedMemory?.day} ${selectedMemory?.year}`
      : formattedCustomMemoryMonth &&
        !selectedMemory?.day &&
        selectedMemory?.year
      ? `${formattedCustomMemoryMonth} ${selectedMemory?.year}`
      : !formattedCustomMemoryMonth &&
        selectedMemory?.day &&
        selectedMemory?.year
      ? `${selectedMemory?.day} ${selectedMemory?.year}`
      : !formattedCustomMemoryMonth &&
        !selectedMemory?.day &&
        selectedMemory?.year
      ? selectedMemory?.year
      : 'no date to display';
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;
  const slidesRef = useRef(null);

  const toggleGiftPost = () => {
    const selectedMemoryCopy = {
      ...selectedMemory,
    };
    delete selectedMemoryCopy.posted;
    delete selectedMemory.dateCreated;

    const newPost = {
      type: 'gift',
      datePosted: firebase.firestore.Timestamp.fromDate(new Date()),
      authorID: currentUserID,
      authorFirstName: currentUser.firstName,
      authorLastName: currentUser.lastName,
      ...selectedMemoryCopy,
    };

    if (!selectedMemory.posted) {
      const postsDB = firebase
        .firestore()
        .collection(`users/${currentUserID}/posts`);
      postsDB
        .doc(selectedMemoryCopy.referenceID)
        .set(newPost)
        .then(() => {
          console.log('new gift post created!');

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
                .collection(`users/${currentUserID}/gifts`);
              giftsDB
                .doc(selectedMemoryCopy.referenceID)
                .update({ posted: true })
                .then(() => {
                  console.log('gift marked posted!');

                  const memoriesDB = firebase
                    .firestore()
                    .collection(`users/${currentUserID}/memories`);
                  memoriesDB
                    .doc(selectedMemoryCopy.referenceID)
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
        .collection(`users/${currentUserID}/posts`);
      postsDB
        .doc(selectedMemoryCopy.referenceID)
        .delete()
        .then(() => {
          console.log('gift post deleted!');

          const friendsTop = firebase.firestore().collection('friends');
          friendsTop
            .doc(currentUser.id)
            .get()
            .then((doc) => {
              const arrayOfRecentPosts = doc.data().recentPosts;
              const arrayItemToRemove = arrayOfRecentPosts.find(
                (post) => post.postID === selectedMemory.referenceID,
              );

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
                .collection(`users/${currentUserID}/gifts`);
              giftsDB
                .doc(selectedMemoryCopy.referenceID)
                .update({ posted: false })
                .then(() => {
                  console.log('gift marked unposted!');

                  const memoriesDB = firebase
                    .firestore()
                    .collection(`users/${currentUserID}/memories`);
                  memoriesDB
                    .doc(selectedMemoryCopy.referenceID)
                    .update({ posted: false })
                    .then(() => {
                      console.log('memory marked unposted!');
                    });
                });
            });
        });
    }
  };

  const toggleShoutoutPost = () => {
    const selectedMemoryCopy = {
      ...selectedMemory,
    };
    delete selectedMemoryCopy.posted;
    delete selectedMemory.dateCreated;

    const newPost = {
      type: 'shoutout',
      datePosted: firebase.firestore.Timestamp.fromDate(new Date()),
      authorID: currentUserID,
      authorFirstName: currentUser.firstName,
      authorLastName: currentUser.lastName,
      // senderFirstName: selectedMemoryCopy.firstName,
      // senderLastName: selectedMemoryCopy.lastName,
      ...selectedMemory,
    };

    if (!selectedMemory.posted) {
      const postsDB = firebase
        .firestore()
        .collection(`users/${currentUserID}/posts`);
      postsDB
        .doc(selectedMemoryCopy.referenceID)
        .set(newPost)
        .then(() => {
          console.log('new shoutout post created!');

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

              const shoutoutsDB = firebase
                .firestore()
                .collection(`users/${currentUserID}/shoutouts`);
              shoutoutsDB
                .doc(selectedMemoryCopy.referenceID)
                .update({ posted: true })
                .then(() => {
                  console.log('shoutout marked posted!');

                  const memoriesDB = firebase
                    .firestore()
                    .collection(`users/${currentUserID}/memories`);
                  memoriesDB
                    .doc(selectedMemoryCopy.referenceID)
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
        .collection(`users/${currentUserID}/posts`);
      postsDB
        .doc(selectedMemoryCopy.referenceID)
        .delete()
        .then(() => {
          console.log('shoutout post deleted!');

          const friendsTop = firebase.firestore().collection('friends');
          friendsTop
            .doc(currentUser.id)
            .get()
            .then((doc) => {
              const arrayOfRecentPosts = doc.data().recentPosts;
              const arrayItemToRemove = arrayOfRecentPosts.find(
                (post) => post.postID === selectedMemory.referenceID,
              );

              friendsTop.doc(currentUser.id).update({
                recentPosts: firebase.firestore.FieldValue.arrayRemove(
                  arrayItemToRemove,
                ),
              });
            })
            .then(() => {
              console.log('post removed from top-level friend doc!');
              const shoutoutsDB = firebase
                .firestore()
                .collection(`users/${currentUserID}/shoutouts`);
              shoutoutsDB
                .doc(selectedMemoryCopy.referenceID)
                .update({ posted: false })
                .then(() => {
                  console.log('shoutout marked unposted!');

                  const memoriesDB = firebase
                    .firestore()
                    .collection(`users/${currentUserID}/memories`);
                  memoriesDB
                    .doc(selectedMemoryCopy.referenceID)
                    .update({ posted: false })
                    .then(() => {
                      console.log('memory marked unposted!');
                    });
                });
            });
        });
    }
  };

  const toggleCustomPost = () => {
    const newPost = {
      datePosted: firebase.firestore.Timestamp.fromDate(new Date()),
      authorID: currentUserID,
      authorFirstName: currentUser.firstName,
      authorLastName: currentUser.lastName,
      referenceID: selectedMemory.id,
      ...selectedMemory,
    };

    if (!selectedMemory.posted) {
      const postsDB = firebase
        .firestore()
        .collection(`users/${currentUserID}/posts`);
      postsDB
        .doc(selectedMemory.id)
        .set(newPost)
        .then(() => {
          console.log('custom memory posted!');

          const friendsTop = firebase.firestore().collection('friends');
          friendsTop
            .doc(currentUser.id)
            .update({
              lastPost: firebase.firestore.Timestamp.fromDate(new Date()),
              recentPosts: firebase.firestore.FieldValue.arrayUnion({
                postID: newPost.id,
                datePosted: firebase.firestore.Timestamp.fromDate(new Date()),
              }),
            })
            .then(() => {
              console.log('new post added to top-level friends document!');

              const memoriesDB = firebase
                .firestore()
                .collection(`users/${currentUserID}/memories`);
              memoriesDB
                .doc(selectedMemory.id)
                .update({ posted: true })
                .then(() => {
                  console.log('memory marked posted!');
                });
            });
        });
    } else {
      const postsDB = firebase
        .firestore()
        .collection(`users/${currentUserID}/posts`);
      postsDB
        .doc(selectedMemory.id)
        .delete()
        .then(() => {
          console.log('custom memory post deleted!');

          const friendsTop = firebase.firestore().collection('friends');
          friendsTop
            .doc(currentUser.id)
            .get()
            .then((doc) => {
              const arrayOfRecentPosts = doc.data().recentPosts;
              const arrayItemToRemove = arrayOfRecentPosts.find(
                (post) => post.postID === selectedMemory.id,
              );

              friendsTop.doc(currentUser.id).update({
                recentPosts: firebase.firestore.FieldValue.arrayRemove(
                  arrayItemToRemove,
                ),
              });
            })
            .then(() => {
              console.log('post removed from top-level friend doc!');

              const memoriesDB = firebase
                .firestore()
                .collection(`users/${currentUserID}/memories`);
              memoriesDB
                .doc(selectedMemory.id)
                .update({ posted: false })
                .then(() => {
                  console.log('memory marked posted!');
                });
            });
        });
    }
  };

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <NewMemoryModal
        showModal={showModal}
        setShowModal={setShowModal}
        currentUserID={currentUserID}
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            if (!selectedMemory) {
              props.navigation.goBack();
            } else if (fromProfile) {
              props.navigation.goBack();
              dispatch(setSelectedMemoryIndex(null));
            } else {
              dispatch(setSelectedMemoryIndex(null));
            }
          }}>
          <Image style={styles.headerIcon} source={BackArrow} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Memories</Text>
        {memoriesView === 'current user' ? (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {
              setShowModal(true);
            }}>
            <Image style={styles.headerIcon} source={AddIcon} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: width * 0.06 }} />
        )}
      </View>
      {!memories.length && (
        <View
          style={{
            height: '90%',
            backgroundColor: themeBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: RFPercentage(3),
              color: themeElementColor,
            }}>
            No memories to show at this time.
          </Text>
        </View>
      )}
      <>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: themeBackgroundColor,
            alignItems: 'center',
          }}>
          {selectedMemory && (
            <>
              <View
                style={{
                  backgroundColor: themeBackgroundColor,
                  ...styles.selectedDividerContainer,
                }}>
                <View
                  style={{
                    backgroundColor: themeElementColor,
                    ...styles.leftLine,
                  }}
                />
                <Text
                  style={{ color: themeElementColor, ...styles.memoryDate }}>
                  {selectedMemory?.type === 'custom'
                    ? customMemoryDate
                    : formattedDate}
                </Text>
                <View
                  style={{
                    backgroundColor: themeElementColor,
                    ...styles.rightLine,
                  }}
                />
              </View>
              <View style={styles.selectedMemoryContainer}>
                <View style={styles.memoryMediaContainer}>
                  {selectedMemory.type === 'shoutout' &&
                    selectedMemory.video &&
                    selectedMemory.thumbnail &&
                    (!playVideo ? (
                      <>
                        <Image
                          source={{
                            uri: selectedMemory.thumbnail,
                          }}
                          style={{
                            height: 300,
                            resizeMode: 'cover',
                            width: width * 0.895,
                          }}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setPlayVideo(true);
                          }}
                          style={{
                            position: 'absolute',
                            left: width * 0.38,
                            top: 120,
                          }}>
                          <Image
                            source={playButton}
                            style={{
                              height: 60,
                              width: 60,
                            }}
                          />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <VideoPlayer
                        source={{
                          uri: selectedMemory.video,
                        }}
                        style={{
                          ...styles.video,
                          width: width * 0.895, //0.81
                        }}
                      />
                    ))}
                  {selectedMemory.type !== 'shoutout' && (
                    <ScrollView
                      horizontal
                      pagingEnabled
                      onScroll={Animated.event(
                        [
                          {
                            nativeEvent: {
                              contentOffset: {
                                x: scrollX,
                              },
                            },
                          },
                        ],
                        {
                          useNativeDriver: false,
                        },
                      )}
                      showsHorizontalScrollIndicator={false}
                      onViewableItemsChanged={viewableItemsChanged}
                      viewabilityConfig={viewConfig}
                      scrollEventThrottle={32}
                      ref={slidesRef}
                      bounces={false}>
                      {selectedMemory?.mediaArray?.[0] &&
                        selectedMemory?.mediaArray?.map((media) =>
                          media.type === 'video' ? (
                            !playVideo ? (
                              <>
                                <Image
                                  source={{
                                    uri: selectedMemory.thumbnail,
                                  }}
                                  style={{
                                    height: 300,
                                    resizeMode: 'cover',
                                    width: width * 0.895,
                                  }}
                                />
                                <TouchableOpacity
                                  onPress={() => {
                                    setPlayVideo(true);
                                  }}
                                  style={{
                                    position: 'absolute',
                                    left: width * 0.38,
                                    top: 120,
                                  }}>
                                  <Image
                                    source={playButton}
                                    style={{
                                      height: 60,
                                      width: 60,
                                    }}
                                  />
                                </TouchableOpacity>
                              </>
                            ) : (
                              <VideoPlayer
                                source={{
                                  uri: media.uri,
                                }}
                                style={{
                                  ...styles.video,
                                  width: width * 0.895, //0.81
                                }}
                              />
                            )
                          ) : (
                            <Image
                              source={{
                                uri: media.uri,
                              }}
                              style={{
                                ...styles.selectedMemoryImage,
                                width: width * 0.9, // 0.81
                              }}
                              key={media.uri}
                            />
                          ),
                        )}
                    </ScrollView>
                  )}

                  {selectedMemory?.type === 'shoutout' &&
                    !selectedMemory?.video && (
                      <View
                        style={{
                          height: 300,
                          width: width * 0.895,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 20,
                        }}>
                        <Text
                          numberOfLines={7}
                          style={{
                            textAlign: 'center',
                            fontSize: 30,
                          }}>
                          {selectedMemory.message}
                        </Text>
                      </View>
                    )}
                  {/* <PostedStatusCircle
                    isPosted={selectedMemory.posted}
                    isSelectedMemory={true}
                  /> */}
                </View>
                <Text style={styles.memoryTitle}>
                  {selectedMemory.senderFirstName}{' '}
                  {selectedMemory.senderLastName}
                </Text>
                <View
                  style={{
                    backgroundColor: themeBackgroundColor,
                    ...styles.dividerContainer,
                  }}>
                  <View
                    style={{
                      borderColor: themeElementColor,
                      ...styles.divider,
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: themeElementColor,
                    ...styles.memoryDescription,
                  }}>
                  {selectedMemory?.message}
                </Text>
                {memoriesView === 'current user' && (
                  <TouchableOpacity
                    onPress={() => {
                      selectedMemory.type === 'gift'
                        ? toggleGiftPost()
                        : selectedMemory.type === 'shoutout'
                        ? toggleShoutoutPost()
                        : toggleCustomPost();
                    }}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: 'bold',
                        color: '#34B6A6',
                      }}>
                      {selectedMemory.posted ? 'Unpost' : 'Post'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}

          {memories && (
            <View style={styles.memoryHistoryContainer}>
              {originalYears
                .sort(function (a, b) {
                  return b - a;
                })
                .map((y) => {
                  return (
                    <>
                      <View
                        style={{
                          backgroundColor: themeBackgroundColor,
                          ...styles.dividerContainer,
                        }}>
                        <View
                          style={{
                            borderColor: themeElementColor,
                            ...styles.divider,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          color: themeElementColor,
                          ...styles.yearText,
                        }}>
                        {y}
                      </Text>
                      <FlatGrid
                        itemDimension={width * 0.29}
                        data={formattedMemories.filter((mem) => mem.year === y)}
                        spacing={10}
                        fixed
                        renderItem={({ item, index }) => (
                          <ProfileMemory
                            view={view}
                            otherUserMemories={otherUserMemories}
                            memory={item}
                            screen={'memories'}
                            key={item.id}
                            idx={index}
                            navigation={props.navigation}
                            setPlayVideoMemoriesScreen={setPlayVideo}
                          />
                        )}
                      />
                    </>
                  );
                })}
            </View>
          )}
        </ScrollView>
      </>
    </View>
  );
};

export default MemoriesScreen;
