import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import arrowhead from '../../../assets/icons/arrowhead-icon.png';
import arrowheadUp from '../../../assets/icons/arrowhead-up.png';
import add from '../../../assets/icons/add.png';
import search from '../../../assets/icons/search.png';
import close from '../../../assets/icons/close.png';
// import RangeSlider from 'rn-range-slider';
// import Slider from '../RangeSlider/Slider';
// import styles from '../RangeSlider/styles';
// import Label from '../RangeSlider/Label';
// import Notch from '../RangeSlider/Notch';
// import Thumb from '../RangeSlider/Thumb';
// import Rail from '../RangeSlider/Rail';
// import RailSelected from '../RangeSlider/RailSelected';

const Filters = ({
  showFilters,
  setShowFilters,
  searchProducts,
  applyFilters,
}) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  // const themeCardColor = theme === 'dark' ? '#2B2B2B' : 'lightgrey';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const themePlaceholderTextColor = theme === 'dark' ? 'lightgrey' : '#545454';
  const themeSearchBarBackgroundColor =
    theme === 'dark' ? '#2B2B2B' : '#D9D9D9';
  const themeSearchBarElementColor = theme === 'dark' ? '#979797' : '#545454';

  // const renderThumb = useCallback(() => <Thumb />, []);
  // const renderRail = useCallback(() => <Rail />, []);
  // const renderRailSelected = useCallback(() => <RailSelected />, []);
  // const renderLabel = useCallback((value) => <Label text={value} />, []);
  // const renderNotch = useCallback(() => <Notch />, []);
  // const handleValueChange = useCallback((low, high) => {
  //   setLow(low);
  //   setHigh(high);
  // }, []);

  const { width, height } = Dimensions.get('window');
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [showSortByOptions, setShowSortByOptions] = useState(false);
  const [colors, setColors] = useState([]);
  const [sizing, setSizing] = useState([]);
  const [gender, setGender] = useState(null);
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPantsSize, setMinPantsSize] = useState(null);
  const [maxPantsSize, setMaxPantsSize] = useState(null);
  const [minShoeSize, setMinShoeSize] = useState(null);
  const [maxShoeSize, setMaxShoeSize] = useState(null);
  const [shoeSize, setShoeSize] = useState(null);

  const clearFilters = () => {
    setSearchValue('');
    setSortBy(null);
    setColors([]);
    setSizing([]);
    setGender(null);
    setCategories([]);
    setMinPrice(null);
    setMaxPrice(null);
    setMinPantsSize(null);
    setMaxPantsSize(null);
    setMinShoeSize(null);
    setMaxShoeSize(null);
    setShoeSize(null);
  };

  const filtersProfile = {
    searchValue,
    sortBy,
    colors,
    sizing,
    gender,
    categories,
    minPrice: minPrice ? parseInt(minPrice, 10) : null,
    maxPrice: maxPrice ? parseInt(maxPrice, 10) : null,
    minPantsSize,
    maxPantsSize,
    minShoeSize: minShoeSize ? parseInt(minShoeSize, 10) : null,
    maxShoeSize: maxShoeSize ? parseInt(maxShoeSize, 10) : null,
    shoeSize: shoeSize ? parseInt(shoeSize, 10) : null,
  };

  return (
    <Modal visible={showFilters} transparent={true}>
      <View
        style={{
          height: height,
          width: width,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: themeBackgroundColor,
            height: height * 0.9,
            width: width * 0.9,
            borderRadius: 20,
            alignItems: 'center',
            // padding: 10,
            borderWidth: 1,
            borderColor: themeElementColor,
          }}>
          <View
            style={{
              height: '10%',
              width: '100%',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setShowFilters(false)}
              style={{ position: 'absolute', left: '5%', top: '52%' }}>
              <Image
                source={arrowhead}
                style={{
                  height: width * 0.05,
                  width: width * 0.05,
                  tintColor: themeElementColor,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: RFPercentage(3.5),
                color: themeElementColor,
              }}>
              Filters
            </Text>
          </View>
          <ScrollView
            style={{ width: width * 0.9 }}
            contentContainerStyle={{ alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: themeSearchBarBackgroundColor,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderRadius: 8,
                width: '90%',
                height: '5%',
                paddingLeft: 10,
              }}>
              <Image
                source={search}
                style={{
                  tintColor: themeSearchBarElementColor,
                  height: width * 0.05,
                  width: width * 0.05,
                }}
              />
              <TextInput
                style={{
                  borderRadus: 8,
                  backgroundColor: themeSearchBarBackgroundColor,
                  padding: 10,
                  width: '80%',
                  color: themeElementColor,
                }}
                placeholder={'Search'}
                placeholderTextColor={themeSearchBarElementColor}
                onChangeText={(text) => setSearchValue(text)}
                onSubmitEditing={() => searchProducts(searchValue)}
                value={searchValue}
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                //   borderWidth: 1,
                height: '8%',
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1,
                marginBottom: 3,
              }}>
              <TouchableOpacity
                onPress={() => setShowSortByOptions(!showSortByOptions)}
                style={{
                  backgroundColor: '#D9D9D9',
                  height: '55%',
                  width: '30%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 8,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: RFPercentage(2),
                  }}>
                  Sort By
                </Text>
                <Image
                  source={arrowheadUp}
                  style={{
                    height: width * 0.03,
                    width: width * 0.03,
                    transform: [{ rotateX: '180deg' }],
                  }}
                />
              </TouchableOpacity>
              {showSortByOptions && (
                <View
                  style={{
                    // borderWidth: 1,
                    width: '30%',
                    position: 'absolute',
                    bottom: -20,
                    backgroundColor: '#D9D9D9',
                    borderRadius: 8,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setSortBy('Low-Hi');
                      setShowSortByOptions(false);
                    }}
                    style={{
                      backgroundColor: '#D9D9D9',
                      height: '80%',
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      paddingHorizontal: 10,
                    }}>
                    <Text
                      style={{ fontWeight: 'bold', fontSize: RFPercentage(2) }}>
                      Low-Hi
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSortBy('Hi-Low');
                      setShowSortByOptions(false);
                    }}
                    style={{
                      backgroundColor: '#D9D9D9',
                      height: '80%',
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      paddingHorizontal: 10,
                    }}>
                    <Text
                      style={{ fontWeight: 'bold', fontSize: RFPercentage(2) }}>
                      Hi-Low
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                onPress={() => clearFilters()}
                style={{
                  backgroundColor: '#D9D9D9',
                  height: '55%',
                  width: '30%',
                  borderRadius: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Image
                  source={close}
                  style={{ height: width * 0.03, width: width * 0.03 }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: RFPercentage(2) }}>
                  Clear
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                // borderWidth: 1,
                // height: '10%',
                width: '90%',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: RFPercentage(2.5),
                  marginBottom: 10,
                  color: themeElementColor,
                }}>
                Price Range
              </Text>
              {/* <Slider
                style={styles.slider}
                min={0}
                max={100}
                step={1}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
                renderNotch={renderNotch}
                onValueChanged={handleValueChange}
              /> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  // marginLeft: '2.5%',
                  // marginRight: '2.5%',
                }}>
                <TextInput
                  style={{
                    flex: 1,
                    marginRight: 10,
                    borderWidth: 0.5,
                    borderColor: themeElementColor,
                    padding: 10,
                    color: themeElementColor,
                  }}
                  placeholder={'Minimum Price'}
                  placeholderTextColor={themePlaceholderTextColor}
                  onChangeText={(minPrice) => {
                    setMinPrice(minPrice);
                  }}
                  value={minPrice}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  keyboardType={'numeric'}
                />
                <TextInput
                  style={{
                    flex: 1,
                    // marginRight: 10,
                    borderWidth: 0.5,
                    borderColor: themeElementColor,
                    padding: 10,
                    color: themeElementColor,
                  }}
                  placeholder={'Maximum Price'}
                  placeholderTextColor={themePlaceholderTextColor}
                  onChangeText={(maxPrice) => {
                    setMaxPrice(maxPrice);
                  }}
                  value={maxPrice}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  keyboardType={'numeric'}
                />
              </View>
            </View>
            <View style={{ width: '90%', marginBottom: 20 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: RFPercentage(2.5),
                  marginBottom: 10,
                  color: themeElementColor,
                }}>
                Categories
              </Text>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    if (categories.indexOf('JWqUoiIXTGcwp0tWNQMf') === -1) {
                      setCategories(['JWqUoiIXTGcwp0tWNQMf', ...categories]);
                    } else {
                      const categoryRemoved = categories.filter(
                        (category) => category !== 'JWqUoiIXTGcwp0tWNQMf',
                      );
                      setCategories(categoryRemoved);
                    }
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#D9D9D9',
                    marginLeft: '10%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: themeElementColor,
                      fontSize: RFPercentage(2),
                      fontWeight:
                        categories.indexOf('JWqUoiIXTGcwp0tWNQMf') !== -1
                          ? 'bold'
                          : 'normal',
                    }}>
                    Accessories
                  </Text>
                  <Image
                    style={{
                      height: width * 0.03,
                      width: width * 0.03,
                      tintColor:
                        categories.indexOf('JWqUoiIXTGcwp0tWNQMf') !== -1
                          ? '#4AE0CD'
                          : themeElementColor,
                    }}
                    source={add}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (categories.indexOf('VQAYOJKW2wX8OHk1A5v2') === -1) {
                      setCategories(['VQAYOJKW2wX8OHk1A5v2', ...categories]);
                    } else {
                      const categoryRemoved = categories.filter(
                        (category) => category !== 'VQAYOJKW2wX8OHk1A5v2',
                      );
                      setCategories(categoryRemoved);
                    }
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#D9D9D9',
                    marginLeft: '10%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: themeElementColor,
                      fontSize: RFPercentage(2),
                      fontWeight:
                        categories.indexOf('VQAYOJKW2wX8OHk1A5v2') !== -1
                          ? 'bold'
                          : 'normal',
                    }}>
                    Apparel
                  </Text>
                  <Image
                    style={{
                      height: width * 0.03,
                      width: width * 0.03,
                      tintColor:
                        categories.indexOf('VQAYOJKW2wX8OHk1A5v2') !== -1
                          ? '#4AE0CD'
                          : themeElementColor,
                    }}
                    source={add}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (categories.indexOf('beauty') === -1) {
                      setCategories(['beauty', ...categories]);
                    } else {
                      const categoryRemoved = categories.filter(
                        (category) => category !== 'beauty',
                      );
                      setCategories(categoryRemoved);
                    }
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#D9D9D9',
                    marginLeft: '10%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: themeElementColor,
                      fontSize: RFPercentage(2),
                      fontWeight:
                        categories.indexOf('beauty') !== -1 ? 'bold' : 'normal',
                    }}>
                    Beauty
                  </Text>
                  <Image
                    style={{
                      height: width * 0.03,
                      width: width * 0.03,
                      tintColor:
                        categories.indexOf('beauty') !== -1
                          ? '#4AE0CD'
                          : themeElementColor,
                    }}
                    source={add}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (categories.indexOf('bedandbath') === -1) {
                      setCategories(['bedandbath', ...categories]);
                    } else {
                      const categoryRemoved = categories.filter(
                        (category) => category !== 'bedandbath',
                      );
                      setCategories(categoryRemoved);
                    }
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#D9D9D9',
                    marginLeft: '10%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: themeElementColor,
                      fontSize: RFPercentage(2),
                      fontWeight:
                        categories.indexOf('bedandbath') !== -1
                          ? 'bold'
                          : 'normal',
                    }}>
                    Bed & Bath
                  </Text>
                  <Image
                    style={{
                      height: width * 0.03,
                      width: width * 0.03,
                      tintColor:
                        categories.indexOf('bedandbath') !== -1
                          ? '#4AE0CD'
                          : themeElementColor,
                    }}
                    source={add}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (categories.indexOf('sM0kyZgOrbE3N7Y3Af7X') === -1) {
                      setCategories(['sM0kyZgOrbE3N7Y3Af7X', ...categories]);
                    } else {
                      const categoryRemoved = categories.filter(
                        (category) => category !== 'sM0kyZgOrbE3N7Y3Af7X',
                      );
                      setCategories(categoryRemoved);
                    }
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#D9D9D9',
                    marginLeft: '10%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: themeElementColor,
                      fontSize: RFPercentage(2),
                      fontWeight:
                        categories.indexOf('sM0kyZgOrbE3N7Y3Af7X') !== -1
                          ? 'bold'
                          : 'normal',
                    }}>
                    Electronics
                  </Text>
                  <Image
                    style={{
                      height: width * 0.03,
                      width: width * 0.03,
                      tintColor:
                        categories.indexOf('sM0kyZgOrbE3N7Y3Af7X') !== -1
                          ? '#4AE0CD'
                          : themeElementColor,
                    }}
                    source={add}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (categories.indexOf('QfZY7cTsCBsM08poDJtH') === -1) {
                      setCategories(['QfZY7cTsCBsM08poDJtH', ...categories]);
                    } else {
                      const categoryRemoved = categories.filter(
                        (category) => category !== 'QfZY7cTsCBsM08poDJtH',
                      );
                      setCategories(categoryRemoved);
                    }
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#D9D9D9',
                    marginLeft: '10%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: themeElementColor,
                      fontSize: RFPercentage(2),
                      fontWeight:
                        categories.indexOf('QfZY7cTsCBsM08poDJtH') !== -1
                          ? 'bold'
                          : 'normal',
                    }}>
                    Footwear
                  </Text>
                  <Image
                    style={{
                      height: width * 0.03,
                      width: width * 0.03,
                      tintColor:
                        categories.indexOf('QfZY7cTsCBsM08poDJtH') !== -1
                          ? '#4AE0CD'
                          : themeElementColor,
                    }}
                    source={add}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (categories.indexOf('Cj8ZGqwXcE7R0oWq2mkq') === -1) {
                      setCategories(['Cj8ZGqwXcE7R0oWq2mkq', ...categories]);
                    } else {
                      const categoryRemoved = categories.filter(
                        (category) => category !== 'Cj8ZGqwXcE7R0oWq2mkq',
                      );
                      setCategories(categoryRemoved);
                    }
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#D9D9D9',
                    marginLeft: '10%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: themeElementColor,
                      fontSize: RFPercentage(2),
                      fontWeight:
                        categories.indexOf('Cj8ZGqwXcE7R0oWq2mkq') !== -1
                          ? 'bold'
                          : 'normal',
                    }}>
                    Gift Cards
                  </Text>
                  <Image
                    style={{
                      height: width * 0.03,
                      width: width * 0.03,
                      tintColor:
                        categories.indexOf('Cj8ZGqwXcE7R0oWq2mkq') !== -1
                          ? '#4AE0CD'
                          : themeElementColor,
                    }}
                    source={add}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (categories.indexOf('jewelry') === -1) {
                      setCategories(['jewelry', ...categories]);
                    } else {
                      const categoryRemoved = categories.filter(
                        (category) => category !== 'jewelry',
                      );
                      setCategories(categoryRemoved);
                    }
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#D9D9D9',
                    marginLeft: '10%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: themeElementColor,
                      fontSize: RFPercentage(2),
                      fontWeight:
                        categories.indexOf('jewelry') !== -1
                          ? 'bold'
                          : 'normal',
                    }}>
                    Jewelry
                  </Text>
                  <Image
                    style={{
                      height: width * 0.03,
                      width: width * 0.03,
                      tintColor:
                        categories.indexOf('jewelry') !== -1
                          ? '#4AE0CD'
                          : themeElementColor,
                    }}
                    source={add}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (categories.indexOf('sportinggoods') === -1) {
                      setCategories(['sportinggoods', ...categories]);
                    } else {
                      const categoryRemoved = categories.filter(
                        (category) => category !== 'sportinggoods',
                      );
                      setCategories(categoryRemoved);
                    }
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#D9D9D9',
                    marginLeft: '10%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: themeElementColor,
                      fontSize: RFPercentage(2),
                      fontWeight:
                        categories.indexOf('sportinggoods') !== -1
                          ? 'bold'
                          : 'normal',
                    }}>
                    Sporting Goods
                  </Text>
                  <Image
                    style={{
                      height: width * 0.03,
                      width: width * 0.03,
                      tintColor:
                        categories.indexOf('sportinggoods') !== -1
                          ? '#4AE0CD'
                          : themeElementColor,
                    }}
                    source={add}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: '90%', marginBottom: 20 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: RFPercentage(2.5),
                  marginBottom: 10,
                  color: themeElementColor,
                }}>
                Sizing
              </Text>
              <View
                style={{
                  // borderWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (sizing.indexOf('XS') === -1) {
                      setSizing(['XS', ...sizing]);
                    } else {
                      const sizeRemoved = sizing.filter(
                        (size) => size !== 'XS',
                      );
                      setSizing(sizeRemoved);
                    }
                  }}
                  style={{
                    backgroundColor:
                      sizing.indexOf('XS') === -1 ? '#D9D9D9' : '#4AE0CD',
                    //   padding: 8,
                    borderRadius: 8,
                    height: width * 0.09,
                    width: width * 0.09,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{ fontWeight: 'bold', fontSize: RFPercentage(2) }}>
                    XS
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (sizing.indexOf('S') === -1) {
                      setSizing(['S', ...sizing]);
                    } else {
                      const sizeRemoved = sizing.filter((size) => size !== 'S');
                      setSizing(sizeRemoved);
                    }
                  }}
                  style={{
                    backgroundColor:
                      sizing.indexOf('S') === -1 ? '#D9D9D9' : '#4AE0CD',
                    //   padding: 8,
                    borderRadius: 8,
                    height: width * 0.09,
                    width: width * 0.09,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{ fontWeight: 'bold', fontSize: RFPercentage(2) }}>
                    S
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (sizing.indexOf('M') === -1) {
                      setSizing(['M', ...sizing]);
                    } else {
                      const sizeRemoved = sizing.filter((size) => size !== 'M');
                      setSizing(sizeRemoved);
                    }
                  }}
                  style={{
                    backgroundColor:
                      sizing.indexOf('M') === -1 ? '#D9D9D9' : '#4AE0CD',
                    //   padding: 8,
                    borderRadius: 8,
                    height: width * 0.09,
                    width: width * 0.09,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{ fontWeight: 'bold', fontSize: RFPercentage(2) }}>
                    M
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (sizing.indexOf('L') === -1) {
                      setSizing(['L', ...sizing]);
                    } else {
                      const sizeRemoved = sizing.filter((size) => size !== 'L');
                      setSizing(sizeRemoved);
                    }
                  }}
                  style={{
                    backgroundColor:
                      sizing.indexOf('L') === -1 ? '#D9D9D9' : '#4AE0CD',
                    //   padding: 8,
                    borderRadius: 8,
                    height: width * 0.09,
                    width: width * 0.09,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{ fontWeight: 'bold', fontSize: RFPercentage(2) }}>
                    L
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (sizing.indexOf('XL') === -1) {
                      setSizing(['XL', ...sizing]);
                    } else {
                      const sizeRemoved = sizing.filter(
                        (size) => size !== 'XL',
                      );
                      setSizing(sizeRemoved);
                    }
                  }}
                  style={{
                    backgroundColor:
                      sizing.indexOf('XL') === -1 ? '#D9D9D9' : '#4AE0CD',
                    //   padding: 8,
                    borderRadius: 8,
                    height: width * 0.09,
                    width: width * 0.09,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{ fontWeight: 'bold', fontSize: RFPercentage(2) }}>
                    XL
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (sizing.indexOf('XXL') === -1) {
                      setSizing(['XXL', ...sizing]);
                    } else {
                      const sizeRemoved = sizing.filter(
                        (size) => size !== 'XXL',
                      );
                      setSizing(sizeRemoved);
                    }
                  }}
                  style={{
                    backgroundColor:
                      sizing.indexOf('XXL') === -1 ? '#D9D9D9' : '#4AE0CD',
                    //   padding: 8,
                    borderRadius: 8,
                    height: width * 0.09,
                    width: width * 0.09,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{ fontWeight: 'bold', fontSize: RFPercentage(2) }}>
                    XXL
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                // borderWidth: 1,
                height: '10%',
                width: '90%',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: RFPercentage(2.5),
                  marginBottom: 10,
                  color: themeElementColor,
                }}>
                Shoe Size
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  // marginLeft: '2.5%',
                  // marginRight: '2.5%',
                }}>
                <TextInput
                  style={{
                    flex: 1,
                    marginRight: 10,
                    borderWidth: 0.5,
                    borderColor: themeElementColor,
                    padding: 10,
                    color: themeElementColor,
                  }}
                  placeholder={'Minimum Size'}
                  placeholderTextColor={themePlaceholderTextColor}
                  onChangeText={(minShoeSize) => {
                    setMinShoeSize(minShoeSize);
                  }}
                  value={minShoeSize}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  keyboardType={'numeric'}
                />
                <TextInput
                  style={{
                    flex: 1,
                    // marginRight: 10,
                    borderWidth: 0.5,
                    borderColor: themeElementColor,
                    padding: 10,
                    color: themeElementColor,
                  }}
                  placeholder={'Maximum Size'}
                  placeholderTextColor={themePlaceholderTextColor}
                  onChangeText={(maxShoeSize) => {
                    setMaxShoeSize(maxShoeSize);
                  }}
                  value={maxShoeSize}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  keyboardType={'numeric'}
                />
              </View>
            </View>
            <View style={{ height: 300 }} />
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              applyFilters(filtersProfile);
              setShowFilters(false);
            }}
            style={{
              backgroundColor: '#4AE0CD',
              height: '7%',
              width: '90%',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 10,
            }}>
            <Text
              style={{
                color: themeBackgroundColor,
                fontWeight: 'bold',
                fontSize: RFPercentage(2.5),
              }}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Filters;
