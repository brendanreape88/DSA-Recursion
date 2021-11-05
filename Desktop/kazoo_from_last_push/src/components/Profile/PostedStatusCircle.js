import React from 'react';
import { View, Dimensions } from 'react-native';

const PostedStatusCircle = ({ isPosted, isSelectedMemory, top }) => {
  const { width } = Dimensions.get('window');
  return (
    <View
      style={{
        height: width * 0.05,
        width: width * 0.05,
        backgroundColor: isPosted ? '#4AE0CD' : 'white',
        borderColor: '#4AE0CD',
        borderWidth: 3,
        borderRadius: 65,
        position: 'absolute',
        top: isSelectedMemory ? '-2%' : top,
        left: isSelectedMemory ? '-2%' : '3%',
      }}
    />
  );
};

export default PostedStatusCircle;
