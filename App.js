/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import WebView from 'react-native-webview';

const App = () => {
  return (
    // data comes from HTML javascript call on window.ReactNativeWebView.postMessage
    <WebView
      onMessage={event => {
        // data comes from Native Event
        AsyncStorage.setItem('user_id', event.nativeEvent.data);
      }}
    />
    //  Function that is invoked when the webview calls window.ReactNativeWebView.postMessage.
    //  Setting this property will inject this global into your webview.
    //  window.ReactNativeWebView.postMessage accepts one argument, data,
    // which will be available on the event object, event.nativeEvent.data. data must be a string.    />
  );
};

export default App;
