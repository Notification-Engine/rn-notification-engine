import { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { getDeviceSubscriptions } from "../clients/deviceSubscription";
import SubscriptionItem from "../components/SubscriptionItem";

export default SubscriptionControllerScreen = ({ navigation, route }) => {

  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getDeviceSubscriptions(setSubscriptions)
  }, [])

  return (
    <SafeAreaView>
      <FlatList
        data={subscriptions}
        renderItem={({ item }) => {
          return (
            <SubscriptionItem id={item.id} name={item.name} isSubscribed={item.is_subscribed} />
          )
        }}
      />
    </SafeAreaView>
  );
}