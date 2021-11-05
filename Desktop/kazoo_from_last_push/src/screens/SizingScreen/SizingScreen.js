import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setSizingProfile } from '../../redux/reducers/app';
import arrowheadIcon from '../../../assets/icons/arrowhead-icon.png';
import { RFPercentage } from 'react-native-responsive-fontsize';
import styles from './styles';
import firebase from 'firebase';

const SizingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.app.user);
  const savedSizing = useSelector((state) => state.app.sizingProfile);
  const [sizing, setSizing] = useState(savedSizing ? savedSizing.sizing : []);
  const [gender, setGender] = useState(savedSizing ? savedSizing.gender : null);
  const [minPantsSize, setMinPantsSize] = useState(
    savedSizing ? savedSizing.minPantsSize : null,
  );
  const [maxPantsSize, setMaxPantsSize] = useState(
    savedSizing ? savedSizing.maxPantsSize : null,
  );
  const [shoeSize, setShoeSize] = useState(
    savedSizing ? savedSizing.shoeSize : null,
  );
  const [buttonText, setButtonText] = useState('Apply Changes');

  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const { height, width } = Dimensions.get('window');

  const uploadSizing = () => {
    const newSizingProfile = {
      sizing: sizing,
      gender: gender,
      minPantsSize: minPantsSize,
      maxPantsSize: maxPantsSize,
      shoeSize: shoeSize,
    };

    if (!savedSizing) {
      const sizingDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/sizing`);
      sizingDB
        .doc('sizing')
        .set(newSizingProfile)
        .then(() => {
          console.log('sizing profile uploaded!');
          dispatch(setSizingProfile(newSizingProfile));
          setButtonText('Success!');
        });
    } else {
      const sizingDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/sizing`);
      sizingDB
        .doc('sizing')
        .delete()
        .then(() => {
          sizingDB
            .doc('sizing')
            .set(newSizingProfile)
            .then(() => {
              console.log('sizing profile uploaded!');
              dispatch(setSizingProfile(newSizingProfile));
              setButtonText('Success!');
            });
        });
    }
  };

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.goBack();
            if (buttonText === 'Success!') {
              setButtonText('Apply Changes');
            }
          }}>
          <Image style={styles.headerIcon} source={arrowheadIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Sizing</Text>
      </View>
      <View
        style={{
          height: '10%',
          width: '100%',
          marginBottom: 10,
          alignItems: 'center',
        }}>
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '95%',
            marginTop: 10,
            padding: 10,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (buttonText === 'Success!') {
                setButtonText('Apply Changes');
              }
              if (sizing.indexOf('XS') === -1) {
                setSizing(['XS', ...sizing]);
              } else {
                const sizeRemoved = sizing.filter((size) => size !== 'XS');
                setSizing(sizeRemoved);
              }
            }}
            style={{
              backgroundColor:
                sizing.indexOf('XS') === -1 ? '#D9D9D9' : '#4AE0CD',
              //   padding: 8,
              borderRadius: 8,
              height: width * 0.09,
              width: width * 0.09,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#545454',
                fontWeight: 'bold',
                fontSize: RFPercentage(2),
              }}>
              XS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (buttonText === 'Success!') {
                setButtonText('Apply Changes');
              }
              if (sizing.indexOf('S') === -1) {
                setSizing(['S', ...sizing]);
              } else {
                const sizeRemoved = sizing.filter((size) => size !== 'S');
                setSizing(sizeRemoved);
              }
            }}
            style={{
              backgroundColor:
                sizing.indexOf('S') === -1 ? '#D9D9D9' : '#4AE0CD',
              //   padding: 8,
              borderRadius: 8,
              height: width * 0.09,
              width: width * 0.09,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#545454',
                fontWeight: 'bold',
                fontSize: RFPercentage(2),
              }}>
              S
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (buttonText === 'Success!') {
                setButtonText('Apply Changes');
              }
              if (sizing.indexOf('M') === -1) {
                setSizing(['M', ...sizing]);
              } else {
                const sizeRemoved = sizing.filter((size) => size !== 'M');
                setSizing(sizeRemoved);
              }
            }}
            style={{
              backgroundColor:
                sizing.indexOf('M') === -1 ? '#D9D9D9' : '#4AE0CD',
              //   padding: 8,
              borderRadius: 8,
              height: width * 0.09,
              width: width * 0.09,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#545454',
                fontWeight: 'bold',
                fontSize: RFPercentage(2),
              }}>
              M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (buttonText === 'Success!') {
                setButtonText('Apply Changes');
              }
              if (sizing.indexOf('L') === -1) {
                setSizing(['L', ...sizing]);
              } else {
                const sizeRemoved = sizing.filter((size) => size !== 'L');
                setSizing(sizeRemoved);
              }
            }}
            style={{
              backgroundColor:
                sizing.indexOf('L') === -1 ? '#D9D9D9' : '#4AE0CD',
              //   padding: 8,
              borderRadius: 8,
              height: width * 0.09,
              width: width * 0.09,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#545454',
                fontWeight: 'bold',
                fontSize: RFPercentage(2),
              }}>
              L
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (buttonText === 'Success!') {
                setButtonText('Apply Changes');
              }
              if (sizing.indexOf('XL') === -1) {
                setSizing(['XL', ...sizing]);
              } else {
                const sizeRemoved = sizing.filter((size) => size !== 'XL');
                setSizing(sizeRemoved);
              }
            }}
            style={{
              backgroundColor:
                sizing.indexOf('XL') === -1 ? '#D9D9D9' : '#4AE0CD',
              //   padding: 8,
              borderRadius: 8,
              height: width * 0.09,
              width: width * 0.09,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#545454',
                fontWeight: 'bold',
                fontSize: RFPercentage(2),
              }}>
              XL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (buttonText === 'Success!') {
                setButtonText('Apply Changes');
              }
              if (sizing.indexOf('XXL') === -1) {
                setSizing(['XXL', ...sizing]);
              } else {
                const sizeRemoved = sizing.filter((size) => size !== 'XXL');
                setSizing(sizeRemoved);
              }
            }}
            style={{
              backgroundColor:
                sizing.indexOf('XXL') === -1 ? '#D9D9D9' : '#4AE0CD',
              //   padding: 8,
              borderRadius: 8,
              height: width * 0.09,
              width: width * 0.09,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#545454',
                fontWeight: 'bold',
                fontSize: RFPercentage(2),
              }}>
              XXL
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            // height: '10%',
            width: '95%',
            marginBottom: 10,
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
            paddingBottom: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: RFPercentage(3),
              marginBottom: 10,
              color: themeElementColor,
            }}>
            Gender
          </Text>
          <View
            style={{
              // borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                if (buttonText === 'Success!') {
                  setButtonText('Apply Changes');
                }
                setGender(gender === "Women's" ? null : "Women's");
              }}
              style={{
                backgroundColor: gender === "Women's" ? '#4AE0CD' : '#D9D9D9',
                padding: 8,
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: '#545454',
                  fontWeight: 'bold',
                  fontSize: RFPercentage(2),
                }}>
                Women's
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (buttonText === 'Success!') {
                  setButtonText('Apply Changes');
                }
                setGender(gender === "Men's" ? null : "Men's");
              }}
              style={{
                backgroundColor: gender === "Men's" ? '#4AE0CD' : '#D9D9D9',
                padding: 8,
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: '#545454',
                  fontWeight: 'bold',
                  fontSize: RFPercentage(2),
                }}>
                Men's
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (buttonText === 'Success!') {
                  setButtonText('Apply Changes');
                }
                setGender(gender === "Kid's" ? null : "Kid's");
              }}
              style={{
                backgroundColor: gender === "Kid's" ? '#4AE0CD' : '#D9D9D9',
                padding: 8,
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: '#545454',
                  fontWeight: 'bold',
                  fontSize: RFPercentage(2),
                }}>
                Kid's
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (buttonText === 'Success!') {
                  setButtonText('Apply Changes');
                }
                setGender(gender === 'Unisex' ? null : 'Unisex');
              }}
              style={{
                backgroundColor: gender === 'Unisex' ? '#4AE0CD' : '#D9D9D9',
                padding: 8,
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: '#545454',
                  fontWeight: 'bold',
                  fontSize: RFPercentage(2),
                }}>
                Unisex
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            // height: '10%',
            width: '95%',
            marginBottom: 10,
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
            paddingBottom: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: RFPercentage(3),
              marginBottom: 10,
              color: themeElementColor,
            }}>
            Pants Size
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginLeft: '2.5%',
              marginRight: '2.5%',
            }}>
            <TextInput
              style={{
                flex: 1,
                marginRight: 10,
                borderWidth: 0.5,
                borderColor: themeElementColor,
                padding: 10,
                color: themeElementColor,
              }}
              placeholder={'Minimum Size'}
              placeholderTextColor={themeElementColor}
              onChangeText={(minPantsSize) => {
                if (buttonText === 'Success!') {
                  setButtonText('Apply Changes');
                }
                setMinPantsSize(minPantsSize);
              }}
              value={minPantsSize}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="numeric"
            />
            <TextInput
              style={{
                flex: 1,
                // marginRight: 10,
                borderWidth: 0.5,
                borderColor: themeElementColor,
                padding: 10,
                color: themeElementColor,
              }}
              placeholder={'Maximum Size'}
              placeholderTextColor={themeElementColor}
              onChangeText={(maxPantsSize) => {
                if (buttonText === 'Success!') {
                  setButtonText('Apply Changes');
                }
                setMaxPantsSize(maxPantsSize);
              }}
              value={maxPantsSize}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="numeric"
            />
          </View>
        </View>
        <View
          style={{
            // height: '10%',
            width: '95%',
            marginBottom: 10,
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
            paddingBottom: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: RFPercentage(3),
              marginBottom: 10,
              color: themeElementColor,
            }}>
            Shoe Size
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginLeft: '2.5%',
            }}>
            <TextInput
              style={{
                flex: 1,
                marginRight: 10,
                borderWidth: 0.5,
                borderColor: themeElementColor,
                padding: 10,
                color: themeElementColor,
              }}
              placeholder={'Enter your size here'}
              placeholderTextColor={themeElementColor}
              onChangeText={(shoeSize) => {
                if (buttonText === 'Success!') {
                  setButtonText('Apply Changes');
                }
                setShoeSize(shoeSize);
              }}
              value={shoeSize}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
      {buttonText === 'Apply Changes' ? (
        <TouchableOpacity
          onPress={() => uploadSizing()}
          style={{
            backgroundColor: '#4AE0CD',
            height: height * 0.05,
            width: width * 0.9,
            //   marginHorizontal: '5%',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: height * 0.1,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: RFPercentage(3),
            }}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            backgroundColor: '#4AE0CD',
            height: height * 0.05,
            width: width * 0.9,
            //   marginHorizontal: '5%',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: height * 0.1,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: RFPercentage(3),
            }}>
            {buttonText}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SizingScreen;
