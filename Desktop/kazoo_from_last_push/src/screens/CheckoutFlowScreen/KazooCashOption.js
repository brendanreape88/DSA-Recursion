import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

const KazooCashOption = ({
  useKazooCash,
  updateUseKazooCash,
  updateKazooCash,
}) => {
  const subTotalPrice = useSelector((state) => state.checkout.subTotalPrice);
  const kazooCashBalance = useSelector((state) => state.app.kazooCashBalance);
  const coversPurchase = subTotalPrice <= kazooCashBalance ? true : false;
  const amountOfKazooCashToUse = coversPurchase
    ? subTotalPrice
    : kazooCashBalance;
  const remainingKazooCashBalance = kazooCashBalance - subTotalPrice;
  const remainingTotal = subTotalPrice - kazooCashBalance;
  const kazooCashText = coversPurchase
    ? `This will cover your purchase and leave you with a Kazoo Cash balance of $${remainingKazooCashBalance}. Please click "NEXT" to complete your purchase.`
    : `A $${kazooCashBalance} credit will be applied to your total. Please select a payment option and click "NEXT" to complete your purchase.`;
  const { width } = Dimensions.get('window');
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  return (
    <TouchableOpacity
      onPress={() => {
        if (useKazooCash) {
          updateUseKazooCash(false);
          updateKazooCash(null);
        } else {
          updateUseKazooCash(true);
          updateKazooCash(amountOfKazooCashToUse);
        }
      }}
      style={{
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'lightgrey',
        backgroundColor: themeBackgroundColor,
        marginTop: 15,
        padding: 15,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            borderWidth: 2,
            borderRadius: 65,
            borderColor: useKazooCash ? '#4AE0CD' : 'lightgrey',
            marginRight: 20,
          }}>
          <View
            style={{
              backgroundColor: useKazooCash ? '#4AE0CD' : themeBackgroundColor,
              height: width * 0.03,
              width: width * 0.03,
              borderRadius: 65,
              margin: 3,
            }}
          />
        </View>
        <Text style={{ color: themeElementColor }}>
          Apply Kazoo Cash To Purchase
        </Text>
      </View>
      {useKazooCash && (
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color: themeElementColor,
          }}>
          {kazooCashText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default KazooCashOption;
