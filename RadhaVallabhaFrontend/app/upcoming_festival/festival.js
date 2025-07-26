import { useRef, useState,useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from '../../components/header';
import CustomTabBar from '../../components/tab';
import { LinearGradient } from 'expo-linear-gradient';

const { width,height} = Dimensions.get('window');
const CARD_WIDTH = width * 0.6;
const SPACING = -width * 0.1;
const CENTER = (width - CARD_WIDTH) / 2;

const festivals = [
  {
    title: 'Narasimha Jayanti',
    date: 'May 15, 2025',
    image: require('../../assets/images/Live.jpg'),
    description: 'Appearance day of Lord Narasimha, the half-man half-lion incarnation of Lord Vishnu.'
  },
  {
    title: 'Gaura Purnima',
    date: 'March 13, 2025',
    image: require('../../assets/images/gaur.png'),
    description: 'Celebrates the appearance of Lord Chaitanya Mahaprabhu, the founder of the sankirtana movement.'
  },
  {
    title: 'Rath Yatra',
    date: 'July 6, 2025',
    image: require('../../assets/images/yrt2.png'),
    description: 'Festival of the Chariots, where Lord Jagannath is pulled on a grand chariot.'
  },
  {
    title: 'Janmashtami',
    date: 'August 18, 2025',
    image: require('../../assets/images/krsna ji.png'),
    description: 'Celebration of Lord Krishna’s appearance on Earth.'
  },
];

export default function UpcomingFestivalScreen() {
   useAuthGuard(); //Protects this screen
const scrollRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const centerIndex = Math.floor(festivals.length / 2);

  const [currentIndex, setCurrentIndex] = useState(centerIndex);
  const [selectedFestival, setSelectedFestival] = useState(festivals[centerIndex]);

  //  Scroll to center card on mount
  useEffect(() => {
    const initialOffset = (CARD_WIDTH + SPACING) * centerIndex;
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: initialOffset, animated: false });
    }
  }, []);

  // Update selectedFestival on scroll
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / (CARD_WIDTH + SPACING));
        setCurrentIndex(index);
        if (festivals[index]) {
          setSelectedFestival(festivals[index]);
        }
      },
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>UPCOMING FESTIVAL</Text>
        </View>

        <Animated.ScrollView
          ref={scrollRef} //attach ref
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + SPACING}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: width*0.25}}
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={styles.carousel}
        >

          {festivals.map((item, index) => {
            const inputRange = [
              (CARD_WIDTH + SPACING) * (index - 1),
              (CARD_WIDTH + SPACING) * index,
              (CARD_WIDTH + SPACING) * (index + 1),
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.9, 1, 0.9],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1, 1],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.card,
                  {
                    transform: [{ scale }],
                    opacity,
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
                  colors={['#605fa7', '#ffb1f2']} // Customize your gradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.cardButton}
                >
                  <Text style={styles.cardButtonText}>Donate Now</Text>
                </LinearGradient>
                 
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </Animated.ScrollView>

        {/* Dynamic content below */}
        <View style={styles.content}>
          <Text style={styles.date}>• {selectedFestival.date}</Text>
          <Text style={styles.festivalTitle}>{selectedFestival.title}</Text>

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Donate Now</Text>
          </TouchableOpacity>

          <Text style={styles.paragraph}>{selectedFestival.description}</Text>

          <Image
            source={selectedFestival.image}
            style={styles.bannerImage}
          />

          <Text style={styles.sectionText}>
            This festival is celebrated with joy and devotion. Devotees perform various devotional activities.
          </Text>

          <Text style={styles.bullet}>• Festive kirtan and bhajan</Text>
          <Text style={styles.bullet}>• Temple decorations and feasts</Text>
          <Text style={styles.bullet}>• Special darshan and aarti</Text>
          <Text style={styles.bullet}>• Cultural programs and lectures</Text>
        </View>

        <CustomTabBar />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  header: { backgroundColor: '#efb6d4', padding: 14, alignItems: 'center' },
  headerText: { fontSize: 16, fontWeight: 'bold', color: '#1e1e1e' },
  carousel: { marginVertical: 15 },
  card: {
    width: CARD_WIDTH,
    height: 320,
    marginHorizontal: SPACING / 2,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'black',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily:'BerkshireSwash_400Regular',
    marginBottom: 4,
    textAlign: 'center',
    top:height*0.20
  },
  cardDate: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
    fontWeight:700,
    textAlign: 'center',
    top:height*0.21
  },
 cardButton: {
  backgroundColor: '#d599ff',
  paddingVertical: 6,
  paddingHorizontal: 14,
  marginBottom: 12,
  marginHorizontal: 60,
  alignItems: 'center',
  top:height*0.21,
  
},
  cardButtonText: { color: '#fff', fontWeight: 'bold' },
  content: { paddingHorizontal: 16, paddingBottom: 140, backgroundColor: 'black' },
  date: { color: '#aaa', marginBottom: 4, fontSize: 13 },
  festivalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  btn: {
    backgroundColor: '#4b2b82',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginVertical: 8,
  },
  btnText: { color: '#fff', fontSize: 12 },
  paragraph: { color: '#ccc', marginBottom: 10, lineHeight: 20, fontSize: 14 },
  bannerImage: {
    width: '100%',
    height: 230,
    borderRadius: 8,
    resizeMode: 'cover',
    marginVertical: 12,
  },
  sectionText: { color: '#ddd', fontSize: 14, marginBottom: 10, lineHeight: 20 },
  bullet: { color: '#ccc', fontSize: 13, marginVertical: 5, paddingLeft: 10 },
  divider: {
  height: 2,
  backgroundColor: '#888',
  width: '70%',
  alignSelf: 'center',
  marginVertical: 1,
  top:height*0.20
},
});