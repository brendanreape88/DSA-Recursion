import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FriendBirthdayPanel from '../FriendBirthdayPanel/FriendBirthdayPanel';
import VideoPlayer from 'react-native-video-controls';
import heartUnfilled from '../../../assets/icons/wishlist-unfilled.png';
import heartFilled from '../../../assets/icons/wishlist-filled.png';
import speechBubble from '../../../assets/icons/speech-bubble.png';
import playButton from '../../../assets/icons/play-button.png';
import { firebase } from '../../Core/firebase/config';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';

const Post = ({ recentPost, props }) => {
  const [post, setPost] = useState({});
  const isFocused = useIsFocused();
  const currentUserID = useSelector((state) => state.app.user.id);
  const currentUser = useSelector((state) => state.app.user);
  const [author, setAuthor] = useState(null);
  const [playVideo, setPlayVideo] = useState(false);
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentsFetched, setCommentsFetched] = useState(false);
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [message, setMessage] = useState('');
  const { width } = useWindowDimensions();
  const firebaseString = !post.referenceID ? 'id' : 'referenceID';
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const themeCommentColor = theme === 'dark' ? '#979797' : '#414141';
  const themeDividerLineColor = theme === 'dark' ? 'white' : '#D9D9D9';

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    // Fetch entire post object from recentPost data
    const fetchPost = async () => {
      const queryResponse = await firebase
        .firestore()
        .collectionGroup('posts')
        .where('referenceID', '==', recentPost.postID)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            setPost(doc.data());
            setLiked(
              doc.data().likes && doc.data().likes.indexOf(currentUserID) !== -1
                ? true
                : false,
            );
            setNumberOfLikes(doc.data().likes ? doc.data().likes.length : 0);
            setNumberOfComments(
              doc.data().numberOfComments ? doc.data().numberOfComments : 0,
            );
          });
        });
    };
    // Only fetch the post if a postID exists
    recentPost.postID && fetchPost();
  }, [recentPost, firebaseString, isFocused, currentUserID]);

  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const slidesRef = useRef(null);

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    setPlayVideo(false);
  }, [isFocused]);

  useEffect(() => {
    if (post && post.authorID) {
      if (post.authorID !== currentUserID) {
        const users = firebase.firestore().collection('users');
        users
          .doc(post.authorID)
          .get()
          .then((doc) => {
            setAuthor(doc.data());
          });
      } else {
        setAuthor(currentUser);
      }
    }
  }, [post, currentUser, currentUserID]);

  const addLike = () => {
    const postsDB = firebase
      .firestore()
      .collection(`users/${post.authorID}/posts`)
      .doc(post.referenceID || post.id);
    postsDB
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(currentUserID),
      })
      .then(() => {
        setLiked(true);
        setNumberOfLikes(numberOfLikes + 1);
      });
  };

  const removeLike = () => {
    const postsDB = firebase
      .firestore()
      .collection(`users/${post.authorID}/posts`)
      .doc(post.referenceID || post.id);
    postsDB
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(currentUserID),
      })
      .then(() => {
        setLiked(false);
        setNumberOfLikes(numberOfLikes - 1);
      });
  };

  const fetchComments = () => {
    setComments([]);
    const commentsArray = [];
    const commentsDB = firebase
      .firestore()
      .collection(
        `users/${post.authorID}/posts/${post.referenceID || post.id}/comments`,
      );
    commentsDB
      .orderBy('dateCreated', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const singleComment = {
            ...data,
            commentID: doc.id,
          };
          commentsArray.push(singleComment);
        });
        setComments(commentsArray);
        setNumberOfComments(commentsArray.length);
        setCommentsFetched(true);
      });
  };

  const postComment = () => {
    const newComment = {
      authorID: currentUser.id,
      authorFirstName: currentUser.firstName,
      authorLastName: currentUser.lastName,
      dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
      message: message,
    };
    const commentsDB = firebase
      .firestore()
      .collection(
        `users/${post.authorID}/posts/${post.referenceID || post.id}/comments`,
      );
    commentsDB
      .add(newComment)
      .then(() => {
        setMessage('');
        setShowComments(true);
      })
      .then(() => {
        const postsDB = firebase
          .firestore()
          .collection(`users/${post.authorID}/posts`)
          .doc(post.referenceID || post.id);
        postsDB.update({ numberOfComments: numberOfComments + 1 });
      })
      .then(() => {
        fetchComments();
      });
  };

  const removeComment = (commentID) => {
    const commentsDB = firebase
      .firestore()
      .collection(
        `users/${post.authorID}/posts/${post.referenceID || post.id}/comments`,
      )
      .doc(commentID);
    commentsDB
      .delete()
      .then(() => {
        const postsxRef = firebase
          .firestore()
          .collection(`users/${post.authorID}/posts`)
          .doc(post.referenceID || post.id);
        postsxRef.update({ numberOfComments: numberOfComments - 1 });
      })
      .then(() => {
        fetchComments();
      });
  };

  return (
    <View
      style={{
        backgroundColor: themeBackgroundColor,
        borderBottomWidth: 0.5,
        borderColor: themeDividerLineColor,
        ...styles.container,
      }}>
      {author && (
        <FriendBirthdayPanel
          author={author}
          navigation={props.navigation}
          authorIsCurrUser={post.authorID === currentUserID}
          themeBackgroundColor={themeBackgroundColor}
          themeElementColor={themeElementColor}
          post={post}
        />
      )}

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
        bounces={false}>
        {post.type === 'shoutout' &&
          post.video &&
          post.thumbnail &&
          (!playVideo ? (
            <>
              <Image
                source={{ uri: post.thumbnail }}
                style={{
                  height: 300,
                  resizeMode: 'cover',
                  width: width,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setPlayVideo(true);
                }}
                style={{
                  position: 'absolute',
                  left: (width - 60) * 0.5,
                  top: 120,
                }}>
                <Image source={playButton} style={{ height: 60, width: 60 }} />
              </TouchableOpacity>
            </>
          ) : (
            <VideoPlayer
              source={{ uri: post.video }}
              style={{ ...styles.video, width: width }}
            />
          ))}
        {post?.mediaArray?.[0] &&
          post?.mediaArray?.map((media) =>
            media.type === 'video' ? (
              !playVideo ? (
                <>
                  <Image
                    source={{ uri: post.thumbnail }}
                    style={{ height: 300, resizeMode: 'cover', width: width }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setPlayVideo(true);
                    }}
                    style={{
                      position: 'absolute',
                      left: (width - 60) * 0.5,
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
                  source={{ uri: media.uri }}
                  style={{ ...styles.video, width: width }}
                />
              )
            ) : (
              <Image
                source={{ uri: media.uri }}
                style={{ ...styles.image, width: width }}
                key={media.uri}
              />
            ),
          )}
        {post?.type === 'shoutout' && !post?.video && (
          <View
            style={{
              height: 300,
              width: width,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              backgroundColor: themeBackgroundColor,
            }}>
            <Text
              numberOfLines={7}
              style={{
                textAlign: 'center',
                fontSize: 30,
                color: themeElementColor,
              }}>
              {post.message}
            </Text>
          </View>
        )}
      </ScrollView>
      {post.authorID ? (
        <>
          <View
            style={{
              padding: 10,
              // borderWidth: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: themeBackgroundColor,
            }}>
            {liked ? (
              <TouchableOpacity onPress={() => removeLike()}>
                <Image
                  source={heartFilled}
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: 5,
                    tintColor: '#4AE0CD',
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => addLike()}>
                <Image
                  source={heartUnfilled}
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: 5,
                    tintColor: themeElementColor,
                  }}
                />
              </TouchableOpacity>
            )}
            <Text style={{ color: themeElementColor }}>{numberOfLikes}</Text>
            <TouchableOpacity
              onPress={() => {
                setShowComments(!showComments);
                !commentsFetched && fetchComments();
              }}>
              <Image
                source={speechBubble}
                style={{
                  height: 20,
                  width: 20,
                  marginLeft: 10,
                  marginRight: 5,
                  tintColor: themeElementColor,
                }}
              />
            </TouchableOpacity>
            <Text style={{ color: themeElementColor }}>{numberOfComments}</Text>
          </View>
          {showComments &&
            comments?.map((comment) => (
              <View
                key={comment.id}
                style={{
                  padding: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: themeBackgroundColor,
                }}>
                <Text style={{ maxWidth: '85%', color: themeElementColor }}>
                  <Text style={{ fontWeight: 'bold', marginRight: 5 }}>
                    {`${
                      comment.authorFirstName
                    } ${comment.authorLastName.charAt(0)} `}
                  </Text>
                  <Text style={{ color: themeCommentColor }}>
                    {comment.message}
                  </Text>
                </Text>
                {currentUserID === comment.authorID && (
                  <TouchableOpacity
                    onPress={() => removeComment(comment.commentID)}>
                    <Text
                      style={{
                        color: '#E5606E',
                        fontWeight: 'bold',
                        marginLeft: 5,
                      }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          <View
            style={{
              padding: 10,
              // borderWidth: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: themeBackgroundColor,
            }}>
            <TextInput
              onChangeText={(text) => setMessage(text)}
              defaultValue={message}
              placeholder="Add Comment..."
              placeholderTextColor={themeCommentColor}
              style={{
                width: width * 0.6,
                height: 25,
                borderRadius: 8,
                backgroundColor: themeBackgroundColor,
                paddingVertical: 0,
                paddingHorizontal: 10,
                color: themeCommentColor,
              }}
            />
            <TouchableOpacity onPress={() => postComment()}>
              <Text style={{ color: '#34B6A6', fontWeight: 'bold' }}>Post</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default Post;
