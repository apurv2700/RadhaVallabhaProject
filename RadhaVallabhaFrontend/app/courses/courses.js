import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from '../../components/header';
import CustomTabBar from '../../components/tab';
import { useRouter } from 'expo-router';
const { width, height } = Dimensions.get('window');

const courses = [
  {
    title: 'Bhagavat Gita As It Is Course',
    image: require('../../assets/images/BG.webp'),
  },
  {
    title: 'Deity Worship Course',
    image: require('../../assets/images/Live.jpg'),
  },
  {
    title: 'Bhagavat Gita As It Is Course',
    image: require('../../assets/images/BG.webp'),
  },
  {
    title: 'Bhagavat Gita As It Is Course',
    image: require('../../assets/images/BG.webp'),
  },
    {
    title: 'Deity Worship Course',
    image: require('../../assets/images/Live.jpg'),
  },
    {
    title: 'Deity Worship Course',
    image: require('../../assets/images/Live.jpg'),
  },
    {
    title: 'Deity Worship Course',
    image: require('../../assets/images/Live.jpg'),
  },
    {
    title: 'Deity Worship Course',
    image: require('../../assets/images/Live.jpg'),
  },
];

export default function CoursesScreen() {
    useAuthGuard()
     const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Header */}
    <Header/>

      {/* Title */}

       <View style={styles.header}>
                <Text style={styles.headerText}>COURSES</Text>
        </View>
      <View style={styles.titleContainer}>
        
        <Text style={styles.subtitle}>Spiritual Engagements at ISKCON Bhopal</Text>
        <View style={styles.divider} />
      </View>

      {/* Courses */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
      {courses.map((course, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => router.push('./particular_courses')}
          activeOpacity={0.8}
        >
          <Image source={course.image} style={styles.courseImage} />
          <Text style={styles.courseTitle}>{course.title}</Text>
          <LinearGradient
            colors={['#4dd0e1', '#00acc1']}
            style={styles.progressCircle}
          >
            <Text style={styles.progressText}>20%</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
      {/* Bottom Tab */}
      <CustomTabBar/>
    </ScrollView>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  header: {
    backgroundColor: '#1c1c1c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 40,
    paddingBottom: 12,
  },
  logo: {
    width: width * 0.18,
    height: width * 0.1,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 8,
  },
  prasadamButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  prasadamIcon: {
    width: 20,
    height: 24,
    marginRight: 4,
  },
  prasadamText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  titleContainer: {
    padding: 14,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#eeb6d4',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  divider: {
    height: 2,
    width: '60%',
    backgroundColor: '#aaa',
    marginTop: 10,
    borderRadius: 2,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#1b1b1b',
    borderWidth: 1,
    borderColor: '#805ad5',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  courseImage: {
    width: 48,
    height: 68,
    resizeMode: 'cover',
    marginRight: 10,
  },
  courseTitle: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 14,
  },
  progressCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00acc1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    backgroundColor: '#6a4dad',
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  homeButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 40,
    marginTop: -20,
  },
    header: { backgroundColor: '#efb6d4', padding: 14, alignItems: 'center' },
  headerText: { fontSize: 16, fontWeight: 'bold', color: '#1e1e1e' },
});
