import React, { useState } from 'react';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CalloutBox } from '../components/CalloutBox';
import { FlowScreenLayout } from '../components/FlowScreenLayout';
import { PayrollInput } from '../components/PayrollInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { useCountry } from '../context/CountryContext';
import { spacing } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FlowInput'>;

export function FlowInputScreen({ navigation }: Props) {
  const { activeCountry, config } = useCountry();
  const { copy } = config;
  const [value, setValue] = useState('');
  const isValid = value.length >= 6;
  const showInput = !config.usesThirdPartyIntegration;
  const canContinue = showInput ? isValid : true;

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    if (activeCountry === 'br') {
      navigation.navigate('FlowBankSelection');
      return;
    }

    navigation.navigate('FlowConfirmation');
  };

  return (
    <FlowScreenLayout
      title={copy.inputTitle}
      subtitle={copy.inputSubtitle}
      onBack={() => navigation.goBack()}
    >
      <View style={{ flex: 1, paddingTop: spacing.x4 }}>
        {showInput && (
          <PayrollInput
            label={copy.inputLabel}
            placeholder={copy.inputPlaceholder}
            value={value}
            onChangeText={setValue}
            validated={isValid}
          />
        )}
        {copy.inputCallout ? (
          <View style={{ paddingHorizontal: spacing.x6 }}>
            <CalloutBox text={copy.inputCallout} />
          </View>
        ) : null}
      </View>

      <View style={{ paddingHorizontal: spacing.x6, paddingBottom: spacing.xl + 8 }}>
        <PrimaryButton label={copy.inputCta} onPress={handleContinue} />
      </View>
    </FlowScreenLayout>
  );
}
