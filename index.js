import { checkOrSubscribeDevice } from './clients';
import { getFCMToken, notificationListener, requestUserPermission, setApplicationId } from "./utils";

export const activateNotificationListener = (appId) => {
    setApplicationId(appId);
    requestUserPermission();
    getFCMToken();
    checkOrSubscribeDevice();
    notificationListener();
}
