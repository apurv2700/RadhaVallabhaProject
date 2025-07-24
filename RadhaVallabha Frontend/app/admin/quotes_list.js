import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';
import { useRouter } from 'expo-router';
const { width } = Dimensions.get('window'); // screen width

const initialPosts = [
  {
    id: '1',
    place: 'New York',
    content: '"The mind is restless and difficult to restrain, but it is subdued by practice." - Bhagavad Gita 6.34',
    timestamp: '2 hours ago',
    image: require('../../assets/images/icon.png'), // Placeholder image
  },
  {
    id: '2',
    place: 'Mayapur',
    content: '"There are two ways of passing from this world - one in light and one in darkness..." - Bhagavad Gita 8.26',
    timestamp: 'July 1, 2025',

    image: null,
  },
  
];

const ContentFeedScreen = ({ onBack }) => {
  useAuthGuard();
   const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);


  const renderPost = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.place}>{item.place}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      {item.image && (
        <Image
          source={item.image}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.cardFooter}>
       
      </View>
    </View>
  );

  return (
    <>
      <Header />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
         
          <Text style={styles.headerTitle}>Spiritual Engagements</Text>
        </View>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.feed}
          showsVerticalScrollIndicator={false}
        />
        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('./upload_quotes')}
        >
          <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
      <CustomTabBar_admin />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 20 : 12,
    backgroundColor: '#1b1b1b',
    borderBottomWidth: 1,
    borderBottomColor: '#2e2e2e',
    justifyContent:'center'
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  feed: {
    padding: 16,
    paddingBottom: 120, // ensures FAB doesn't overlap list
  },
  card: {
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  place: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  timestamp: {
    color: '#aaa',
    fontSize: 12,
  },
  content: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: width * 0.5, // responsive height
    borderRadius: 10,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    color: '#aaa',
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: '#e91e63',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    zIndex: 10,
  },
});

export default ContentFeedScreen;
