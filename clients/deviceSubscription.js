import DeviceInfo from "react-native-device-info";
import { getApplicationId } from "../utils/appUtils";
import { getFCMToken } from "../utils/pushNotificationHelper";

const ONBOARDING_HOST_URI = 'http://localhost:8000';
const DEVICE_MANAGER_ENDPOINT = '/device';
const DEVICE_SUBSCRIPTIONS_ENDPOINT = '/device-subscriptions';

export const checkOrSubscribeDevice = async () => {
    const uri = ONBOARDING_HOST_URI + DEVICE_MANAGER_ENDPOINT;
    const fcmToken = await getFCMToken();
    const deviceId = await DeviceInfo.getUniqueId();
    const appId = await getApplicationId();
    const response = await fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            deviceId: deviceId,
            appId: appId,
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
    const fcmToken = await getFCMToken();
    const appId = await getApplicationId();
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            appId: appId,
            fcmToken: fcmToken,
        }
    });
    const responseJson = await response.json();
    callback(responseJson.message);
    return response;
}

export const updateDeviceSubscriptions = async (subscriptionId, subscriptionStatus, callback) => {
    const uri = ONBOARDING_HOST_URI + DEVICE_SUBSCRIPTIONS_ENDPOINT;
    const fcmToken = await getFCMToken();
    const appId = await getApplicationId();
    const response = await fetch(uri, {
        method: 'PUT',
        body: JSON.stringify({
            appId: appId,
            fcmToken: fcmToken,
            subscriptionId: subscriptionId,
            subscriptionStatus: subscriptionStatus,
        })
    });
    callback(subscriptionStatus);
    return response;
}