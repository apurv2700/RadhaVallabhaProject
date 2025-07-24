import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import useAuthGuard from '../../hooks/useAuthGuard';
import Header from '../../components/header';
import CustomTabBar from '../../components/tab';


const { width,height} = Dimensions.get('window');

export default function WelcomeTempleScreen({ isDarkMode, toggleTheme }) {
  useAuthGuard(); //Protects this screen
  const router = useRouter();

  // correct place for scrollAnim
 const scrollAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loopAnimation = () => {
      scrollAnim.setValue(0);
      Animated.timing(scrollAnim, {
        toValue: -width,
        duration : 10000,
        useNativeDriver: true,
      }).start(() => loopAnimation());
    };
    loopAnimation();
  }, [scrollAnim]);


  


  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Temple Banner */}
        <View style={styles.bannerContainer}>
          <Text style={styles.welcomeText}>WELCOME TO</Text>
          

          {/* background dot */}
          <Image
            source={require('../../assets/images/bg-dots.png')}
            style={styles.backgroundDots}
          />

          {/* Half lotus top left */}
          <Image
            source={require('../../assets/images/deity-bg-lotus.png')}
            style={styles.leftHalfLotus}
          />

          {/* Half lotus top right */}
          <Image
            source={require('../../assets/images/deity-bg-lotus.png')}
            style={styles.rightHalfLotus}
          />

          {/* Deity in lotus */}
          <View style={styles.lotusWrapper}>
            <Image
              source={require('../../assets/images/deity-bg-lotus.png')}
              style={styles.lotusImage}
            />
            <Image
              source={require('../../assets/images/Deity-img.png')}
              style={styles.deityOnLotus}
            />
             {/* move templeTitle here to overlap */}
            <Text style={styles.templeTitle}>
              Sri Gaura Radha{'\n'}Vallabha Temple
            </Text>
          </View>
        </View>

        {/* Hare Krishna Chant Bar */}
       <LinearGradient
        colors={['#7e57c2', '#7e57c2']}
        style={styles.chantBar}
        >
        <Animated.View
          style={{
            flexDirection: 'row',
            transform: [
              {
                translateX: scrollAnim,
              },
            ],
          }}
        >
          <Text style={styles.chantText}>
            Hare Krsna Hare Krsna Krsna Krsna Hare Hare - 
          </Text>
          <Text style={styles.chantText}>
             Hare Rama Hare Rama Rama Rama Hare Hare - 
          </Text>
           <Text style={styles.chantText}>
             Hare Krsna Hare Krsna Krsna Krsna Hare Hare 
          </Text>

        </Animated.View>

        </LinearGradient>


        {/* Action Cards */}
        <View style={styles.cardsContainer}>
          {/* Row 1 */}
          <View style={styles.cardRow}>
            <TouchableOpacity
              style={styles.card1}
              onPress={() => router.push('../darshan/live_darshan')}
            >
              <Image
                source={require('../../assets/images/Live.jpg')}
                style={styles.cardImage1}
              
              />
              <Text style={styles.cardText}   onPress={() => router.push('../darshan/live_darshan')}>Live Darshan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card2}
              onPress={() => router.push('../activities/all_activity')}
            >
              <Image
                source={require('../../assets/images/Live.jpg')}
                style={styles.cardImage2}
              />
              <Text style={styles.cardText2}>Our Activities</Text>
            </TouchableOpacity>

            
          </View>

            {/* Row 1 */}
          <View style={styles.cardRow}>
           <TouchableOpacity
              style={styles.card3}
              onPress={() => router.push('../gallery/gallery')}
            >
              <Image
                source={require('../../assets/images/Live.jpg')}
                style={styles.cardImage3}
              />
              <Text style={styles.cardText3}>Explore Gallery</Text>
            </TouchableOpacity>
             <TouchableOpacity
              style={styles.card4}
              onPress={() => router.push('../video/latest_video')}
            >
              <Image
                source={require('../../assets/images/Live.jpg')}
                style={styles.cardImage4}
              />
              <Text style={styles.cardText4} onPress={() => router.push('../video/latest_video')}>Latest Videos</Text>
            </TouchableOpacity>

          </View>
          {/* Upcoming Festivals */}
          <TouchableOpacity
            style={[styles.card5, ]}
            onPress={() => router.push('../upcoming_festival/festival')}
          >
            <Image
              source={require('../../assets/images/Live.jpg')}
              style={styles.cardImage5}
            />
            <Text style={styles.cardText5} onPress={() => router.push('../upcoming_festival/festival')}>Upcoming Festivals</Text>
          </TouchableOpacity>
        </View>
        
 <CustomTabBar />
       
      </ScrollView>
      
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingBottom: 0,
    backgroundColor: '#121212',
  },
  bannerContainer: {
    alignItems: 'center',
    marginBottom: 0,
    paddingBottom: 0,
    marginTop: 0,
  },
