import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useCountry } from '../context/CountryContext';
import {
  BenefitCard,
  CARD_WIDTH,
  CARD_HEIGHT,
} from '../components/BenefitCard';
import { OnboardingNavBar } from '../components/OnboardingNavBar';
import { OnboardingHero } from '../components/OnboardingHero';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, spacing, navPaddingHorizontal } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const PAGE_DOT_SIZE_ACTIVE = 8;
const PAGE_DOT_SIZE_INACTIVE = 4;
const SCREEN_WIDTH = Dimensions.get('window').width;

const DEFAULT_BENEFITS = [
  { title: 'Benefit #1 / feature', description: 'Description' },
  { title: 'Benefit #2 / feature', description: 'Description' },
  { title: 'Benefit #3 / feature', description: 'Description' },
];

const CARD_VISUALS = [
  { color: '#9032EB', imageSource: require('../../assets/benefit-card-1.png') },
  { color: '#7B2FBF', imageSource: require('../../assets/benefit-card-2.png') },
  { color: '#6B28A3', imageSource: require('../../assets/benefit-card-3.png') },
];

type BenefitItem = {
  title: string;
  description: string;
  color: string;
  imageSource: ReturnType<typeof require>;
};

function CardSlide({ item, animationValue }: { item: BenefitItem; animationValue: SharedValue<number> }) {
  const containerStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      Math.abs(animationValue.value),
      [0, 0.3, 1],
      [24, 16, 16],
    );
    return { borderRadius, overflow: 'hidden' as const };
  });

  const blurStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      Math.abs(animationValue.value),
      [0, 0.3, 1],
      [0, 1, 1],
    );
    return { opacity };
  });

  return (
    <View style={styles.cardItem}>
      <Animated.View style={containerStyle}>
        <BenefitCard
          title={item.title}
          description={item.description}
          placeholderColor={item.color}
          imageSource={item.imageSource}
          compactLevel={0}
        />
        <Animated.View style={[StyleSheet.absoluteFill, blurStyle]}>
          <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFill} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export function OnboardingWelcomeScreen({ navigation }: Props) {
  const { config } = useCountry();
  const { copy } = config;
  const [activeIndex, setActiveIndex] = useState(0);

  const textSource = copy.benefits ?? DEFAULT_BENEFITS;
  const benefits: BenefitItem[] = CARD_VISUALS.map((visual, i) => ({
    ...visual,
    title: textSource[i]?.title ?? DEFAULT_BENEFITS[i].title,
    description: textSource[i]?.description ?? DEFAULT_BENEFITS[i].description,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <OnboardingNavBar />
      </View>
      <View style={styles.heroContainer}>
        <OnboardingHero title={copy.welcomeTitle} subtitle={copy.welcomeDescription} />
      </View>

      <View style={styles.carouselWrap}>
        <Carousel
          width={350}
          height={CARD_HEIGHT}
          style={{ width: SCREEN_WIDTH, alignSelf: 'center' }}
          data={benefits}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 310,
            parallaxAdjacentItemScale: 0.85,
          }}
          scrollAnimationDuration={400}
          // @ts-expect-error inverted works at runtime in v4
          inverted
          onSnapToItem={setActiveIndex}
          renderItem={({ item, animationValue }) => (
            <CardSlide item={item} animationValue={animationValue} />
          )}
        />
      </View>

      <View style={styles.pageControl}>
        {benefits.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                width: i === activeIndex ? PAGE_DOT_SIZE_ACTIVE : PAGE_DOT_SIZE_INACTIVE,
                height: i === activeIndex ? PAGE_DOT_SIZE_ACTIVE : PAGE_DOT_SIZE_INACTIVE,
                borderRadius: i === activeIndex ? PAGE_DOT_SIZE_ACTIVE / 2 : PAGE_DOT_SIZE_INACTIVE / 2,
                backgroundColor: i === activeIndex ? '#1f0230' : 'rgba(31,2,48,0.2)',
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          label={copy.connectBankCta}
          onPress={() => navigation.navigate('FlowInput')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 56,
  },
  navContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  heroContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingHorizontal: navPaddingHorizontal,
    paddingBottom: spacing.sm,
  },
  carouselWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  dot: {},
  footer: {
    paddingHorizontal: navPaddingHorizontal,
    paddingBottom: spacing.xl + 8,
  },
});
