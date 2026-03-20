import React, { useState } from 'react';
import { Image, Platform, Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  TopBar,
  NText,
  Avatar,
  Button,
  ArrowDownIcon,
  ExpandLessIcon,
  ExpandMoreIcon,
  useNuDSTheme,
} from '@nubank/nuds-vibecode-react-native';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FlowConfirmationV3'>;

const avatarAndrea = require('../../assets/avatar-andrea.png');
const avatarBbva = require('../../assets/avatar-bbva.png');
const avatarNu = require('../../assets/avatar-nu.png');

const stroke = {};

export function FlowConfirmationV3Screen({ navigation, route }: Props) {
  const theme = useNuDSTheme();
  const inputValue = route.params?.inputValue ?? '';
  const [detailsExpanded, setDetailsExpanded] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <Box surface="screen" style={[styles.container, stroke]}>
      <TopBar
        title=""
        show1stAction={false}
        show2ndAction={false}
        onBackPress={() => navigation.goBack()}
        style={{ backgroundColor: 'transparent' }}
      />

      <View style={[styles.progressTrack, stroke]}>
        <View style={[styles.progressFill, { backgroundColor: theme.color.surface.accent.primary }, stroke]} />
      </View>

      <ScrollView
        style={[styles.scroll, stroke]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile section */}
        <View style={[styles.profileSection, stroke]}>
          <Image source={avatarAndrea} style={[styles.profileAvatar, stroke]} />
          <View style={[styles.profileText, stroke]}>
            <NText variant="labelSmallStrong" style={{ textAlign: 'center' }}>
              Andrea Jiménez
            </NText>
            <NText variant="paragraphSmallDefault" tone="secondary" style={{ textAlign: 'center' }}>
              Cuenta de nómina
            </NText>
          </View>
        </View>

        {/* Banks transfer card */}
        <View style={[styles.bankCardWrapper, stroke]}>
          <View style={[styles.bankCard, { borderColor: theme.color.border.default }, stroke]}>
            {/* Source bank */}
            <View style={[styles.bankRow, stroke]}>
              <Image source={avatarBbva} style={[styles.bankAvatar, stroke]} />
              <View style={[styles.bankInfo, stroke]}>
                <NText variant="labelSmallStrong">BBVA</NText>
                <NText variant="paragraphSmallDefault" tone="secondary">
                  {inputValue || '182 945 62 349092876 7'}
                </NText>
              </View>
            </View>

            {/* Arrow divider */}
            <View style={[styles.arrowDivider, stroke]}>
              <View style={[styles.dividerLine, { backgroundColor: theme.color.border.default }, stroke]} />
              <ArrowDownIcon size={24} color={theme.color.content.subtle} />
              <View style={[styles.dividerLine, { backgroundColor: theme.color.border.default }, stroke]} />
            </View>

            {/* Destination bank */}
            <View style={[styles.bankRow, stroke]}>
              <Image source={avatarNu} style={[styles.bankAvatar, stroke]} />
              <View style={[styles.bankInfo, stroke]}>
                <NText variant="labelSmallStrong">Nu</NText>
                <NText variant="paragraphSmallDefault" tone="secondary">
                  282 945 62 349032879 8
                </NText>
              </View>
            </View>
          </View>
        </View>

        {/* Details section */}
        <Pressable
          style={[styles.detailsHeader, stroke]}
          onPress={() => setDetailsExpanded(!detailsExpanded)}
        >
          <NText variant="labelSmallStrong" style={{ flex: 1 }}>
            Detalles de portabilidad
          </NText>
          {detailsExpanded
            ? <ExpandLessIcon size={20} color={theme.color.content.subtle} />
            : <ExpandMoreIcon size={20} color={theme.color.content.subtle} />
          }
        </Pressable>

        {detailsExpanded && (
          <View style={[styles.detailsList, stroke]}>
            <View style={[styles.detailRow, stroke]}>
              <NText variant="labelSmallStrong">Fecha de nacimiento</NText>
              <NText variant="paragraphSmallDefault" tone="secondary">25 Junio 2004</NText>
            </View>
          </View>
        )}

      </ScrollView>

      {/* Terms checkbox — sticky above button */}
      <Pressable
        style={[styles.termsRow, stroke]}
        onPress={() => setTermsAccepted(!termsAccepted)}
      >
        <View
          style={[
            styles.checkbox,
            {
              borderColor: termsAccepted
                ? theme.color.surface.accent.primary
                : theme.color.border.strong,
              backgroundColor: termsAccepted
                ? theme.color.surface.accent.primary
                : 'transparent',
            },
          ]}
        >
          {termsAccepted && (
            <NText variant="labelSmallStrong" color="#fff" style={{ fontSize: 12 }}>
              ✓
            </NText>
          )}
        </View>
        <NText variant="paragraphSmallDefault" tone="secondary" style={{ flex: 1 }}>
          Acepto términos en condiciones
        </NText>
      </Pressable>

      {/* Bottom bar with disabled/enabled button */}
      <View style={[{ paddingHorizontal: theme.spacing[4], paddingTop: theme.spacing[5], paddingBottom: theme.spacing[5] }, stroke]}>
        {termsAccepted ? (
          <Button
            label="Traer mi nómina"
            variant="primary"
            expanded
            onPress={() => navigation.navigate('PinChallengeV3')}
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
              Traer mi nómina
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
  progressTrack: {
    height: 4,
    backgroundColor: '#E8E8E8',
    marginHorizontal: 100,
    borderRadius: 2,
    marginTop: -8,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    width: '66%',
    borderRadius: 2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  profileText: {
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  bankCardWrapper: {
    paddingHorizontal: 24,
  },
  bankCard: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  bankAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  bankInfo: {
    flex: 1,
    gap: 4,
  },
  arrowDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 12,
  },
  detailsList: {
    paddingHorizontal: 20,
  },
  detailRow: {
    gap: 4,
    paddingVertical: 8,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