lotusWrapper: {
  width: width * 0.9,                   // 90% of screen width
  height: height * 0.37,                 // 40% of screen height
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
},
lotusImage: {
  width: '100%',                        // match wrapper width
  height: '100%',                       // match wrapper height
  resizeMode: 'contain',
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0.8,
},

deityOnLotus: {
  width: width * 0.9,      // 90% of screen width
  height: height * 0.42,    // 40% of screen height
  resizeMode: 'contain',
  position: 'absolute',
  top: height * 0.02,      // 2% of screen height
  left: width * 0.02,      // 2% of screen width
},

  chantBar: {
    width: '100%',
    paddingVertical: 6,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 0,
    overflow: 'hidden',
    
  },
  leftHalfLotus: {
    position: 'absolute',
    top: -50,
    left: -60,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    opacity: 0.5,
  },
  rightHalfLotus: {
    position: 'absolute',
    top: -50,
    right: -60,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    transform: [{ scaleX: -1 }],
    opacity: 0.5,
  },
  backgroundDots: {
    position: 'absolute',
    top: 50,
    left: -30,
    width: '100%',
    height: '95%',
    resizeMode: 'cover',
    opacity: 0.5,
    zIndex: -1,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'pangram',
    letterSpacing: 1,
    fontWeight: 'bold',
    marginTop:5,
    marginBottom:30
  },
 templeTitle: {
  color: '#fff',
  fontSize: 30,
  fontFamily:'BerkshireSwash_400Regular',
  textAlign: 'center',
  position: 'absolute',    // add this
  top: -20,                 // adjust top
  width: '100%', 
            // center
},
chantText: {
  color: '#fff',
  fontSize: 14,
  fontFamily: 'JosefinSans_700Bold',
},


  cardsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    zIndex: 0,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card1: {
    width: width * 0.45,
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    height:height * 0.25,
    overflow: 'hidden',
  },
    card2: {
    width: width * 0.45,
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    overflow: 'hidden',
    height:height * 0.15,
    position:'relative',
  },
    card3: {
    width:  width * 0.45,
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    height:height * 0.22,
    overflow: 'hidden',
  },
    card4: {
    width: width * 0.45,
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    overflow: 'hidden',
    height:height * 0.14,
    top:-height * 0.10
  },
    card5: {
    width: width * 0.45,
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    overflow: 'hidden',
    height:height * 0.17,
    top:-height * 0.18,
    left:width * 0.48
  },
  fullWidthCard: {
    width: '100%',
    marginTop: 10,
  },

  cardImage1: {
  width: 200,
  height: height * 0.25,
},
  cardImage2: {
  width: 200,
  height: height * 0.19,
},
 cardImage3: {
  width: 200,
  height:height * 0.22 ,
},
 cardImage4: {
  width: 200,
  height: height * 0.19,
},
 cardImage5: {
  width: 200,
  height: height * 0.19,
},
  cardText: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
    cardText2: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
     cardText3: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
     cardText4: {
    position: 'absolute',
    bottom: 10,
    left: 6,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
    cardText5: {
    position: 'absolute',
    bottom: 10,
    left: 6,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
});
