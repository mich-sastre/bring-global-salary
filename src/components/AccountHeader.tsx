import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { PersonIcon } from './icons/PersonIcon';
import { spacing, fonts } from '../theme';

type AccountHeaderProps = {
  name: string;
  accountType: string;
  style?: ViewStyle;
};

export function AccountHeader({ name, accountType, style }: AccountHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.avatar}>
        <PersonIcon size={32} color="rgba(0,0,0,0.64)" />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.type}>{accountType}</Text>
    </View>
  );
}

const AVATAR_SIZE = 72;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: spacing.x4,
    paddingHorizontal: spacing.x5,
    paddingBottom: 15,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: 64,
    backgroundColor: 'rgba(0,0,0,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  name: {
    fontFamily: fonts.label,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: 'rgba(0,0,0,0.96)',
    textAlign: 'center',
  },
  type: {
    fontFamily: fonts.text,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.14,
    color: 'rgba(0,0,0,0.64)',
    textAlign: 'center',
  },
});
