import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Header from '../../components/header';
import CustomTabBar from '../../components/tab';

const { width ,height} = Dimensions.get('window');

export default function DarshanScreen() {
  return (
    <SafeAreaView style={styles.container}>
       <Header />
      {/* Progress Bar */}
      <View style={styles.progressBar} />

      {/* Date & Thumbnail Row */}
      <View style={styles.dateRow}>
        <Image
          source={require('../../assets/images/Live.jpg')} // Your small round image
          style={styles.roundImage}
        />
        <Text style={styles.dateText}>25 June 2025</Text>
      </View>

      {/* Darshan Image */}
      <Image
        source={require('../../assets/images/Live.jpg')} // Main darshan image
        style={styles.mainImage}
      />

      {/* Caption */}
      <Text style={styles.caption}>Iskcon Bhopal @25 May Sringar Darshan</Text>

      <CustomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#181818' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2e104f',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  logo: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    paddingHorizontal: 5,
  },
  prasadamBtn: {
    backgroundColor: '#7e57c2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  prasadamText: {
    color: 'white',
    fontSize: 10,
  },

  progressBar: {
    height: 5,
    width: '100%',
    backgroundColor: '#444',
    marginTop: 0,
    top: height * 0.03
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
    gap: 10,
  },
  roundImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    top: height * 0.03
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    top: height * 0.03
  },

  mainImage: {
    width: width - 20,
    height: 300,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 14,
    top:height * 0.16
  },
  caption: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 10,
    top: height * 0.25
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
});
