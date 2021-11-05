import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react-native';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { AppearanceProvider } from 'react-native-appearance';
import AppContainer from './screens/AppContainer';
import { setI18nConfig } from './Core/localization/IMLocalization';
import { enableScreens } from 'react-native-screens';

const store = configureStore();
// const handleLocalizationChange = () => {
//   setI18nConfig();
// };

function FallbackComponent() {
  return <div>An error has occurred</div>;
}

const myFallback = <FallbackComponent />;

const App = (props) => {
  const environment = __DEV__ ? 'development' : 'production';

  Sentry.init({
    environment: environment,
    dsn:
      'https://d2850d690c1d446eb028c9471ccf7a36@o877079.ingest.sentry.io/5827367',
  });

  enableScreens();

  useEffect(() => {
    LogBox.ignoreAllLogs();
    setI18nConfig();
  }, []);

  return (
    <Sentry.ErrorBoundary fallback={myFallback} showDialog>
      <Provider store={store}>
        <AppearanceProvider>
          <AppContainer />
        </AppearanceProvider>
      </Provider>
    </Sentry.ErrorBoundary>
  );
};

export default App;
