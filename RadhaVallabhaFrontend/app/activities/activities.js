import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/header';
import CustomTabBar from '../../components/tab';
import { useLocalSearchParams } from 'expo-router';
const { width,height } = Dimensions.get('window');

export default function Activity() {
  const { title, description, image } = useLocalSearchParams();
  const quotes = [
    {
      title: 'Simple Living, High Thinking',
      description:
        'Embrace the timeless principle of simple living and high thinking — a life of minimalism, inner peace, and deep spiritual purpose rooted in Krishna consciousness.',
      image: require('../../assets/images/Live.jpg'),
    },
    {
      title: 'Serve with Love',
      description:
        'True service is not for reward, but out of unconditional love and devotion to Krishna.',
      image: require('../../assets/images/krsna ji.png'),
    },
    {
      title: 'Chant and Be Happy',
      description:
        'In a world filled with distractions, chaos, and the relentless pursuit of material pleasure, the concept of “simple living and high thinking” offers a refreshing and timeless philosophy for a balanced and meaningful life. Originating from the ancient Vedic wisdom, this principle urges individuals to live with minimal material needs while cultivating deep spiritual insight and noble thoughts. Simple living doesn’t mean denying oneself the basic necessities of life, but rather choosing to detach from excessive desires that enslave the mind and burden the heart. It emphasizes the value of contentment, discipline, and self-awareness. High thinking, on the other hand, refers to elevating ones consciousness beyond the temporary pleasures of the senses to the eternal truths of the soul. It inspires reflection, introspection, service to others, and ultimately devotion to God. Together, this philosophy leads to peace, clarity, and a purposeful existence. The simplicity of action combined with depth of thought creates a powerful harmony that not only transforms the individual but also positively impacts the world around them.',
      image: require('../../assets/images/yrt2.png'),
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const current = quotes[currentIndex];

  const nextQuote = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <Header />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>OUR ACTIVITIES</Text>
      </View>

      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.subtitle}>{title}</Text>

          <View style={styles.imageWrapper}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons name="heart" size={24} color="red" />
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>{description}</Text>
        </ScrollView>

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
  scrollContainer: {
    paddingBottom: 80,
    alignItems: 'center',
    paddingHorizontal: 20,
    top:-height*0.01
  },
  titleContainer: {
    backgroundColor: '#efb6d4',
    paddingVertical: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  imageWrapper: {
    width: width * 0.9,
    height: width * 0.55,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#eee',
    backgroundColor: '#222',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartIcon: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 4,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginTop: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
  downArrow: {
    alignItems: 'center',
    marginBottom: 10,
    top:-height*0.09
  },
});
