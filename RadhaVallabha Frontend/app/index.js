import {
  useFonts,
  BerkshireSwash_400Regular,
} from '@expo-google-fonts/berkshire-swash';
import {
  JosefinSans_700Bold,
} from '@expo-google-fonts/josefin-sans';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignUpScreen from './signup';
import { View, Text } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    BerkshireSwash_400Regular,
    JosefinSans_700Bold,
  });

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>; // optional loading screen
  }

  return (
    <SafeAreaProvider>
      <SignUpScreen />
    </SafeAreaProvider>
  );
}
