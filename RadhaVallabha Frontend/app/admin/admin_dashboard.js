import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';
import { useRouter } from 'expo-router';
const windowWidth = Dimensions.get('window').width;

const ManagementCard = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.iconContainer}>{icon}</View>
    <View style={styles.textContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

export default function AdminPanelScreen() {
    useAuthGuard()
    const router = useRouter();
  return (
    <>
    <Header/>
    <View style={styles.container}>
      <Text style={styles.header}>Admin Panel</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ManagementCard
          icon={<MaterialIcons name="redeem" size={28} color="#fff" />}
          title="Prasad Coupon Management"
          subtitle="Create and manage Prasad coupons"
          onPress={() => router.push('./prasadam_management')}
        />
        <ManagementCard
          icon={<MaterialIcons name="format-quote" size={28} color="#fff" />}
          title="Quote & Content Posting"
          subtitle="Post quotes, images, and videos"
          onPress={() => router.push('./quotes_list')}
        />
        <ManagementCard
          icon={<MaterialIcons name="computer" size={28} color="#fff" />}
          title="E-Learning Management"
          subtitle="Upload e-learning video links"
          onPress={() => {}}
        />
        <ManagementCard
          icon={<FontAwesome name="image" size={28} color="#fff" />}
          title="Gallery Management"
          subtitle="Upload daily darshan images"
          onPress={() =>  router.push('./gallery_management')}
        />
        <ManagementCard
        icon={<FontAwesome name="video-camera" size={28} color="#fff" />}
        title="Latest Video"
        subtitle="Upload Latest Video from YOUTUBE"
        onPress={() =>  router.push('./add_video')}
        />
          <ManagementCard
        icon={<FontAwesome name="bell" size={28} color="#fff" />}
        title="Festivals and Donation"
        subtitle="Upcoming festival"
        onPress={() =>  router.push('./add_video')}
        />
          <ManagementCard
        icon={<FontAwesome name="book" size={28} color="#fff" />}
        title="Quiz"
        subtitle="Upload Quiz"
         onPress={() => router.push('./quiz_list')}
        />
        <ManagementCard
        icon={<FontAwesome name="tasks" size={28} color="#fff" />}
        title="Our Activity"
        subtitle="Mention Our Activities"
         onPress={() => router.push('./quiz_list')}
        />
      </ScrollView>

      {/* Bottom Navigation Bar */}
     <CustomTabBar_admin/>
    </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // dark theme
    paddingTop: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#a47cf3',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
    backgroundColor: '#a47cf3',
    padding: 12,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 4,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#4b0082',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  centerIcon: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    color: '#4b0082',
  },
});
