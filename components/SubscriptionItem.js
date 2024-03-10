import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { updateDeviceSubscriptions } from "../clients/deviceSubscription";

export default SubscriptionItem = (props) => {
  const [isSubscribed, setIsSubscribed] = useState(props.isSubscribed)

  return (
    <View style={styles.listItemView}>
      <Text style={styles.textItem}>{props.name}</Text>
      <Switch
        onValueChange={(value) => {
          updateDeviceSubscriptions(props.id, value, setIsSubscribed)
        }}
        value={isSubscribed}
        style={styles.switch}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  },
  textItem: {
    padding: 10,
    fontSize: 12,
    height: 35,
  },
  listItemView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switch: {
    transform: [
      { scale: 0.8 }
    ]
  }
})