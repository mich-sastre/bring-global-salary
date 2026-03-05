import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Svg, { Circle, Path } from 'react-native-svg';
import { NavBackIcon } from '../components/icons/NavBackIcon';
import { NuLogoIcon } from '../components/icons/NuLogoIcon';
import { OnboardingNavBar } from '../components/OnboardingNavBar';
import { PrimaryButton } from '../components/PrimaryButton';
import { useCountry } from '../context/CountryContext';
import { colors, fonts, spacing } from '../theme';
import type { RootStackParamList } from '../navigation/types';

const stroke = {};

type Props = NativeStackScreenProps<RootStackParamList, 'FlowConfirmation'>;

const avatarSourceMx = require('../../assets/avatar-bbva.png');
const avatarAndrea = require('../../assets/avatar-andrea.png');

export function FlowConfirmationScreen({ navigation }: Props) {
  const { config } = useCountry();
  const { copy } = config;
  const isMX = config.code === 'mx';
  const [detailsExpanded, setDetailsExpanded] = useState(true);
  const [legalAccepted, setLegalAccepted] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <OnboardingNavBar onBack={() => navigation.goBack()} />
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollInner}>
        <View style={[styles.profileBlock, stroke]}>
          {isMX ? (
            <Image source={avatarAndrea} style={styles.profileAvatar} />
          ) : (
            <View style={[styles.avatarCircle, stroke]}>
              <UserIcon />
            </View>
          )}
          <Text style={[styles.accountHolder, stroke]}>{copy.confirmationAccountHolder}</Text>
          <Text style={[styles.accountType, stroke]}>{copy.confirmationAccountType}</Text>
        </View>

        <View style={[styles.mainCard, stroke]}>
          <View style={[styles.accountRow, stroke]}>
            {isMX ? (
              <Image source={avatarSourceMx} style={styles.avatarImage} />
            ) : (
              <View style={[styles.iconBubble, stroke]}>
                <BankIcon />
              </View>
            )}
            <View style={[styles.textWrap, stroke]}>
              <Text style={[styles.rowTitle, stroke]}>{copy.confirmationSourceBank}</Text>
              <Text style={[styles.rowSubtitle, stroke]}>{copy.confirmationSourceAccount}</Text>
            </View>
          </View>

          <View style={[styles.arrowDivider, stroke]}>
            <View style={styles.sideLine} />
            <ArrowDownIcon />
            <View style={styles.sideLine} />
          </View>

          <View style={[styles.accountRow, stroke]}>
            <View style={[styles.nubankBubble, stroke]}>
              <NuLogoIcon size={24} color="#820AD1" />
            </View>
            <View style={[styles.textWrap, stroke]}>
              <Text style={[styles.rowTitle, stroke]}>{copy.confirmationDestBank}</Text>
              <Text style={[styles.rowSubtitle, stroke]}>{copy.confirmationDestAccount}</Text>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.detailsHeader, stroke]}
          onPress={() => setDetailsExpanded((v) => !v)}
        >
          <Text style={[styles.detailsLabel, stroke]}>{copy.confirmationDetailsLabel}</Text>
          {detailsExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Pressable>

        {detailsExpanded && (
          <View style={[styles.detailsList, stroke]}>
            {copy.confirmationDetails.map((detail, i) => (
              <DetailItem key={i} title={detail.title} subtitle={detail.subtitle} />
            ))}
          </View>
        )}

      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.legalRow}
          onPress={() => setLegalAccepted((v) => !v)}
        >
          <View style={[styles.checkbox, legalAccepted && styles.checkboxActive]}>
            {legalAccepted && <CheckIcon />}
          </View>
          <Text style={styles.legalText}>{copy.confirmationLegalText}</Text>
        </Pressable>
        {legalAccepted ? (
          <PrimaryButton
            label={copy.confirmationCta}
            onPress={() => navigation.navigate('FlowSuccess')}
          />
        ) : (
          <View style={styles.disabledButton}>
            <Text style={styles.disabledButtonText}>{copy.confirmationCta}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

function DetailItem({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={styles.detailSubtitle}>{subtitle}</Text>
    </View>
  );
}

function UserIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={3} stroke="#111111" strokeWidth={2} strokeOpacity={0.96} />
      <Path d="M6.5 18C6.5 14.9624 8.96243 12.5 12 12.5C15.0376 12.5 17.5 14.9624 17.5 18" stroke="#111111" strokeWidth={2} strokeOpacity={0.96} strokeLinecap="round" />
    </Svg>
  );
}

function BankIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 8V10H5L5 17H7L7 10H11L11 17H13V10H17V17H19V10H21V8L12 2L3 8ZM17.3944 8H6.60555L12 4.4037L17.3944 8Z"
        fill="black"
        fillOpacity={0.96}
      />
      <Path d="M3 21V19H21V21H3Z" fill="black" fillOpacity={0.96} />
    </Svg>
  );
}

function ArrowDownIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M12 4V18" stroke="#6F5B78" strokeWidth={2} strokeLinecap="round" />
      <Path d="M6 12L12 18L18 12" stroke="#6F5B78" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronUpIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M6 14L12 8L18 14" stroke="#111111" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronDownIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M6 10L12 16L18 10" stroke="#111111" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function CheckIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M3 8L6.5 11.5L13 4.5" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 56,
  },
  navContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  profileBlock: {
    paddingTop: 24,
    alignItems: 'center',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountHolder: {
    marginTop: spacing.x4,
    fontFamily: fonts.label,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: 'rgba(0,0,0,0.96)',
  },
  accountType: {
    marginTop: spacing.x2,
    fontFamily: fonts.text,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.14,
    color: 'rgba(0,0,0,0.64)',
  },
  mainCard: {
    marginTop: spacing.x6,
    marginHorizontal: spacing.x6,
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x4,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  iconBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nubankBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ede1f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nuText: {
    color: '#820ad1',
    fontFamily: fonts.label,
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: -0.24,
  },
  textWrap: {
    marginLeft: spacing.x4,
    gap: spacing.x2,
  },
  rowTitle: {
    fontFamily: fonts.label,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: '#111111',
  },
  rowSubtitle: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: 'rgba(17,17,17,0.72)',
  },
  arrowDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.x2,
    gap: spacing.x2,
  },
  sideLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#efefef',
  },
  detailsHeader: {
    marginTop: spacing.x6 + 2,
    paddingVertical: 10,
    paddingHorizontal: spacing.x6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsLabel: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: 'rgba(17,17,17,0.72)',
  },
  detailsList: {
    marginTop: spacing.x3,
    paddingHorizontal: spacing.x6,
  },
  detailItem: {
    paddingTop: spacing.x4,
  },
  detailTitle: {
    fontFamily: fonts.label,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: '#111111',
  },
  detailSubtitle: {
    marginTop: spacing.x2,
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: 'rgba(17,17,17,0.72)',
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x4,
    marginBottom: spacing.x4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(17,17,17,0.48)',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  legalText: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: '#111111',
  },
  scrollContent: {
    flex: 1,
  },
  scrollInner: {
    paddingBottom: spacing.x6,
  },
  footer: {
    paddingHorizontal: spacing.x6,
    paddingTop: spacing.x4,
    paddingBottom: spacing.x6,
    backgroundColor: '#ffffff',
  },
  disabledButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButtonText: {
    fontFamily: fonts.label,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: 'rgba(17,17,17,0.32)',
  },
});
