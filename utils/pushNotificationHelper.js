import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid } from 'react-native';
import { mmkvStorage } from './mmkvStorage';

const requestUserPermission = async () => {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
}

const getFCMToken = async () => {
    const fcmToken = await messaging().getToken();
    await mmkvStorage.set('fcmToken', fcmToken);
    return fcmToken;
}

const notificationListener = async () => {

    // Foreground notifications
    messaging().onMessage(async remoteMessage => {
        handleForegroundMessage(remoteMessage);
    })
}

const handleForegroundMessage = (remoteMessage) => {
    var notification = remoteMessage.notification;
    Alert.alert(notification.title, notification.body);
}

export {
    getFCMToken, notificationListener, requestUserPermission
};
