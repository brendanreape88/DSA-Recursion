import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import ProductLarge from './ProductLarge';
import ProductMedium from './ProductMedium';

const RecommendedProducts = ({ onCardPress, screen }) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const wishlist = useSelector((state) => state.app.wishlist);
  const categoryId = useSelector((state) => state.app.selectedCategory);

  const coolProducts = [
    {
      id: 'aOS3yKaTngRQY0suyIHe',
      name: 'TCG Footwear Ambassador SS Band',
      price: 250,
      description: 'TCG Footwear Ambassador SS Band',
      photo:
        'https://cdn.shopify.com/s/files/1/0204/3694/products/AM139SS_01.jpg?v=1574291630',
      details: [
        'https://cdn.shopify.com/s/files/1/0204/3694/products/AM139SS_01.jpg?v=1574291630',
        'https://cdn.shopify.com/s/files/1/0204/3694/products/AM139SS_02.jpg?v=1574291630',
        'https://cdn.shopify.com/s/files/1/0204/3694/products/AM139SS_03.jpg?v=1574291630',
      ],
      categories: ['JWqUoiIXTGcwp0tWNQMf'],
      category: 'JWqUoiIXTGcwp0tWNQMf',
      colors: ['Rose Gold / Black'],
    },
    {
      id: '64vSvK8fCtCVdshG2fVF',
      name: 'Uber Gift Card',
      price: 50,
      description: 'Uber gift card for $50.',
      photo:
        'https://firebasestorage.googleapis.com/v0/b/kazoo-app.appspot.com/o/gift-cards%2FUber%20GC.jpeg?alt=media&token=eadff415-dbb6-4fa6-b277-8336a664ffa5',
      details: [
        'https://firebasestorage.googleapis.com/v0/b/kazoo-app.appspot.com/o/gift-cards%2FUber%20GC.jpeg?alt=media&token=eadff415-dbb6-4fa6-b277-8336a664ffa5',
      ],
      categories: ['Cj8ZGqwXcE7R0oWq2mkq'],
      category: 'Cj8ZGqwXcE7R0oWq2mkq',
      colors: [],
      sizes: [],
    },
    {
      id: 'K5UzAixrijSx3v0pQ09l',
      name: 'Starbucks Gift Card',
      price: 50,
      description: 'Starbucks gift card for $50.',
      photo:
        'https://firebasestorage.googleapis.com/v0/b/kazoo-app.appspot.com/o/gift-cards%2FStarbucks%20GC.jpeg?alt=media&token=65367ec2-a934-432b-bd9c-42fdc1541473',
      details: [
        'https://firebasestorage.googleapis.com/v0/b/kazoo-app.appspot.com/o/gift-cards%2FStarbucks%20GC.jpeg?alt=media&token=65367ec2-a934-432b-bd9c-42fdc1541473',
      ],
      categories: ['Cj8ZGqwXcE7R0oWq2mkq'],
      category: 'Cj8ZGqwXcE7R0oWq2mkq',
      colors: [],
      sizes: [],
    },
    {
      id: 'aa9qJ4hlM1KEg6mImysS',
      name: 'TCG Footwear Annecy (Black) w/Red Luxe Sole',
      price: 260,
      description: 'TCG Footwear Annecy (Black) w/Red Luxe Sole',
      photo:
        'https://cdn.shopify.com/s/files/1/0204/3694/products/TCG_8.15.1886891.jpg?v=1553876027',
      details: [
        'https://cdn.shopify.com/s/files/1/0204/3694/products/TCG_8.15.1886891.jpg?v=1553876027',
        'https://cdn.shopify.com/s/files/1/0204/3694/products/TCG_8.15.1886890.jpg?v=1553876027',
        'https://cdn.shopify.com/s/files/1/0204/3694/products/TCG_8.15.1886892.jpg?v=1553876027',
      ],
      categories: ['QfZY7cTsCBsM08poDJtH'],
      category: 'QfZY7cTsCBsM08poDJtH',
      colors: ['Black'],
      sizes: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    },
    {
      id: '9GHJkIf56oqrIeZ2bwFK',
      name: "Macy's Gift Card",
      price: 50,
      description: "Macy's gift card for $50.",
      photo:
        'https://firebasestorage.googleapis.com/v0/b/kazoo-app.appspot.com/o/gift-cards%2FMacys%20GC.jpeg?alt=media&token=447f2713-edb6-429e-a6ac-e31bd8069511',
      details: [
        'https://firebasestorage.googleapis.com/v0/b/kazoo-app.appspot.com/o/gift-cards%2FMacys%20GC.jpeg?alt=media&token=447f2713-edb6-429e-a6ac-e31bd8069511',
      ],
      categories: ['Cj8ZGqwXcE7R0oWq2mkq'],
      category: 'Cj8ZGqwXcE7R0oWq2mkq',
      colors: [],
      sizes: [],
    },
    {
      id: 'KHCymX5Y6VEGM5ek28Jp',
      name: 'TCG Footwear 3 Eyes of God Necklace',
      price: 40,
      description: 'TCG Footwear 3 Eyes of God Necklace',
      photo:
        'https://cdn.shopify.com/s/files/1/0204/3694/products/TCGJ-015.jpg?v=1574870234',
      details: [
        'https://cdn.shopify.com/s/files/1/0204/3694/products/TCGJ-015.jpg?v=1574870234',
        'https://cdn.shopify.com/s/files/1/0204/3694/products/TCGJ-016.jpg?v=1574870234',
        'https://cdn.shopify.com/s/files/1/0204/3694/products/TCGJ-017.jpg?v=1574870234',
      ],
      categories: ['JWqUoiIXTGcwp0tWNQMf'],
      category: 'JWqUoiIXTGcwp0tWNQMf',
      colors: [],
    },
  ];

  const wishlistCopy = [...wishlist];
  if (wishlistCopy.length > 10) {
    wishlistCopy.length = 10;
  }
  let modWishlist = wishlistCopy.map((item, index) => ({
    number: index + 1,
    ...item,
  }));

  const coolProductsCopy = [...coolProducts];
  const filteredCoolProducts =
    screen !== 'home' && categoryId
      ? coolProductsCopy.filter((item) => item.category === categoryId)
      : coolProductsCopy;
  let modCoolProducts = filteredCoolProducts.map((item, index) => ({
    number: index + 1,
    ...item,
  }));

  console.log('modCoolProducts', modCoolProducts);

  return (
    <View
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        backgroundColor: themeBackgroundColor,
      }}>
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: RFPercentage(4),
              color: themeElementColor,
              paddingBottom: 2,
              paddingLeft: 5,
            }}>
            For You
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: RFPercentage(1.25),
            color: themeElementColor,
            paddingLeft: 5,
          }}>
          Here is a list of the top recommended items for you
        </Text>
      </View>
      {screen === 'home' ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 5 }}>
          {modWishlist.length > 0
            ? modWishlist.map((product) => (
                <ProductLarge
                  product={product}
                  key={product.id}
                  onCardPress={onCardPress}
                />
              ))
            : modCoolProducts.map((product) => (
                <ProductLarge
                  product={product}
                  key={product.id}
                  onCardPress={onCardPress}
                />
              ))}
        </ScrollView>
      ) : (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 5 }}>
          {modCoolProducts.map((product) => (
            <ProductMedium
              product={product}
              key={product.id}
              onCardPress={onCardPress}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default RecommendedProducts;
