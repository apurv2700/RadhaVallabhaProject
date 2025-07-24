import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from '../../components/header';
import CustomTabBar from '../../components/tab';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width, height } = Dimensions.get('window');

const CourseDetailScreen = () => {
  const router = useRouter();
  useAuthGuard();

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.headerText}>COURSES</Text>
        </View>


        {/* Chapter Card */}
        <View style={styles.chapterCard}>
          <Image source={require('../../assets/images/BG.webp')} style={styles.chapterImage} />
          <View style={styles.chapterTextBox}>
            <Text style={styles.chapterTitle}>Chapter 1 : Topic</Text>
            <Text style={styles.chapterDuration}>Time : 2:00 Hours</Text>
          </View>
          <TouchableOpacity style={styles.playIcon}>
            <Ionicons name="play-circle" size={32} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Video thumbnail */}
       <View style={styles.videoWrapper}>
        <YoutubePlayer
            height={height*0.35}
            play={true}
            videoId={'BvSaF3T2zm8'}
          />
        </View>


        {/* Titles */}
        <Text style={styles.courseTitle}>Bhagavat Gita As It Is Course</Text>
        <View style={styles.divider} />
        <Text style={styles.chapterTitleBig}>Chapter 1 : Topic</Text>
        <Text style={styles.author}>
          Author: His Divine Grace A.C. Bhaktivedanta Swami Prabhupada
        </Text>
        

        
        {/* Quiz Button  */}
        <View style={styles.quizWrapper}>
          {/* <Image source={require('../../assets/images/deity-bg-lotus.png')} style={styles.lotusLeft} /> */}
          <TouchableOpacity style={styles.quizButton}>
            <Text style={styles.quizButtonText}>Quiz</Text>
          </TouchableOpacity>
          {/* <Image source={require('../../assets/images/deity-bg-lotus.png')} style={styles.lotusRight} /> */}
        </View>

        {/* Spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      <CustomTabBar />
    </View>
  );
};

export default CourseDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#efb6d4',
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },

  divider: {
    height: 2,
    width: '60%',
    backgroundColor: 'white',
    marginTop: 15,
    borderRadius: 2,
  },
  chapterCard: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1c',
    borderColor: '#a678e2',
    borderWidth: 1.8,
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    width: width * 0.9,
    alignItems: 'center',
  },
  chapterImage: {
    width: 60,
    height: 80,
    borderRadius: 6,
  },
  chapterTextBox: {
    flex: 1,
    marginLeft: 10,
  },
  chapterTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  chapterDuration: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  playIcon: {
    paddingLeft: 8,
  },
videoWrapper: {
  width: width * 0.9,
  height: height*0.25,
  borderRadius: 10,
  overflow: 'hidden',
  marginTop: 20,
},
videoPlayer: {
  flex: 1,
  borderRadius: 10,
},
  videoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoPlayIcon: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
  },
  courseTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
    marginTop: 30,
    textAlign: 'center',
  },
  chapterTitleBig: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    marginTop: 15,
    textAlign: 'center',
  },
  author: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  quizWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  quizButton: {
    backgroundColor: '#9146FF',
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 30,
    top:height*0.00
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    top:height*0.00
  },
    divider: {
    height: 2,
    width: '60%',
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 2,
  },
    divider: {
    height: 2,
    width: '60%',
    backgroundColor: '#aaa',
    marginTop: 10,
    borderRadius: 2,
  },
//   lotusLeft: {
//     width: width*0.3,
//     height: height*0.28,
//     resizeMode: 'contain',
//     marginRight: 10,
//   },
//   lotusRight: {
//     width:  width*0.,
//     height: height*0.28,
//     resizeMode: 'contain',
//     marginLeft: 10,
//   },
});
