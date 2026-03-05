import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { NavBackIcon } from '../components/icons/NavBackIcon';
import { colors, fonts, spacing } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FlowSuccess'>;

const LAYOUT_DEBUG = false;
const stroke = LAYOUT_DEBUG ? { borderWidth: 1, borderColor: 'red' } : {};

const PIN_LENGTH = 4;

const KEYS = [
  { digit: '1', letters: '' },
  { digit: '2', letters: 'ABC' },
  { digit: '3', letters: 'DEF' },
  { digit: '4', letters: 'GHI' },
  { digit: '5', letters: 'JKL' },
  { digit: '6', letters: 'MNO' },
  { digit: '7', letters: 'PQRS' },
  { digit: '8', letters: 'TUV' },
  { digit: '9', letters: 'WXYZ' },
  null,
  { digit: '0', letters: '' },
  'delete',
] as const;

export function FlowSuccessScreen({ navigation }: Props) {
  const [pin, setPin] = useState('');

  const handleKey = (digit: string) => {
    if (pin.length < PIN_LENGTH) {
      const next = pin + digit;
      setPin(next);
      if (next.length === PIN_LENGTH) {
        setTimeout(() => {
          navigation.navigate('FlowTracker');
        }, 400);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topSection, stroke]}>
        <Pressable
          style={[styles.backButton, stroke]}
          hitSlop={12}
          onPress={() => navigation.goBack()}
        >
          <NavBackIcon size={24} color="#111111" opacity={1} />
        </Pressable>

        <View style={[styles.headerText, stroke]}>
          <Text style={[styles.sectionTitle, stroke]}>Cuenta Nu</Text>
          <Text style={[styles.screenTitle, stroke]}>Ingresa tu NIP</Text>
        </View>

        <View style={[styles.cardArea, stroke]}>
          <Image
            source={require('../../assets/nu-card.png')}
            style={[styles.card, stroke]}
            resizeMode="contain"
          />

          <View style={[styles.pinContainer, stroke]}>
            {Array.from({ length: PIN_LENGTH }).map((_, i) => (
              <View key={i} style={[styles.pinDotOuter, stroke]}>
                <View
                  style={[
                    styles.pinDot,
                    i < pin.length ? styles.pinDotFilled : styles.pinDotEmpty,
                    stroke,
                  ]}
                />
              </View>
            ))}
          </View>
        </View>

        <Text style={[styles.description, stroke]}>
          Es el número de 4 dígitos con el que autorizas transferencias en tu
          Cuenta Nubank.
        </Text>
      </View>

      <View style={styles.keyboard}>
        <View style={styles.keyGrid}>
          {KEYS.map((key, i) => {
            if (key === null) {
              return <View key={i} style={styles.keyButton} />;
            }
            if (key === 'delete') {
              return (
                <Pressable
                  key={i}
                  style={styles.keyButton}
                  onPress={handleDelete}
                >
                  <DeleteIcon />
                </Pressable>
              );
            }
            return (
              <Pressable
                key={i}
                style={styles.keyButton}
                onPress={() => handleKey(key.digit)}
              >
                <Text style={styles.keyDigit}>{key.digit}</Text>
                {key.letters ? (
                  <Text style={styles.keyLetters}>{key.letters}</Text>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function DeleteIcon() {
  return (
    <Svg width={24} height={18} viewBox="0 0 24 18" fill="none">
      <Path
        d="M9.41 1L1 9L9.41 17H23V1H9.41ZM21 15H10.23L3.83 9L10.23 3H21V15Z"
        fill="#030303"
      />
      <Path
        d="M17.29 5.29L14 8.59L10.71 5.29L9.29 6.71L12.59 10L9.29 13.29L10.71 14.71L14 11.41L17.29 14.71L18.71 13.29L15.41 10L18.71 6.71L17.29 5.29Z"
        fill="#030303"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topSection: {
    flex: 1,
    paddingTop: 56,
  },
  backButton: {
    marginLeft: spacing.x6,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    paddingTop: spacing.x4,
    paddingHorizontal: spacing.x6,
    gap: spacing.x2,
  },
  sectionTitle: {
    fontFamily: fonts.label,
    fontSize: 24,
    lineHeight: 28.8,
    letterSpacing: -0.48,
    color: '#AE77E7',
  },
  screenTitle: {
    fontFamily: fonts.label,
    fontSize: 28,
    lineHeight: 33.6,
    letterSpacing: -0.84,
    color: 'rgba(0,0,0,0.96)',
  },
  cardArea: {
    marginTop: spacing.x6,
    alignItems: 'center',
  },
  card: {
    width: 285,
    height: 130,
    borderRadius: 16,
  },
  cardLogo: {
    fontFamily: fonts.label,
    fontSize: 28,
    color: '#ffffff',
    letterSpacing: -0.56,
  },
  cardLabel: {
    fontFamily: fonts.display,
    fontSize: 12,
    lineHeight: 15.6,
    color: '#ffffff',
    letterSpacing: 0,
  },
  pinContainer: {
    marginTop: -20,
    flexDirection: 'row',
    backgroundColor: '#efefef',
    borderRadius: 12,
    width: 327,
    paddingVertical: 16,
    paddingHorizontal: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pinDotOuter: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pinDotFilled: {
    backgroundColor: 'rgba(0,0,0,0.96)',
  },
  pinDotEmpty: {
    backgroundColor: 'rgba(0,0,0,0.24)',
  },
  description: {
    marginTop: spacing.x4,
    paddingHorizontal: spacing.x6,
    fontFamily: fonts.text,
    fontSize: 14,
    lineHeight: 18.2,
    letterSpacing: -0.14,
    color: '#111111',
  },
  keyboard: {
    backgroundColor: '#d0d5db',
    paddingHorizontal: 8,
    paddingVertical: 4,
    paddingBottom: 34,
  },
  keyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keyButton: {
    width: '33.33%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
  },
  keyDigit: {
    fontSize: 24,
    color: '#030303',
    fontWeight: '400',
    lineHeight: 28,
  },
  keyLetters: {
    fontSize: 11,
    color: '#030303',
    letterSpacing: 1,
    lineHeight: 13,
    fontWeight: '400',
  },
});
