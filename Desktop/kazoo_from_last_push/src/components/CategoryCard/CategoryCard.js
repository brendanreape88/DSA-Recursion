import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text, ImageBackground, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

function CategoryCard(props) {
  const { item, onCategoryPress } = props;
  const categoryPhoto = { uri: item.photo };

  return (
    <TouchableOpacity
      onPress={onCategoryPress}
      style={{
        height: 100,
        borderRadius: 5,
      }}>
      <ImageBackground
        source={categoryPhoto}
        imageStyle={{ borderRadius: 5 }}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: RFPercentage(2),
              fontWeight: 'bold',
            }}>
            {item.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

CategoryCard.propTypes = {
  item: PropTypes.object.isRequired,
  onCategoryPress: PropTypes.func,
  imageContainerStyle: PropTypes.object,
};

export default CategoryCard;
