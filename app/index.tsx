import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context"
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(32)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <Animated.View style={[styles.hero, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.visual}>
          <View style={styles.docCard}>
            <View style={styles.docLine} />
            <View style={[styles.docLine, { width: '70%' }]} />
            <View style={styles.docLine} />
            <View style={[styles.docLine, { width: '85%' }]} />
            <View style={[styles.docLine, { width: '55%' }]} />
          </View>

          <View style={styles.chatBubble}>
            <View style={styles.chatLine} />
            <View style={[styles.chatLine, { width: '65%' }]} />
            <View style={styles.chatTail} />
          </View>

          <View style={styles.accentDot} />
        </View>

        <Text style={styles.title}>LectureMind</Text>
        <Text style={styles.tagline}>Turn your lecture PDFs into clear, step-by-step explanations.</Text>
      </Animated.View>

      <Animated.View style={[styles.bottom, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.85}
          onPress = {() => router.push("/upload")}
        >
          <Text style={styles.ctaText}>Try now</Text>
          <Text style={styles.ctaArrow}>→</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08080D',
    paddingHorizontal: 28,
  },
  topBar: {
    paddingTop: 16,
    alignItems: 'flex-start',
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#D4A847',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#08080D',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  visual: {
    height: 120,
    width: width - 56,
    marginBottom: 44,
    position: 'relative',
  },
  docCard: {
    position: 'absolute',
    left: 0,
    top: 12,
    width: 128,
    height: 96,
    backgroundColor: '#111118',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1C1C28',
    padding: 14,
    justifyContent: 'center',
    gap: 7,
  },
  docLine: {
    height: 3,
    width: '100%',
    backgroundColor: '#1E1E2E',
    borderRadius: 2,
  },
  chatBubble: {
    position: 'absolute',
    left: 96,
    top: 0,
    width: 144,
    backgroundColor: '#D4A847',
    borderRadius: 14,
    borderBottomLeftRadius: 3,
    padding: 14,
    gap: 7,
  },
  chatLine: {
    height: 3,
    width: '100%',
    backgroundColor: '#08080D',
    opacity: 0.25,
    borderRadius: 2,
  },
  chatTail: {
    position: 'absolute',
    bottom: -8,
    left: 10,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#D4A847',
  },
  accentDot: {
    position: 'absolute',
    right: 24,
    bottom: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D4A847',
    opacity: 0.5,
  },
  title: {
    fontSize: 44,
    fontWeight: '800',
    color: '#F0EDE6',
    letterSpacing: -1.5,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 18,
    color: '#4A4A5E',
    lineHeight: 27,
    fontWeight: '400',
  },
  bottom: {
    paddingBottom: 36,
    gap: 14,
  },
  ctaButton: {
    backgroundColor: '#D4A847',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaText: {
    color: '#08080D',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  ctaArrow: {
    color: '#08080D',
    fontSize: 18,
    fontWeight: '700',
  },
  sub: {
    color: '#2A2A3A',
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
});
