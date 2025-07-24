import { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Header from '../../components/header';
import CustomTabBar from '../../components/tab';

const { width,height } = Dimensions.get('window');

const videos = [
  {
    id: 'BrSYUkepI-4',
    title: 'गोलोक संदेश | गोलोक धाम',
    speaker: 'H.G. Achyutakrishna Das',
    date: '6 June 2025',
    thumbnail: require('../../assets/images/T3.png'),
  },
  {
    id: 'LnmE_j8mKSs',
    title: 'क्यों रोका गया चार कुमारों को वैकुंठ पर ? जानिए',
    speaker: 'H.G. Tarun Krishna Das',
    date: '7 June 2025',
    thumbnail: require('../../assets/images/T2.png'),
  },
  {
    id: 'nPt8bK2gbaU',
    title: 'क्या पत्नी बचें मायाजाल से?',
    speaker: 'H.G. Achyutakrishna Das',
    date: '7 June 2025',
    thumbnail: require('../../assets/images/Live.jpg'),
  },
    {
    id: 'nPt8bK2gbaU',
    title: 'क्या पत्नी बचें मायाजाल से?',
    speaker: 'H.G. Achyutakrishna Das',
    date: '7 June 2025',
    thumbnail: require('../../assets/images/Live.jpg'),
  },
    {
    id: 'nPt8bK2gbaU',
    title: 'क्या पत्नी बचें मायाजाल से?',
    speaker: 'H.G. Achyutakrishna Das',
    date: '7 June 2025',
    thumbnail: require('../../assets/images/Live.jpg'),
  },
];

export default function LatestVideoScreen() {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <View style={styles.container}>
      <Header />

  
        <Text style={styles.pageTitle}>LATEST VIDEO</Text>

       
        {/* YouTube Player */}
        <View style={styles.banner}>
          <YoutubePlayer
            height={200}
            play={true}
            videoId={selectedVideo.id}
          />
        </View>

        {/* Channel Info */}
        <View style={styles.channelText}>
          <Text style={styles.channelLabel}>Youtube Channel</Text>
          <Text style={styles.channelTitle}>{selectedVideo.title}</Text>
          <Text style={styles.subtext}>
            {selectedVideo.speaker} - {selectedVideo.date}
          </Text>
        </View>
         <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Video List */}
        {videos.map((video, index) => (
          <TouchableOpacity
            key={index}
            style={styles.videoCard}
            onPress={() => setSelectedVideo(video)}
          >
            <Image source={video.thumbnail} style={styles.videoThumbnail} />
            <View style={{ flex: 1 }}>
              <Text style={styles.videoTitle}>{video.title}</Text>
              <Text style={styles.videoSpeaker}>{video.speaker}</Text>
              <Text style={styles.videoDate}>{video.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
            <CustomTabBar />
      </ScrollView>

  
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F0F' },
  pageTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#1e1e1e',
    backgroundColor: '#efb6d4',
    letterSpacing: 1.5,
    paddingVertical: 10,
  },
  banner: {
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  channelText: {
    paddingHorizontal: 16,
    marginTop: 15,
  },
  channelLabel: {
    color: '#A08AFF',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  channelTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
  subtext: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  videoThumbnail: {
    width: 100,
    height: 60,
    borderRadius: 8,
  },
  videoTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  videoSpeaker: {
    color: '#A08AFF',
    fontSize: 12,
    marginVertical: 2,
  },
  videoDate: {
    color: '#bbb',
    fontSize: 11,
  },

});
