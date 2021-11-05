import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import arrowheadIcon from '../../../assets/icons/arrowhead-icon.png';
import wallet from '../../../assets/icons/wallet.png';
import styles from './styles';

const KazooWalletScreen = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const kazooCashBalance = useSelector((state) => state.app.kazooCashBalance);
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image style={styles.headerIcon} source={arrowheadIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Kazoo Wallet</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={wallet}
          style={{
            height: width * 0.3,
            width: width * 0.3,
            tintColor: '#4AE0CD',
            marginBottom: 10,
          }}
        />
        <Text
          style={{
            color: '#4AE0CD',
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: 10,
          }}>
          Kazoo Cash
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            color: themeElementColor,
          }}>
          ${kazooCashBalance}
        </Text>
      </View>
    </View>
  );
};

export default KazooWalletScreen;
