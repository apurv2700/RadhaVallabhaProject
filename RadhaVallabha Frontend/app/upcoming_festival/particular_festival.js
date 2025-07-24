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

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.35;
const SPACING = -height * 0.1;

const festivals = [
  
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
        <Text style={styles.headerText}>Rath Yatra</Text>
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

                  <View style={styles.cardHeaderRow}>
                    <Text style={styles.cardTitle}>{item.date}</Text>
                    <Text style={styles.likeIcon}>❤️</Text>
                  </View>

                
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
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: CARD_HEIGHT * 0.8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  likeIcon: {
    fontSize: 20,
    color: '#ff6b81',
  },



  
});
