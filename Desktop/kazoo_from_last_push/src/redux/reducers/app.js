const SET_LOADER = 'SET_LOADER';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_OTHER_USER = 'UPDATE_OTHER_USER';
const UPDATE_PROFILE_VIEW = 'UPDATE_PROFILE_VIEW';
const LOGOUT = 'LOGOUT';
const UPDATE_FRIENDS = 'UPDATE_FRIENDS';
// const UPDATE_PENDING_FRIENDS = 'UPDATE_PENDING_FRIENDS';
const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
// const UPDATE_FRIEND_OF_FRIEND = 'UPDATE_FRIEND_OF_FRIEND';
const UPDATE_MEMORIES = 'UPDATE_MEMORIES';
const UPDATE_OTHER_USER_MEMORIES = 'UPDATE_OTHER_USER_MEMORIES';
const UPDATE_MEMORY_INDEX = 'UPDATE_MEMORY_INDEX';
const UPDATE_MEMORIES_VIEW = 'UPDATE_MEMORIES_VIEW';
const UPDATE_WISHLIST = 'UPDATE_WISHLIST';
const UPDATE_GIFTS = 'UPDATE_GIFTS';
const UPDATE_PIN_GIFTS_FOR = 'UPDATE_PIN_GIFTS_FOR';
const UPDATE_ITEM_TO_PIN = 'UPDATE_ITEM_TO_PIN';
const UPDATE_PINNED_ITEM_ID = 'UPDATE_PINNED_ITEM_ID';
const UPDATE_SIZING_PROFILE = 'UPDATE_SIZING_PROFILE';
const UPDATE_ADDRESSES = 'UPDATE_ADDRESSES';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const UPDATE_SHOW_KAZOO_CASH = 'UPDATE_SHOW_KAZOO_CASH';
const UPDATE_KAZOO_CASH_BALANCE = 'UPDATE_KAZOO_CASH_BALANCE';
const UPDATE_AMOUNT_OF_KAZOO_CASH_TO_USE = 'UPDATE_AMOUNT_OF_KAZOO_CASH_TO_USE';
const UPDATE_THEME = 'UPDATE_THEME';
const UPDATE_AVATAR = 'UPDATE_AVATAR';
const UPDATE_REFERRING_USER_ID = 'UPDATE_REFERRING_USER_ID';
const UPDATE_SELECTED_CATEGORY = 'UPDATE_SELECTED_CATEGORY';
const UPDATE_ACTIVE_TAB = 'UPDATE_ACTIVE_TAB';

export const logout = (data) => ({
  type: LOGOUT,
  data,
});

export const setLoader = () => ({
  type: SET_LOADER,
});

export const setUserData = (data) => ({
  type: UPDATE_USER,
  data,
});

export const setOtherUserData = (data) => ({
  type: UPDATE_OTHER_USER,
  data,
});

export const setProfileView = (data) => ({
  type: UPDATE_PROFILE_VIEW,
  data,
});

export const updateFriends = (data) => ({
  type: UPDATE_FRIENDS,
  data,
});

// export const setPendingFriends = (data) => ({
//   type: UPDATE_PENDING_FRIENDS,
//   data,
// });

export const setNotifications = (data) => ({
  type: UPDATE_NOTIFICATIONS,
  data,
});

// export const setFriendOfFriend = (data) => ({
//   type: UPDATE_FRIEND_OF_FRIEND,
//   data,
// });

export const setMemories = (data) => ({
  type: UPDATE_MEMORIES,
  data,
});

export const setOtherUserMemories = (data) => ({
  type: UPDATE_OTHER_USER_MEMORIES,
  data,
});

export const setSelectedMemoryIndex = (data) => ({
  type: UPDATE_MEMORY_INDEX,
  data,
});

export const setMemoriesView = (data) => ({
  type: UPDATE_MEMORIES_VIEW,
  data,
});

export const setWish = (data) => ({
  type: UPDATE_WISHLIST,
  data,
});

export const setGifts = (data) => ({
  type: UPDATE_GIFTS,
  data,
});

export const setPinGiftsFor = (data) => ({
  type: UPDATE_PIN_GIFTS_FOR,
  data,
});

export const setItemToPin = (data) => ({
  type: UPDATE_ITEM_TO_PIN,
  data,
});

export const setPinnedItemID = (data) => ({
  type: UPDATE_PINNED_ITEM_ID,
  data,
});

export const setSizingProfile = (data) => ({
  type: UPDATE_SIZING_PROFILE,
  data,
});

export const setAddresses = (data) => ({
  type: UPDATE_ADDRESSES,
  data,
});

export const setAddress = (data) => ({
  type: UPDATE_ADDRESS,
  data,
});

export const setShowKazooCash = (data) => ({
  type: UPDATE_SHOW_KAZOO_CASH,
  data,
});

