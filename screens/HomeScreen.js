import { Button, SafeAreaView } from "react-native";

export default HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Button
        title="Subscription Settings"
        onPress={() =>
          navigation.navigate('SubscriptionController')
        }
      />
    </SafeAreaView>
  );
}
