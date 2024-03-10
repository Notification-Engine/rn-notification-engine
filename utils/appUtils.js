import { mmkvStorage } from "./mmkvStorage"

export const setApplicationId = (appId) => {
    mmkvStorage.set('rn-notification-app-id', appId)
}

export const getApplicationId = () => {
    return mmkvStorage.getString('rn-notification-app-id')
}