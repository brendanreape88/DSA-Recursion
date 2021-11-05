import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedMemoryIndex,
  setMemoriesView,
  setMemories,
  setOtherUserMemories,
} from '../../redux/reducers/app';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import playButton from '../../../assets/icons/play-button.png';
import { RFPercentage } from 'react-native-responsive-fontsize';
import PostedStatusCircle from './PostedStatusCircle';
import addIcon from '../../../assets/icons/add.png';

const ProfileMemory = ({
  memory,
  screen,
  navigation,
  idx,
  view,
  otherUserMemories,
  fromProfile,
}) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const themeCardColor = theme === 'dark' ? '#2B2B2B' : '#D9D9D9';
  const { width } = Dimensions.get('window');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const memories = useSelector((state) => state.app.memories);
  const dispatch = useDispatch();
  const memoryImageFromItems = memory.items ? memory.items[0].photo : null;
  const currUserProfileScreen =
    view === 'current user' && !screen ? true : false;
  const currUserMemScreen =
    view === 'current user' && screen === 'memories' ? true : false;
  const otherUserProfileScreen = view === 'friend' && !screen ? true : false;
  const otherUserMemScreen =
    view === 'friend' && screen === 'memories' ? true : false;

  return (
    <TouchableOpacity
      onPress={() => {
        if (currUserProfileScreen && memory.type !== 'link') {
          dispatch(setMemoriesView('current user'));
          dispatch(setSelectedMemoryIndex(idx));
          navigation.navigate('Memories', { fromProfile: fromProfile });
        } else if (currUserProfileScreen && memory.type === 'link') {
          dispatch(setMemoriesView('current user'));
          dispatch(setSelectedMemoryIndex(null));
          navigation.navigate('Memories', { fromProfile: fromProfile });
        } else if (currUserMemScreen) {
          const index = memories.map((mem) => mem.id).indexOf(memory.id);
          dispatch(setSelectedMemoryIndex(index));
        } else if (otherUserProfileScreen) {
          dispatch(setMemoriesView('other user'));
          dispatch(setOtherUserMemories(otherUserMemories));
          dispatch(setSelectedMemoryIndex(idx));
          navigation.navigate('Memories', { fromProfile: fromProfile });
        } else if (otherUserMemScreen) {
          const index = otherUserMemories
            .map((mem) => mem.id)
            .indexOf(memory.id);
          dispatch(setSelectedMemoryIndex(index));
        } else {
          null;
        }
      }}>
      <View
        style={{
          height: screen !== memory ? width * 0.27 : width * 0.29, // 130
          width: screen !== memory ? width * 0.27 : width * 0.29, // 130
          // flex: 1,
          borderRadius: 8,
          // borderWidth: 1,
          backgroundColor: memory.type === 'gift' ? 'white' : themeCardColor,
          marginRight: screen !== 'memories' ? 10 : 0,
          marginTop: screen !== 'memories' ? 0 : 10,
          overflow: 'hidden',
          marginLeft: screen !== 'memories' ? 10 : 0,
        }}>
        {memory?.type !== 'shoutout' &&
          (memory?.thumbnail ? (
            <>
              <Image
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: 'cover',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
                source={{ uri: memory?.thumbnail }}
              />
              <Image
                source={playButton}
                style={{
                  height: width * 0.1,
                  width: width * 0.1,
                  position: 'absolute',
                  left: '34%',
                  top: '34%',
                }}
              />
            </>
          ) : (
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: memory.type === 'custom' ? 'cover' : 'contain',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
              source={{
                uri:
                  memory.photo ||
                  (memory?.photos &&
                    memory.photos.length &&
                    memory?.photos[0]) ||
                  memoryImageFromItems,
              }}
            />
          ))}
        {memory?.type === 'shoutout' &&
          (memory?.thumbnail ? (
            <>
              <Image
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: 'cover',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}
                source={{ uri: memory?.thumbnail }}
              />
              <Image
                source={playButton}
                style={{
                  height: width * 0.1,
                  width: width * 0.1,
                  position: 'absolute',
                  left: width * 0.085,
                  top: width * 0.085,
                }}
              />
            </>
          ) : (
            <>
              <View style={{ paddingHorizontal: 5 }}>
                <Text
                  // numberOfLines={1}
                  style={{
                    fontSize: RFPercentage(1.5),
                    textAlign: 'center',
                    paddingTop: 8,
                    fontWeight: 'bold',
                    color: themeElementColor,
                  }}>
                  {memory?.senderFirstName} {memory?.senderLastName}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={5}
                  style={{
                    fontSize: RFPercentage(1.5),
                    textAlign: 'center',
                    padding: 5,
                    marginBottom: 15,
                    color: themeElementColor,
                  }}>
                  {memory?.message}
                </Text>
              </View>
            </>
          ))}
        {memory.type === 'link' && (
          <View
            style={{
              height: screen !== memory ? width * 0.27 : width * 0.29, // 130
              width: screen !== memory ? width * 0.27 : width * 0.29, // 130
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: themeBackgroundColor,
            }}>
            <View
              style={{
                borderColor: '#27C9B5',
                borderWidth: 2,
                borderRadius: 65,
                height: width * 0.1,
                width: width * 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={addIcon}
                style={{
                  height: width * 0.05,
                  width: width * 0.05,
                  tintColor: '#27C9B5',
                }}
              />
            </View>
          </View>
        )}
      </View>
      {/* <PostedStatusCircle
        isPosted={memory.posted}
        top={screen !== 'memories' ? '-5%' : '3%'}
      /> */}
    </TouchableOpacity>
  );
};

export default ProfileMemory;
