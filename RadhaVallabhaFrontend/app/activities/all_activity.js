import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';
import CustomTabBar from '../../components/tab';
import { useRouter } from 'expo-router';
const { width,heigth } = Dimensions.get('window');

const activities = [
  {
    title: 'Simple Living, High Thinking',
    description:
      'Embrace the timeless principle of simple living and high thinking — a life of minimalism, inner peace, and deep spiritual purpose rooted in Krishna consciousness.',
    image: require('../../assets/images/Live.jpg'),
  },
  {
    title: 'Hare Krsna',
    description:
      'Embrace the timeless principle of simple living and high thinking — a life of minimalism, inner peace, and deep spiritual purpose rooted in Krishna consciousness.',
    image: require('../../assets/images/Live.jpg'),
  },
  {
    title: 'Simple Living, High Thinking',
    description:
      'Embrace the timeless principle of simple living and high thinking — a life of minimalism, inner peace, and deep spiritual purpose rooted in Krishna consciousness.',
    image: require('../../assets/images/Live.jpg'),
  },
  {
    title: 'Simple Living, High Thinking',
    description:
      'Embrace the timeless principle of simple living and high thinking — a life of minimalism, inner peace, and deep spiritual purpose rooted in Krishna consciousness.',
    image: require('../../assets/images/Live.jpg'),
  },
];

export default function OurActivitiesScreen() {
      const router = useRouter();



  return (
    <>
    <Header />
    <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>OUR ACTIVITIES</Text>
        <Text style={styles.subtitle}>Spiritual Engagements at ISKCON Bhopal</Text>
        <Text style={styles.caption}>
          Immerse in devotional activities that strengthen your connection with Lord Krishna.
        </Text>
      </View>
    <SafeAreaView style={styles.container}>
      
      

            <ScrollView contentContainerStyle={styles.scrollContainer}>
        {activities.map((item, index) => (
            <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => router.push({
                pathname: './activities', // adjust if your file is at app/quote_screen.js
                params: {
                title: item.title,
                description: item.description,
                image: Image.resolveAssetSource(item.image).uri,
                }
            })}
            >
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.cardImage} />
            </View>
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}   numberOfLines={3}
                    ellipsizeMode="tail">{item.description}</Text>
            </View>
            </TouchableOpacity>
        ))}
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
  titleContainer: {
    backgroundColor: '#efb6d4',
    paddingVertical: 14,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
  subtitle: {
    fontSize: 14,
    color: '#1e1e1e',
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  caption: {
    fontSize: 12,
    color: '#1e1e1e',
    marginTop: 4,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 12,
    paddingBottom: 90,
   
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: 'cover',
    borderRadius: 10,
    margin: 8,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  cardDescription: {
    color: '#ccc',
    fontSize: 12,
    lineHeight: 16,
  },
});
