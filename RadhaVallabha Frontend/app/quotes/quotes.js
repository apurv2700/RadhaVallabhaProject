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

const { width, height } = Dimensions.get('window');

export default function QuoteScreen() {
  const quotes = [
    {
     
      description:
        'Embrace the timeless principle of simple living and high thinking — a life of minimalism, inner peace, and deep spiritual purpose rooted in Krishna consciousness.',
      image: require('../../assets/images/Live.jpg'),
      date: 'July 14, 2025',
      place: 'ISKCON Bhopal',
    
    },
    {
      
      description:
        'True service is not for reward, but out of unconditional love and devotion to Krishna.',
      image: require('../../assets/images/krsna ji.png'),
      date: 'July 18, 2025',
      place: 'ISKCON Bhopal',
    
    },
    {
     
      description:
        'In a world filled with distractions, this philosophy encourages detachment from excess desires, clarity of purpose, and a life of devotion and peace.',
      image: require('../../assets/images/yrt2.png'),
      date: 'July 21, 2025',
      place: 'ISKCON Temple Hall',
      
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
        <Text style={styles.title}>QUOTES</Text>
      </View>

      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.subtitle}>{'DHIYAN AMRIT'}</Text>

          <View style={styles.imageWrapper}>
            <Image source={current.image} style={styles.image} />
         
          </View>

          <Text style={styles.description}>{current.description}</Text>

          {/* Event Details */}
          <View style={styles.eventDetails}>
            <Text style={styles.eventText}>
              <Text style={styles.eventLabel}>Date:</Text> {current.date}
            </Text>
            <Text style={styles.eventText}>
              <Text style={styles.eventLabel}>Place:</Text> {current.place}
            </Text>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.downArrow} onPress={nextQuote}>
          <Ionicons name="chevron-down" size={50} color="white" />
        </TouchableOpacity>

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
    top: -height * 0.01,
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

  description: {
    color: '#fff',
    fontSize: 14,
    marginTop: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
  eventDetails: {
    marginTop: 20,
    backgroundColor: '#222',
    padding: 14,
    borderRadius: 10,
    width: '100%',
  },
  eventText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  eventLabel: {
    fontWeight: 'bold',
    color: '#fff',
  },
  downArrow: {
    alignItems: 'center',
    marginBottom: 10,
    top: -height * 0.09,
  },
});
