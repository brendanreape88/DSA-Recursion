import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';
import heartUnfilled from '../../../../assets/icons/wishlist-unfilled.png';
import heartFilled from '../../../../assets/icons/wishlist-filled.png';
import dynamicStyles from './styles';

function Favourite(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { favouriteContainerStyle, isFav, onPress } = props;

  return (
    <View style={[styles.favouriteIconContainer, favouriteContainerStyle]}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.favouriteIcon}
          source={isFav ? heartFilled : heartUnfilled}
        />
      </TouchableOpacity>
    </View>
  );
}

Favourite.propTypes = {
  favouriteContainerStyle: PropTypes.object,
  iconSource: PropTypes.any,
  onPress: PropTypes.func,
  isFavourite: PropTypes.bool,
};

export default Favourite;
