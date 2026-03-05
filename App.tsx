import { useCallback } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CountryProvider } from './src/context';
import { OnboardingWelcomeScreen } from './src/screens/OnboardingWelcomeScreen';
import { FlowInputScreen } from './src/screens/FlowInputScreen';
import { FlowBankSelectionScreen } from './src/screens/FlowBankSelectionScreen';
import { FlowConfirmationScreen } from './src/screens/FlowConfirmationScreen';
import { FlowSuccessScreen } from './src/screens/FlowSuccessScreen';
import { FlowTrackerScreen } from './src/screens/FlowTrackerScreen';
import type { RootStackParamList } from './src/navigation/types';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <CountryProvider>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={OnboardingWelcomeScreen} />
            <Stack.Screen name="FlowInput" component={FlowInputScreen} />
            <Stack.Screen name="FlowBankSelection" component={FlowBankSelectionScreen} />
            <Stack.Screen name="FlowConfirmation" component={FlowConfirmationScreen} />
            <Stack.Screen name="FlowSuccess" component={FlowSuccessScreen} />
            <Stack.Screen name="FlowTracker" component={FlowTrackerScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CountryProvider>
    </GestureHandlerRootView>
  );
}
