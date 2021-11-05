import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';
import { TNEmptyStateView } from '../../Core/truly-native';
//import Notifications from '../../components/WishlistNotification/Notifications';
import addIcon from '../../../assets/icons/add.png';
import styles from './styles';

const WishlistGridScreen = (props) => {
  const wishlistItems = true;
  const [items, setItems] = React.useState([
    {
      price: '$695',
      productName: 'Grado RS1e Headphones',
      imageUri:
        'https://soundapproach.com/media/catalog/product/cache/9d08971813a040f8f96067a40f75c615/r/s/rs1e-sidequarter.jpg',
    },
    {
      price: '$169.95',
      productName: 'Timberland Premium Boot',
      imageUri:
        'https://cdn.shoplightspeed.com/shops/622602/files/25026038/768x768x3/timberland-mens-6-inch-premium-waterproof-boots-tb.jpg',
    },
    {
      price: '$829',
      productName: 'iPhone 12 64GB Blue',
      imageUri:
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1604343704000',
    },
    {
      price: '$170',
      productName: 'Nike Air Max 270',
      imageUri:
        'https://i.insider.com/5e38419b5bc79c4c7d4e1192?width=906&format=jpeg',
    },
  ]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 70,
          borderBottomWidth: 0.5,
          borderColor: '#545454',
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
            style={{ height: 25, width: 25, tintColor: 'white' }}
          />
        </TouchableOpacity>
        <View
          style={{
            //borderWidth: 1,
            //borderRightWidth: 0.5,
            //borderColor: '#545454',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            //borderWidth: 1,
          }}>
          <Text
            style={{
              fontSize: 25,
              paddingBottom: 8,
              paddingTop: 30,
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
            props.navigation.navigate('Shop');
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

      {!wishlistItems ? (
        <View style={styles.defaultMessageContainer}>
          <View style={styles.defaultMessageContentContainer}>
            <Text style={styles.defaultMessageText}>
              Add items to your wishlist!
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Shop');
              }}>
              <Text style={styles.addItemsText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatGrid
          itemDimension={170}
          data={items}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          spacing={0}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                style={styles.wishlistImage}
                source={{ uri: item.imageUri }}
              />
              {/* <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={addIcon}
                  style={{ height: 25, width: 25, tintColor: '#545454' }}
                />
              </TouchableOpacity> */}
              <View style={styles.priceContainer}>
                <Text style={styles.itemprice}>{item.price}</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.productName}>{item.productName}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default WishlistGridScreen;
