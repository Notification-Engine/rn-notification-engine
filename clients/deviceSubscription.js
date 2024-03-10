import DeviceInfo from "react-native-device-info";
import { mmkvStorage } from "../utils/mmkvStorage";

const ONBOARDING_HOST_URI = 'http://localhost:8000';
const DEVICE_MANAGER_ENDPOINT = '/device';
const DEVICE_SUBSCRIPTIONS_ENDPOINT = '/device-subscriptions';
const APP_ID = 'e5acb634-5765-4135-a54a-57725955178f';

export const checkOrSubscribeDevice = async () => {
    const uri = ONBOARDING_HOST_URI + DEVICE_MANAGER_ENDPOINT;
    const fcmToken = mmkvStorage.getString('fcmToken');
    const deviceId = await DeviceInfo.getUniqueId();
    const response = await fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            deviceId: deviceId,
            appId: APP_ID,
            fcmToken: fcmToken,
        })
    }).then(response => {
        return response.json()
    }).catch(error => {
        console.log(error);
    });
};

export const getDeviceSubscriptions = async (callback) => {
    const uri = ONBOARDING_HOST_URI + DEVICE_SUBSCRIPTIONS_ENDPOINT;
    const fcmToken = mmkvStorage.getString('fcmToken');
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            appId: APP_ID,
            fcmToken: fcmToken,
        }
    });
    const responseJson = await response.json();
    callback(responseJson.message);
    return response;
}

export const updateDeviceSubscriptions = async (subscriptionId, subscriptionStatus, callback) => {
    const uri = ONBOARDING_HOST_URI + DEVICE_SUBSCRIPTIONS_ENDPOINT;
    const fcmToken = mmkvStorage.getString('fcmToken');
    const response = await fetch(uri, {
        method: 'PUT',
        body: JSON.stringify({
            appId: APP_ID,
            fcmToken: fcmToken,
            subscriptionId: subscriptionId,
            subscriptionStatus: subscriptionStatus,
        })
    });
    callback(subscriptionStatus);
    return response;
}