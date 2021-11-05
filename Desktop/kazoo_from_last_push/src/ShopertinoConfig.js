import { Platform } from 'react-native';
import AppStyles from './AppStyles';
import { IMLocalized, setI18nConfig } from './Core/localization/IMLocalization';

setI18nConfig();

const regexForNames = /^[a-zA-Z]{2,25}$/;
const regexForPhoneNumber = /\d{9}$/;
const ShopertinoConfig = {
  currency: '$',
  isSMSAuthEnabled: false,
  appIdentifier: 'rn-social-network-android',
  onboardingConfig: {
    welcomeTitle: IMLocalized(
      'Sign in and use Kazoo to send the perfect gift every time! All while connecting with family and friends.',
    ),
    walkthroughScreens: [
      {
        image: require('../assets/images/slide-1.jpeg'),
        icon: require('../assets/icons/kazoo-icon.png'),
        title: IMLocalized('Welcome'),
        description: IMLocalized(
          'Kazoo is the number one way to keep track of and celebrate the most important days of the year',
        ),
      },
      {
        image: require('../assets/images/slide-2.jpeg'),
        icon: require('../assets/icons/calendar.png'),
        title: IMLocalized('Calendar'),
        description: IMLocalized(
          "Add friends, special dates and even follow your favorite Celebrities with Kazoo's custom calendar and notifications.",
        ),
      },
      {
        image: require('../assets/images/slide-3.jpeg'),
        icon: require('../assets/icons/settings.png'),
        title: IMLocalized('Set up is easy'),
        description: IMLocalized(
          'Create your Kazoo account complete with sizes (hidden from other users) and cutomize a wishlist of your favorite gifts, experiences or charities.',
        ),
      },
      {
        image: require('../assets/images/slide-4.jpeg'),
        icon: require('../assets/icons/bag.png'),
        title: IMLocalized('Shop'),
        description: IMLocalized(
          'We have a unique range of items to choose from in our Kazoo Shop.',
        ),
      },
    ],
  },
  tabIcons: {
    Feed: {
      focus: AppStyles.iconSet.homefilled,
      unFocus: AppStyles.iconSet.homeUnfilled,
    },
    Discover: {
      focus: AppStyles.iconSet.search,
      unFocus: AppStyles.iconSet.search,
    },
    Chat: {
      focus: AppStyles.iconSet.commentFilled,
      unFocus: AppStyles.iconSet.commentUnfilled,
    },
    Friends: {
      focus: AppStyles.iconSet.friendsFilled,
      unFocus: AppStyles.iconSet.friendsUnfilled,
    },
    Profile: {
      focus: AppStyles.iconSet.profileFilled,
      unFocus: AppStyles.iconSet.profileUnfilled,
    },
  },
  drawerMenuConfig: {
    upperMenu: [
      {
        title: IMLocalized('HOME'),
        icon: AppStyles.iconSet.homeDrawer,
        navigationPath: 'Home',
      },
      {
        title: IMLocalized('SHOP'),
        icon: AppStyles.iconSet.shopDrawer,
        navigationPath: 'Shop',
      },
      {
        title: IMLocalized('BAG'),
        icon: AppStyles.iconSet.shoppingBagDrawer,
        navigationPath: 'ShoppingBag',
      },
      {
        title: IMLocalized('SEARCH'),
        icon: AppStyles.iconSet.searchDrawer,
        navigationPath: 'Search',
      },
      {
        title: IMLocalized('ORDERS'),
        icon: AppStyles.iconSet.orderDrawer,
        navigationPath: 'Order',
      },
      {
        title: IMLocalized('WISHLIST'),
        icon: AppStyles.iconSet.wishlistDrawer,
        navigationPath: 'Wishlist',
      },
      {
        title: IMLocalized('PROFILE'),
        icon: AppStyles.iconSet.profileDrawer,
        navigationPath: 'Profile',
      },
    ],
    lowerMenu: [
      {
        title: IMLocalized('LOGOUT'),
        icon: AppStyles.iconSet.logoutDrawer,
        action: 'logout',
      },
    ],
  },
  tosLink: 'https://www.instamobile.io/eula-instachatty/',
  editProfileFields: {
    sections: [
      {
        title: IMLocalized('PUBLIC PROFILE'),
        fields: [
          {
            displayName: IMLocalized('First Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'firstName',
            placeholder: 'Your first name',
          },
          {
            displayName: IMLocalized('Last Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'lastName',
            placeholder: 'Your last name',
          },
        ],
      },
      {
        title: IMLocalized('PRIVATE DETAILS'),
        fields: [
          {
            displayName: IMLocalized('E-mail Address'),
            type: 'text',
            editable: false,
            key: 'email',
            placeholder: 'Your email address',
          },
          {
            displayName: IMLocalized('Phone Number'),
            type: 'text',
            editable: true,
            regex: regexForPhoneNumber,
            key: 'phone',
            placeholder: 'Your phone number',
          },
        ],
      },
    ],
  },
  userSettingsFields: {
    sections: [
      {
        title: IMLocalized('GENERAL'),
        fields: [
          {
            displayName: IMLocalized('Allow Push Notifications'),
            type: 'switch',
            editable: true,
            key: 'push_notifications_enabled',
            value: true,
          },
          {
            ...(Platform.OS === 'ios'
              ? {
                  displayName: IMLocalized('Enable Face ID / Touch ID'),
                  type: 'switch',
                  editable: true,
                  key: 'face_id_enabled',
                  value: false,
                }
              : {}),
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized('Save'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsFields: {
    sections: [
      {
        title: IMLocalized('CONTACT'),
        fields: [
          {
            displayName: IMLocalized('Address'),
            type: 'text',
            editable: false,
            key: 'push_notifications_enabled',
            value: '142 Steiner Street, San Francisco, CA, 94115',
          },
          {
            displayName: IMLocalized('E-mail us'),
            value: 'florian@instamobile.io',
            type: 'text',
            editable: false,
            key: 'email',
            placeholder: 'Your email address',
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized('Call Us'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsPhoneNumber: '+16504850000',
  stripeEnv: {
    API: {
      baseURL: 'https://still-anchorage-64916.herokuapp.com/', //your copied heroku link
      timeout: 15000,
    },
  },
  stripeConfig: {
    PUBLISHABLE_KEY:
      'pk_live_51J0DiTAuoJXIrFKjbCbkkbuunl6L30ACMB0CYA6Pr8oBOM053qnpwZdXejjvQpMuU3b1rDhAcUll7VPK1ozusUxG00sDVSw3Vc', // "pk_test_..." in test mode and ""pk_live_..."" in live mode
    MERCHANT_ID: 'Your_merchant_id_goes_here',
    ANDROID_PAYMENT_MODE: 'test', // test || production
  },
  GOOGLE_SIGNIN_CONFIG: {
    SCOPES: ['https://www.googleapis.com/auth/drive.photos.readonly'],
    WEB_CLIENT_ID:
      '477993886172-k8q7s9b6fdqospl18gu1e3rfl1t8cl3u.apps.googleusercontent.com', // from google-services.json file
    OFFLINE_ACCESS: true,
  },
  FIREBASE_COLLECTIONS: {
    USERS: 'users',
    PUBLIC_USERS: 'public_users',
    USERS_PRIVATE: 'users_private',
    KAZOO_CASH: 'kazoo_cash',
    PAYMENT_METHODS: 'payment_methods',
    STRIPE_CUSTOMERS: 'stripe_customers',
    CATEGORIES: 'shopertino_categories',
    CHARGES: 'charges',
    ORDERS: 'shopertino_orders',
    SOURCES: 'sources',
    PRODUCTS: 'shopertino_products',
    SHIPPING_METHODS: 'shipping_methods',
    FRIENDS_X_REF: 'friendsxref',
    GIFTS_X_REF: 'giftsxref',
    SHOUTOUT_X_REF: 'shoutoutxref',
    NOTIFICATIONS: 'notifications',
    POSTS_X_REF: 'postsxref',
    FRIENDS: 'friends',
    ADDRESSES: 'addresses',
    FOLLOWING: 'following',
  },
};

export default ShopertinoConfig;
