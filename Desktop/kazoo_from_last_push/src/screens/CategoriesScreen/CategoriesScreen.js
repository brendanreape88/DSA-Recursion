import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { useSelector } from 'react-redux';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Header from '../../components/Headers/Header/Header';

const CategoriesScreen = (props) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const { width } = Dimensions.get('window');
  const showKazooCash = useSelector((state) => state.app.showKazooCash);
  const kazooCash = useSelector((state) => state.app.kazooCashBalance);
  const categories = useSelector((state) => state.products.categories);

  const onCategoryPress = (item) => {
    props.navigation.navigate('CategoryProductGrid', {
      title: item.name,
      categoryId: item.id,
      products: item.products,
      appConfig: this.appConfig,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: themeBackgroundColor }}>
      <Header navigation={props.navigation} route={props.route} />
      <View style={{ flex: 1 }}>
        {showKazooCash && (
          <View
            style={{
              position: 'absolute',
              right: 9,
              top: '1.5%',
              borderWidth: 1,
              borderColor: '#E5606E',
              borderRadius: 20,
              backgroundColor: themeBackgroundColor,
              zIndex: 100,
              padding: 5,
              marginRight: 3,
            }}>
            <Text style={{ color: themeElementColor }}>${kazooCash}</Text>
          </View>
        )}
        <FlatGrid
          itemDimension={width * 0.45}
          data={categories}
          style={{
            flex: 1,
          }}
          spacing={5}
          renderItem={({ item }) => (
            <CategoryCard
              item={item}
              onCategoryPress={() => onCategoryPress(item)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default CategoriesScreen;
