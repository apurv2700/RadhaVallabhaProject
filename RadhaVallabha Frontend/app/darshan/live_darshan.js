import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/header';
import CustomTabBar from '../../components/tab';
import useAuthGuard from '../../hooks/useAuthGuard';
const { width,height } = Dimensions.get('window');

export default function DarshanScreen() {
   useAuthGuard(); //Protects this screen
  return (
    <SafeAreaView style={styles.container}>
        <Header />

      {/* Title Bar */}
      <View style={styles.pageTitleBar}>
      
        <Text style={styles.pageTitle}>DAILY DARSHAN</Text>
      </View>
      
              <Image source={require('../../assets/images/deity-bg-lotus.png')} style={styles.flowerTopLeft} />
              <Image source={require('../../assets/images/deity-bg-lotus.png')} style={styles.flowerTopRight} />
      <ScrollView>
        {/* Live Darshan */}
        <Text style={styles.sectionTitle}>Live Darshan</Text>
        <View style={styles.liveDarshan}>
          <Image
            source={require('../../assets/images/Live.jpg')}
            style={styles.liveImage}
          />
          <Ionicons name="play-circle" size={50} color="#fff" style={styles.playIcon} />
        </View>

        {/* Daily Darshan */}
        <View style={styles.carouselHeader}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
          <Text style={styles.sectionTitle}>Daily Darshan</Text>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </View>
          
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Daily Darshan</Text>
          <Text style={styles.cardDate}>16 JUNE, 2025</Text>
          <TouchableOpacity style={styles.visitBtn}>
            <Ionicons name="open-outline" size={14} color="white" />
            <Text style={styles.visitText}>Visit Now</Text>
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/Live.jpg')}
            style={styles.cardImage}
          />
          <Ionicons name="chevron-forward-circle" size={30} color="#fff" style={styles.arrowIcon} />
        </View>
      </ScrollView>
   <CustomTabBar/>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },

  

  pageTitleBar: {
    backgroundColor: '#efb6d4',
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  pageTitle: {
    color: '#1e1e1e',
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  sectionTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },

  liveDarshan: {
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  liveImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  playIcon: {
    position: 'absolute',
    top: '40%',
    left: '42%',
  },

  carouselHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    alignItems: 'center',
    marginTop: 45,
    
  },

  card: {
    marginHorizontal: width * 0.04,         // ~16px on standard 400px width
    marginTop: height * 0.07,               // instead of negative top
    backgroundColor: '#9c27b0',
    borderRadius: width * 0.04,             // makes corners adaptive
    padding: width * 0.04,                  // instead of 16
    position: 'relative',
    minHeight: height * 0.18,               // responsive height
  },
  cardHeading: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cardDate: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  visitBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 6,
  },
  visitText: { color: '#9c27b0', fontWeight: 'bold', fontSize: 12 },

  cardImage: {
    width: '50%',
    height: height*0.15,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: -height*0.10,
    left:width* 0.42,
    // top:-height*0.15
  },
  arrowIcon: {
    position: 'absolute',
    right: 3,
    top: '50%',
  },

  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#7e57c2',
    paddingVertical: 12,
    alignItems: 'center',
  },
  homeCircle: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: -24,
    justifyContent: 'center',
    alignItems: 'center',
  },

    flowerTopLeft: {
    position: 'absolute',
    top: 320,
    left: -80,
    width: width * 0.40,
    height: width * 0.75,
    resizeMode: 'contain',
    opacity: 0.5,
  },
  flowerTopRight: {
    position: 'absolute',
    top: 320,
    right: -80,
    width: width * 0.40,
    height: width * 0.75,
    resizeMode: 'contain',
    opacity: 0.5,
  },
});
