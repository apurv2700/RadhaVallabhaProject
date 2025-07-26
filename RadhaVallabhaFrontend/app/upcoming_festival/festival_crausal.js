import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';
import CustomTabBar from '../../components/tab';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.35;
const SPACING = -height * 0.1;

const festivals = [
  {
    title: 'Janamastmi',
    date: 'August 18, 2025',
    image: require('../../assets/images/krsna ji.png'),
  },
  {
    title: 'Sri Narsimh Chaturdashi',
    date: 'May 22, 2025',
    image: require('../../assets/images/Live.jpg'),
  },
  {
    title: 'Rath Yatra',
    date: 'July 6, 2025',
    image: require('../../assets/images/yrt2.png'),
  },
   {
    title: 'Rath Yatra',
    date: 'July 6, 2025',
    image: require('../../assets/images/yrt2.png'),
  }, 
  {
    title: 'Rath Yatra',
    date: 'July 6, 2025',
    image: require('../../assets/images/yrt2.png'),
  },
];

export default function FestivalScreen() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const centerIndex = Math.floor(festivals.length / 2);

  const [currentIndex, setCurrentIndex] = useState(centerIndex);
  const [selectedFestival, setSelectedFestival] = useState(festivals[centerIndex]);

  useEffect(() => {
    const initialOffset = (CARD_HEIGHT + SPACING) * centerIndex;
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: initialOffset, animated: false });
    }
  }, []);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / (CARD_HEIGHT + SPACING));
        setCurrentIndex(index);
        if (festivals[index]) {
          setSelectedFestival(festivals[index]);
        }
      },
    }
  );

  return (
    <>
      <Header />
      <View style={styles.header}>
        <Text style={styles.headerText}>FESTIVALS</Text>
      </View>

      <SafeAreaView style={styles.container}>
        <Animated.ScrollView
          ref={scrollRef}
          vertical
          showsVerticalScrollIndicator={false}
          snapToInterval={CARD_HEIGHT + SPACING}
          decelerationRate="fast"
          contentContainerStyle={{ paddingVertical: height * 0.2 }}
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={styles.carousel}
        >
          {festivals.map((item, index) => {
            const inputRange = [
              (CARD_HEIGHT + SPACING) * (index - 1),
              (CARD_HEIGHT + SPACING) * index,
              (CARD_HEIGHT + SPACING) * (index + 1),
            ];

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [0.8, 1, 0.8],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.card,
                  {
                    transform: [{ scale }],
                    zIndex: index === currentIndex ? 2 : 1,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => setSelectedFestival(item)}
                  style={{ flex: 1 }}
                  activeOpacity={0.9}
                   
                >
                  <Image source={item.image} style={styles.cardImage} />
                  <View style={styles.overlay} />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View style={styles.divider} />
                  <Text style={styles.cardDate}>{item.date}</Text>
                  <LinearGradient
                    colors={['#605fa7', '#ffb1f2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.cardButton}
                  >
                    <Text style={styles.cardButtonText}  onPress={() => router.push('./particular_festival')}>Open</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </Animated.ScrollView>

        <CustomTabBar />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    backgroundColor: '#efb6d4',
    padding: 13,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
  card: {
    height: CARD_HEIGHT,
    width: width * 0.9,
    alignSelf: 'center',
    marginVertical: SPACING / 2,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#222',
    justifyContent: 'flex-end',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: CARD_HEIGHT * 0.6,
  },
  cardDate: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  cardButton: {
    backgroundColor: '#d599ff',
    paddingVertical: 4,
    paddingHorizontal: 14,
    marginHorizontal: width * 0.30,
    marginBottom: 16,
    alignItems: 'center',
    borderRadius: 6,
  },
  cardButtonText: { color: '#fff', fontWeight: 'bold' },
  divider: {
    height: 2,
    backgroundColor: '#888',
    width: '70%',
    alignSelf: 'center',
    marginVertical: 1,
  },
});
