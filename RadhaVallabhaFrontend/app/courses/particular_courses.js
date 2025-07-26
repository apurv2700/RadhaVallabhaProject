import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from '../../components/header';
import CustomTabBar from '../../components/tab';
import { useRouter } from 'expo-router';
const { width } = Dimensions.get('window');

const courseData = [
  {
    title: 'Chapter 1 : Topic',
    duration: '200 Hours',
    image: require('../../assets/images/BG.webp'),
  },
  {
    title: 'Chapter 2 : Topic',
    duration: '200 Hours',
    image: require('../../assets/images/BG.webp'),
  },
  {
    title: 'Chapter 3 : Topic',
    duration: '200 Hours',
    image: require('../../assets/images/BG.webp'),
  },
  {
    title: 'Chapter 4 : Topic',
    duration: '200 Hours',
    image: require('../../assets/images/BG.webp'),
  },
    {
    title: 'Chapter 4 : Topic',
    duration: '200 Hours',
    image: require('../../assets/images/BG.webp'),
  },
    {
    title: 'Chapter 4 : Topic',
    duration: '200 Hours',
    image: require('../../assets/images/BG.webp'),
  },
    {
    title: 'Chapter 4 : Topic',
    duration: '200 Hours',
    image: require('../../assets/images/BG.webp'),
  },
];

export default function CoursesScreen({ navigation }) {
    useAuthGuard()
     const router = useRouter();
  return (
    <View style={styles.container}>
    {/* Header */}
    <Header/>

   <View style={styles.header}>
                  <Text style={styles.headerText}>COURSES</Text>
          </View>
        <View style={styles.titleContainer}>
          
          <Text style={styles.subtitle}>Spiritual Engagements at ISKCON Bhopal</Text>
          <View style={styles.divider} />
        </View>

      <ScrollView contentContainerStyle={styles.content}>
        {courseData.map((course, index) => (
             <TouchableOpacity
            key={index}
            style={styles.courseCard}
            onPress={() => router.push('./course_video')}
            activeOpacity={0.8}
          >
            <Image source={course.image} style={styles.thumbnail} />
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseTime}>Time : {course.duration}</Text>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play-circle" size={30} color="#fff" />
            </TouchableOpacity>
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
    backgroundColor: '#efb6d4',
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
  subTitle: {
    color: '#000',
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
  },
  separator: {
    height: 2,
    width: width * 0.3,
    backgroundColor: '#444',
    marginTop: 10,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  courseCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#a68ad1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 14,
  },
  thumbnail: {
    width: 50,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  courseTime: {
    color: '#ccc',
    fontSize: 12,
  },
  playButton: {
    marginLeft: 8,
    backgroundColor: '#a68ad1',
    padding: 6,
    borderRadius: 20,
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    backgroundColor: '#6e44b2',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  homeButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 50,
  },
    titleContainer: {
    padding: 14,
    alignItems: 'center',
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
  header: { backgroundColor: '#efb6d4', padding: 14, alignItems: 'center' },
  headerText: { fontSize: 16, fontWeight: 'bold', color: '#1e1e1e' },
});
