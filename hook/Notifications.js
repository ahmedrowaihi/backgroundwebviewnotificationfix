import React, {useEffect} from 'react';

// 1. Import the modules.
import BackgroundFetch from 'react-native-background-fetch';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
(() => {
  // 2. Add the following useEffect hook.
  useEffect(async () => {
    console.log('Hook is Listeneing');
    // Push notifications setup (recommend extracting into separate file)
    PushNotification.configure({
      // onNotification is called when a notification is to be emitted
      onNotification: notification => console.log(notification),

      // Permissions to register for iOS
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
    });
    // Get User ID AsyncStorage

    // Background fetch setup (recommend extracting into separate file)
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // fetch interval in minutes
      },
      async taskId => {
        console.log('Received background-fetch event: ', taskId);

        // 3. Insert code you want to run in the background, for example:
        // + 1- Get USER ID from LocalStorage
        await AsyncStorage.getItem('user_id').then(user_id => {
          // + 2- Fetch Notifications FOR Specific USER by User_ID
          if (!!user_id)
            fetch(`example.any/notifications/${user_id}`)
              .then(response => {
                response.json();
              })
              .then(JSON_Notifications => {
                // Check if WE HAVE TO SET A NOTIFICATION OR NOT
                if (JSON_Notifications.NewNotificaion) {
                  // if YES
                  //   YOU HAVE TO OPTIONS
                  // Option 1 : Send Immediate Notificaion
                  // =========================================
                  // PushNotification.localNotification({
                  //     title: 'Cold Weather Alert',
                  //     message: `It's ${outsideTemperature} degrees outside.`,
                  //     playSound: true,
                  //     soundName: 'default',
                  //   });
                  // =========================================
                  // OR  Option 2:
                  // Scheduale A notificaion for Specific Time
                  // PushNotification.localNotificationSchedule({
                  // PushNotification.localNotificationSchedule({
                  //     //... You can use all the options from localNotifications
                  //     message: "My Notification Message", // (required)
                  //     date: new Date(Date.now() + 60 * 1000), // in 60 secs
                  //     allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
                  //     /* Android Only Properties */
                  //     repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
                  //   });
                }
              });
        });

        // Call finish upon completion of the background task so It restart the interval
        BackgroundFetch.finish(taskId);
      },
      //   IF BACKGROUND TASK FAILs for ANY Reason
      error => {
        console.error('RNBackgroundFetch failed to start.');
      },
    );
  }, []);
})();
