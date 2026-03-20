import { useCallback } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NuDSThemeProvider } from '@nubank/nuds-vibecode-react-native';
import { CountryProvider } from './src/context';
import { HomeScreen } from './src/screens/HomeScreen';
import { OnboardingWelcomeScreen } from './src/screens/OnboardingWelcomeScreen';
import { OnboardingWelcomeScreenUS } from './src/screens/OnboardingWelcomeScreenUS';
import { FlowInputScreenUS } from './src/screens/FlowInputScreenUS';
import { FlowInputScreen } from './src/screens/FlowInputScreen';
import { FlowBankSelectionScreen } from './src/screens/FlowBankSelectionScreen';
import { FlowConfirmationScreen } from './src/screens/FlowConfirmationScreen';
import { FlowSuccessScreen } from './src/screens/FlowSuccessScreen';
import { FlowTrackerScreen } from './src/screens/FlowTrackerScreen';
import { PinwheelMockScreen } from './src/screens/PinwheelMockScreen';
import { FlowConfirmationScreenUS } from './src/screens/FlowConfirmationScreenUS';
import { DepositScreen } from './src/screens/DepositScreen';
import { MenuScreen } from './src/screens/MenuScreen';
import { OnboardingV3Screen } from './src/screens/OnboardingV3Screen';
import { FlowInputV3Screen } from './src/screens/FlowInputV3Screen';
import { FlowConfirmationV3Screen } from './src/screens/FlowConfirmationV3Screen';
import { PinChallengeV3Screen } from './src/screens/PinChallengeV3Screen';
import { FlowTrackerV3Screen } from './src/screens/FlowTrackerV3Screen';
import type { RootStackParamList } from './src/navigation/types';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Graphik-Regular': require('./assets/fonts/Graphik-Regular-Trial.otf'),
    'Graphik-Medium': require('./assets/fonts/Graphik-Medium-Trial.otf'),
    'Graphik-Semibold': require('./assets/fonts/Graphik-Semibold-Trial.otf'),
    'NuSansDisplay-Regular': require('@nubank/nuds-vibecode-react-native/assets/fonts/NuSansDisplay-Regular.otf'),
    'NuSansDisplay-Medium': require('@nubank/nuds-vibecode-react-native/assets/fonts/NuSansDisplay-Medium.otf'),
    'NuSansDisplay-Semibold': require('@nubank/nuds-vibecode-react-native/assets/fonts/NuSansDisplay-Semibold.otf'),
    'NuSansText-Regular': require('@nubank/nuds-vibecode-react-native/assets/fonts/NuSansText-Regular.otf'),
    'NuSansText-Medium': require('@nubank/nuds-vibecode-react-native/assets/fonts/NuSansText-Medium.otf'),
    'NuSansText-Semibold': require('@nubank/nuds-vibecode-react-native/assets/fonts/NuSansText-Semibold.otf'),
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
      <NuDSThemeProvider mode="light">
        <CountryProvider>
          <StatusBar style="dark" />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Deposit" component={DepositScreen} />
              <Stack.Screen
                name="Menu"
                component={MenuScreen}
                options={{ presentation: 'transparentModal', animation: 'none' }}
              />
              <Stack.Screen name="Onboarding" component={OnboardingWelcomeScreen} />
              <Stack.Screen name="OnboardingV3" component={OnboardingV3Screen} />
              <Stack.Screen name="FlowInputV3" component={FlowInputV3Screen} />
              <Stack.Screen name="FlowConfirmationV3" component={FlowConfirmationV3Screen} />
              <Stack.Screen name="PinChallengeV3" component={PinChallengeV3Screen} />
              <Stack.Screen name="FlowTrackerV3" component={FlowTrackerV3Screen} />
              <Stack.Screen name="OnboardingUS" component={OnboardingWelcomeScreenUS} />
              <Stack.Screen name="FlowInput" component={FlowInputScreen} />
              <Stack.Screen name="FlowInputUS" component={FlowInputScreenUS} />
              <Stack.Screen name="PinwheelMock" component={PinwheelMockScreen} />
              <Stack.Screen name="FlowBankSelection" component={FlowBankSelectionScreen} />
              <Stack.Screen name="FlowConfirmation" component={FlowConfirmationScreen} />
              <Stack.Screen name="FlowConfirmationUS" component={FlowConfirmationScreenUS} />
              <Stack.Screen name="FlowSuccess" component={FlowSuccessScreen} />
              <Stack.Screen name="FlowTracker" component={FlowTrackerScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </CountryProvider>
      </NuDSThemeProvider>
    </GestureHandlerRootView>
  );
}
