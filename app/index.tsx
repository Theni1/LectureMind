import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(32)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      
      <Animated.View
        style={[
          styles.hero,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.blobLarge} />
        <View style={styles.blobSmall} />

        <Text style={styles.brand}>LectureMind</Text>

        <Text style={styles.heading}>
          Turn lectures{"\n"}into clarity.
        </Text>
        <Text style={styles.instant}>Instantly.</Text>

        <View style={styles.visual}>
          
          <View style={styles.pdfCard}>
            <Text style={styles.pdfBadge}>PDF</Text>
            <View style={styles.line} />
            <View style={styles.line} />
            <View style={[styles.line, { width: '60%' }]} />
          </View>

          <View style={styles.arrow}>
            <Text style={{ color: '#2F4E73', fontSize: 18 }}>→</Text>
          </View>

          <View style={styles.outputCard}>
            <View style={[styles.lineDark, { width: '80%' }]} />
            <View style={[styles.lineDark, { width: '60%' }]} />
            <View style={[styles.lineDark, { width: '70%' }]} />
          </View>
        </View>
      </Animated.View>

      <Animated.View style={[styles.bottom, { opacity: fadeAnim }]}>
        <Text style={styles.stepBold}>Upload.</Text>
        <Text style={styles.step}>Ask.</Text>
        <Text style={styles.step}>Understand.</Text>

        <View style={styles.underline} />

        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.85}
          onPress={() => router.push('/upload')}
        >
          <Text style={styles.ctaText}>Test your first PDF</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F4E73',
  },

  hero: {
    flex: 1.2,
    paddingHorizontal: 28,
    justifyContent: 'center',
  },

  blobLarge: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#FFFFFF',
    opacity: 0.06,
    top: 40,
    right: -60,
  },

  blobSmall: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFFFFF',
    opacity: 0.05,
    bottom: 40,
    left: -40,
  },

  brand: {
    color: '#EDEDED',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },

  heading: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 46,
  },

  instant: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    fontStyle: 'italic',
  },

  visual: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 16,
  },

  pdfCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    width: 140,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  pdfBadge: {
    backgroundColor: '#2F4E73',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '700',
  },

  line: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 4,
  },

  outputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    width: 120,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  lineDark: {
    height: 4,
    backgroundColor: '#2F4E73',
    borderRadius: 2,
    marginBottom: 6,
  },

  arrow: {
    width: 30,
    height: 30,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  bottom: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 28,
    paddingTop: 40,
  },

  stepBold: {
    fontSize: 34,
    fontWeight: '800',
    color: '#2F4E73',
  },

  step: {
    fontSize: 34,
    fontWeight: '700',
    color: '#A0A7B2',
  },

  underline: {
    width: 60,
    height: 4,
    backgroundColor: '#2F4E73',
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 20,
  },

  ctaButton: {
    marginTop: 10,
    backgroundColor: '#2F4E73',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },

  ctaText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
