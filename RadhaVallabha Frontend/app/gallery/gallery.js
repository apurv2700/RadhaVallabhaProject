// File: app/gallery/index.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';
import CustomTabBar from '../../components/tab';
import { useRouter } from 'expo-router';
const { width,height } = Dimensions.get('window');

const images = [
  { title: 'Bhakti Kirtan', image: require('../../assets/images/Live.jpg') },
  { title: 'Deities', image: require('../../assets/images/Live.jpg') },
  { title: 'Sunday Program', image: require('../../assets/images/Live.jpg') },
  { title: 'Saturday Youth Program', image: require('../../assets/images/Live.jpg') },
  { title: 'Mahaprasadam', image: require('../../assets/images/Live.jpg') },
  { title: 'Temple Photo', image: require('../../assets/images/Live.jpg') },
  { title: 'Book Distribution', image: require('../../assets/images/Live.jpg') },
  { title: 'IGF Summer Camp', image: require('../../assets/images/Live.jpg') },
  { title: 'Festival', image: require('../../assets/images/Live.jpg') },
];

export default function GalleryScreen() {
  const router = useRouter();
  

const handleNavigation = (title) => {
  const routeMap = {
    'Bhakti Kirtan': { path: './gallery_view', params: { title:'BHAKTI KIRTAN'} },
    'Deities': { path: './gallery_view' , params: { title:'DEITIES'}},
    'Sunday Program': { path:'./gallery_view' , params: { title:'SUNDAY PROGRAM'}},
    'Saturday Youth Program': { path:'./gallery_view', params: { title:'SATURDAY YOUTH PROGRAM'} },
    'Mahaprasadam': { path: './gallery_view', params: { title:'MAHAPRASADAM'} },
    'Temple Photo': { path:'./gallery_view' , params: { title:'TEMPLE PHOTO'}},
    'Book Distribution': { path: './gallery_view' , params: { title:'BOOK DISTRIBUTION'}},
    'IGF Summer Camp': { path: './gallery_view' , params: { title:'IGF SUMMER CAMP'}},
    'Festival': { path: '/upcoming_festival/festival_crausal'},
  };

  const routeInfo = routeMap[title];
  if (routeInfo) {
    router.push({
      pathname: routeInfo.path,
      params: routeInfo.params || {},
    });
  }
};


  return (
    <>
  
       <Header />
         <View style={styles.header}>
             <Text style={styles.headerText}>GALLERY</Text>
        </View>
    <SafeAreaView style={styles.container}>
  
  <ScrollView contentContainerStyle={styles.gridContainer}>
  {images.map((item, index) => {
    const isLargeCard = index % 3 === 0; // make every 3rd card large (customize logic as needed)
    return (
      <TouchableOpacity
        key={index}
        style={[styles.card, isLargeCard ? styles.largeCard : styles.smallCard]}
        onPress={() => handleNavigation(item.title)}
      >
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.overlay} />
        <Text style={styles.cardText}>{item.title}</Text>
      </TouchableOpacity>
    );
  })}
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
   header: { backgroundColor: '#efb6d4', padding: 14, alignItems: 'center' },
  headerText: { fontSize: 20, fontWeight: 'bold', color: '#1e1e1e' },

    gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingVertical:-height*0.35,
    paddingBottom: 90,
  },
  card: {
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#333',
    position: 'relative',
  },
  largeCard: {
    width: width * 0.9,
    height: width * 0.55,
  },
  smallCard: {
    width: width * 0.43,
    height: width * 0.43,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardText: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
