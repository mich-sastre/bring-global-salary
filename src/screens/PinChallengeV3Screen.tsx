import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Header,
  PinCode,
  useNuDSTheme,
} from '@nubank/nuds-vibecode-react-native';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PinChallengeV3'>;

export function PinChallengeV3Screen({ navigation }: Props) {
  const theme = useNuDSTheme();
  const [pin, setPin] = useState('');

  const handleComplete = (_value: string) => {
    setTimeout(() => {
      navigation.navigate('FlowTrackerV3');
    }, 300);
  };

  return (
    <Box surface="screen" style={styles.container}>
      <Header
        type="standard"
        title="Ingresa tu NIP"
        subtitle="No dudamos que eres tu, pero necesitamos confirmar"
        showSubtitle
        showTopBar
        showAction={false}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.pinArea}>
        <PinCode
          value={pin}
          onChange={setPin}
          onComplete={handleComplete}
          length={4}
          helperText="Es el número de 4 dígitos con el que autorizas transferencias en tu Cuenta Nu."
          autoFocus
        />
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 47 : StatusBar.currentHeight ?? 0,
  },
  pinArea: {
    flex: 1,
    paddingTop: 24,
  },
});
