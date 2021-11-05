import React from 'react';
import { View, Text } from 'react-native';

const ShopComingSoon = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{ color: '#34B6A6', fontSize: 20 }}>Store Coming Soon</Text>
    </View>
  );
};

export default ShopComingSoon;
