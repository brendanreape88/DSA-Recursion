import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const newAppStyles = StyleSheet.create({
  avatarLarge: {
    height: width * 0.25,
    width: width * 0.25,
    borderRadius: 65,
    borderWidth: 2,
  },
  avatarMedium: {
    height: width * 0.18,
    width: width * 0.18,
    borderRadius: 65,
    borderWidth: 2,
  },
  avatarSmall: {
    height: width * 0.12,
    width: width * 0.12,
    borderRadius: 65,
    borderWidth: 2,
  },
  bottomTabBar: {
    height: '10%',
  },
  header: {
    height: '10%',
    padding: 10,
  },
  headerTitle: {
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
  },
  headerIcon: {
    height: width * 0.06,
    width: width * 0.06,
  },
});

export default newAppStyles;
