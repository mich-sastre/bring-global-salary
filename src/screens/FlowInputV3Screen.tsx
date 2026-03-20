import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  TopBar,
  NText,
  TextField,
  Button,
  EyeSparkleIcon,
  useNuDSTheme,
} from '@nubank/nuds-vibecode-react-native';
import { useCountry } from '../context/CountryContext';
import { CountrySelector } from '../components/CountrySelector';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FlowInputV3'>;

export function FlowInputV3Screen({ navigation }: Props) {
  const theme = useNuDSTheme();
  const { activeCountry, config } = useCountry();
  const { copy } = config;
  const showInput = !config.usesThirdPartyIntegration;
  const [value, setValue] = useState('');

  const handleInputChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, '');
    setValue(digits.slice(0, 18));
  };

  const isValid = showInput ? value.length === 18 : true;

  return (
    <Box surface="screen" style={styles.container}>
      <View style={styles.floatingSelector}>
        <CountrySelector />
      </View>

      <TopBar
        title=""
        show1stAction={false}
        show2ndAction={false}
        onBackPress={() => navigation.goBack()}
        style={{ backgroundColor: 'transparent' }}
      />

      <View style={styles.titleSection}>
        <NText variant="titleMedium" tone="primary">
          {copy.inputTitle}
        </NText>
        {copy.inputSubtitle ? (
          <NText variant="subtitleMediumDefault" tone="secondary">
            {copy.inputSubtitle}
          </NText>
        ) : null}
      </View>

      <View style={styles.content}>
        {showInput && (
          <TextField
            label={copy.inputLabel}
            placeholder={copy.inputPlaceholder}
            value={value}
            onChangeText={handleInputChange}
            keyboardType="number-pad"
          />
        )}

        <View style={[styles.bannerFrame, !showInput && { paddingTop: 0 }]}>
          <View style={[styles.banner, { backgroundColor: theme.color.surface.accent.primarySubtle }]}>
            <View style={styles.bannerContent}>
              <EyeSparkleIcon size={20} color={theme.color.content.subtle} />
              <View style={styles.bannerTextWrap}>
                <NText variant="paragraphSmallDefault" tone="secondary">
                  {copy.inputCallout}
                </NText>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: theme.spacing[4], paddingVertical: theme.spacing[5] }}>
        {isValid ? (
          <Button
            label="Continuar"
            variant="primary"
            expanded
            onPress={() => navigation.navigate('FlowConfirmationV3', { inputValue: value })}
          />
        ) : (
          <View
            style={{
              height: 48,
              borderRadius: 9999,
              backgroundColor: theme.color.surface.disabled,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <NText variant="labelSmallStrong" color={theme.color.content.disabled}>
              Continuar
            </NText>
          </View>
        )}
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 47 : StatusBar.currentHeight ?? 0,
  },
  floatingSelector: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : (StatusBar.currentHeight ?? 0) + 10,
    right: 16,
    zIndex: 10,
  },
  titleSection: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 8,
  },
  content: {
    flex: 1,
  },
  bannerFrame: {
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  banner: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  bannerTextWrap: {
    flex: 1,
  },
});