export const setKazooCashBalance = (data) => ({
  type: UPDATE_KAZOO_CASH_BALANCE,
  data,
});

export const setAmountToUse = (data) => ({
  type: UPDATE_AMOUNT_OF_KAZOO_CASH_TO_USE,
  data,
});

export const setTheme = (data) => ({
  type: UPDATE_THEME,
  data,
});

export const setAvatar = (data) => ({
  type: UPDATE_AVATAR,
  data,
});

export const setReferringUserId = (data) => ({
  type: UPDATE_REFERRING_USER_ID,
  data,
});

export const setSelectedCategory = (data) => ({
  type: UPDATE_SELECTED_CATEGORY,
  data,
});

export const setActiveTab = (data) => ({
  type: UPDATE_ACTIVE_TAB,
  data,
});

// export const setItemsWithSizingStatus = (data) => ({
//   type: UPDATE_ITEMS_WITH_SIZING_STATUS,
//   data,
// });

const initialState = {
  isLoading: false,
  user: {},
  friends: [],
  otherUser: {},
  profileView: '',
  stripeCustomer: '',
  notifications: [],
  memories: [],
  otherUserMemories: [],
  selectedMemoryIndex: null,
  memoriesView: '',
  wishlist: [],
  gifts: [],
  pinGiftsFor: null,
  itemToPin: null,
  pinnedItemID: null,
  sizingProfile: null,
  addresses: [],
  addressToEdit: null,
  showKazooCash: false,
  kazooCashBalance: 0,
  amountOfKazooCashToUse: null,
  theme: 'dark',
  avatar: null,
  referringUserId: null,
  selectedCategory: null,
  activeTab: 'birthday',
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        isLoading: action.data,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.data.user,
        stripeCustomer: action.data.user.stripeCustomer,
      };
    case UPDATE_OTHER_USER:
      return {
        ...state,
        otherUser: action.data,
      };
    case UPDATE_PROFILE_VIEW:
      return {
        ...state,
        profileView: action.data,
      };
    case LOGOUT:
      return initialState;
    case UPDATE_FRIENDS:
      return {
        ...state,
        friends: action.data,
      };
    // case UPDATE_PENDING_FRIENDS:
    //   return {
    //     ...state,
    //     pendingFriends: action.data,
    //   };
    case UPDATE_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.data,
      };
    // case 'ADD_TO_WISHLIST':
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       wishlist: updateWishlist(state.user, action.data).wishlist,
    //     },
    //   };
    // case UPDATE_FRIEND_OF_FRIEND:
    //   return {
    //     ...state,
    //     friendOfFriend: action.data,
    //   };
    case UPDATE_MEMORIES:
      return {
        ...state,
        memories: action.data,
      };
    case UPDATE_OTHER_USER_MEMORIES:
      return {
        ...state,
        otherUserMemories: action.data,
      };
    case UPDATE_MEMORY_INDEX:
      return {
        ...state,
        selectedMemoryIndex: action.data,
      };
    case UPDATE_MEMORIES_VIEW:
      return {
        ...state,
        memoriesView: action.data,
      };
    case UPDATE_WISHLIST:
      return {
        ...state,
        wishlist: action.data,
      };
    case UPDATE_GIFTS:
      return {
        ...state,
        gifts: action.data,
      };
    case UPDATE_PIN_GIFTS_FOR:
      return {
        ...state,
        pinGiftsFor: action.data,
      };
    case UPDATE_ITEM_TO_PIN:
      return {
        ...state,
        itemToPin: action.data,
      };
    case UPDATE_PINNED_ITEM_ID:
      return {
        ...state,
        pinnedItemID: action.data,
      };
    case UPDATE_SIZING_PROFILE:
      return {
        ...state,
        sizingProfile: action.data,
      };
    case UPDATE_ADDRESSES:
      return {
        ...state,
        addresses: action.data,
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        addressToEdit: action.data,
      };
    case UPDATE_SHOW_KAZOO_CASH:
      return {
        ...state,
        showKazooCash: action.data,
      };
    case UPDATE_KAZOO_CASH_BALANCE:
      return {
        ...state,
        kazooCashBalance: action.data,
      };
    case UPDATE_AMOUNT_OF_KAZOO_CASH_TO_USE:
      return {
        ...state,
        amountOfKazooCashToUse: action.data,
      };
    case UPDATE_THEME:
      return {
        ...state,
        theme: action.data,
      };
    case UPDATE_AVATAR:
      return {
        ...state,
        avatar: action.data,
      };
    case UPDATE_REFERRING_USER_ID:
      return {
        ...state,
        referringUserId: action.data,
      };
    case UPDATE_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.data,
      };
    case UPDATE_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.data,
      };

    default:
      return state;
  }
};
