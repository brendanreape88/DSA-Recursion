import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import addIcon from '../../../assets/icons/add.png';

const WishlistCurrUserHeader = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '10%',
        borderBottomWidth: 0.5,
        borderColor: '#545454',
        backgroundColor: 'white',
        paddingBottom: 5,
      }}>
      <TouchableOpacity
        style={{
          //borderWidth: 1,
          //borderRightWidth: 0.5,
          //borderColor: '#545454',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          backgroundColor: 'white',
          paddingHorizontal: 20,
          //marginBottom: 10,
        }}>
        <Image
          source={addIcon}
          style={{
            height: 25,
            width: 25,
            tintColor: 'white',
            //marginBottom: 10,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          //borderWidth: 1,
          //borderRightWidth: 0.5,
          //borderColor: '#545454',
          //flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            fontSize: 25,
            //paddingBottom: 8,
            //paddingTop: 30,
            //textAlignVertical: 'bottom',
            color: '#545454',
            fontWeight: '600',
          }}>
          Wishlist
        </Text>
      </View>
      <TouchableOpacity
        style={{
          //borderWidth: 1,
          //borderRightWidth: 0.5,
          //borderColor: '#545454',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          backgroundColor: 'white',
          paddingHorizontal: 20,
        }}
        onPress={() => {
          props.navigation.navigate('Home');
        }}>
        {/* <Text
            style={{
              fontSize: 20,
              paddingBottom: 8,
              paddingTop: 30,
              color: 'black',
              //fontWeight: '600',
              paddingHorizontal: 10,
            }}>
            ADD
          </Text> */}
        <Image
          source={addIcon}
          style={{ height: 25, width: 25, tintColor: '#545454' }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default WishlistCurrUserHeader;
