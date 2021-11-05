import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Shop } from '../../components';
import arrowheadIcon from '../../../assets/icons/arrowhead-icon.png';
import cartIcon from '../../../assets/icons/shopping-cart.png';

class ShopScreen extends Component {
  constructor(props) {
    super(props);
    this.appConfig = props.route.params.appConfig;
  }

  render() {
    return (
      <>
        <View
          style={{
            height: 80,
            backgroundColor: 'white',
            //borderWidth: 1,
            borderBottomWidth: 0.5,
            borderColor: '#545454',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingBottom: 10,
          }}>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={arrowheadIcon}
              style={{
                height: 25,
                width: 25,
                tintColor: '#4AE0CD',
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              //borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 25, fontWeight: '700', color: '#545454' }}>
              Shop
            </Text>
          </View>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => {
              this.props.navigation.navigate('Shopping Bag');
            }}>
            <Image
              source={cartIcon}
              style={{ height: 30, width: 30, tintColor: '#4AE0CD' }}
            />
          </TouchableOpacity>
        </View>
        <Shop
          categories={this.props.categories}
          navigation={this.props.navigation}
          appConfig={this.appConfig}
        />
      </>
    );
  }
}

ShopScreen.propTypes = {
  navigation: PropTypes.object,
  categories: PropTypes.array,
};

const mapStateToProps = ({ products }) => {
  return {
    categories: products.categories,
  };
};

export default connect(mapStateToProps)(ShopScreen);
