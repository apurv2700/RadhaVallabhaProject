import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const images = [
  {
    id: 1,
    date: 'July 3, 2025',
    category: 'Book Distribution',
    caption: 'Rath Yatra 2025',
    visible: true,
    image: require('../../assets/images/krsna ji.png'), // Replace with your image path
  },
  {
    id: 2,
    date: 'July 1, 2025',
    category: 'Temple Photo',
    caption: '',
    visible: true,
    image: require('../../assets/images/krsna ji.png'), // Replace with your image path
  }
];

export default function GalleryManagementScreen() {
    useAuthGuard()
     const router = useRouter();
  return (
    <>

    <Header/>
   
    <View style={styles.container}>
      <Text style={styles.title}>Gallery Management</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {images.map((item) => (
          <View key={item.id} style={styles.card}>
            
            <View style={styles.imageRow}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.details}>
               <Text
                    style={styles.label}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    >
                  Category: <Text style={styles.bold}>{item.category}</Text>
                </Text>
                <Text style={styles.label}>
                  Date: <Text>{item.date|| '-'}</Text>
                </Text>
              
              </View>
            </View>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => router.push('./gallery_management')}>
                <Icon name="create-outline" size={20} color="#ccc" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="trash-outline" size={20} color="#ccc" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <CustomTabBar_admin/>
    </View>
     </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f20',
    paddingHorizontal: RFValue(16),
    paddingTop: RFValue(40),
  },
  title: {
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: RFValue(12),
  },
  uploadButton: {
    backgroundColor: 'linear-gradient(to right, #9f4eff, #e679f7)', // Only web works
    backgroundColor: '#c94bf6',
    paddingVertical: RFValue(12),
    borderRadius: RFValue(14),
    alignItems: 'center',
    marginBottom: RFValue(20),
  },
  uploadText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  scrollContainer: {
    paddingBottom: RFValue(100),
  },
  card: {
    backgroundColor: '#1c1c2b',
    borderRadius: RFValue(12),
    padding: RFValue(12),
    marginBottom: RFValue(16),
  },
  date: {
    color: '#aaa',
    fontSize: RFValue(12),
    marginBottom: RFValue(6),
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(6),
    marginRight: RFValue(10),
  },
  details: {
    flex: 1,
  },
  label: {
    color: '#ccc',
    fontSize: RFValue(13),
    marginBottom: RFValue(4),
  },
  bold: {
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: RFValue(16),
    marginTop: RFValue(10),
  },
});
