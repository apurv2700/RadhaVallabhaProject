import { useRouter } from 'expo-router';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../../components/header';
import CustomTabBar from '../../components/tab';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST,PORT } from '@env';

const { width, height } = Dimensions.get('window');
const CouponScreen = () => {

    const router = useRouter();
    const [personName, setPersonName] = useState('');
    const [numDevotees, setNumDevotees] = useState('');
    const [festival, setFestival] = useState(null);
    const [location, setLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId ,setUserId] =useState(null);
useEffect(() => {
  const initializeApp = async () => {

  
    await Promise.all([
      fetchActiveFestival(),
      getUserLocation(),
      getUserId()
    ]);
    setLoading(false);
  };

  const fetchActiveFestival = async () => {
    try {
      const response = await fetch(`http://${HOST}:${PORT}/api/prasadam/active`);
      const data = await response.json();
      if (response.ok && data.length > 0) {
        setFestival(data[0]);
       
      } else {
        setFestival(null);
      }
    } catch (error) {
      console.error('Error fetching active festival:', error);
      setFestival(null);
    }
  };

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Permission denied');
        return;
      }
      const currentLoc = await Location.getCurrentPositionAsync({});
      setLocation(currentLoc.coords); // { latitude, longitude }
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationError('Location fetch failed');
    }
  };

const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId'); // no JSON.parse
    if (userId) {
      setUserId(userId);  // already a string or number
    }
  } catch (error) {
    console.error('Error reading user ID from AsyncStorage:', error);
  }
};
  initializeApp();
}, []);

const handleGenerateCoupon = async () => {
  if (!personName || !numDevotees ) {
    alert('Please fill all the fields');
    return;
  }

  if (!location) {
    alert('Location not available. Please enable location services.');
    return;
  }

    //=Validate time window
  const now = new Date(); // current time
  const qrStart = new Date(festival?.qrStart); // must be valid ISO or Date string
  const qrEnd = new Date(festival?.qrEnd);

  if (!(qrStart <= now && now <= qrEnd)) {
    alert('QR code generation is only allowed during the specified time window.');
    return;
  }

  try {
    const response = await fetch(`http://${HOST}:${PORT}/api/coupon/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        personName,
        numDevotees,
        festivalName: festival?.festivalName ?? '',
        festivalId: festival?.id ?? null,
        userLocation: {
            latitude: location?.latitude ?? null,
             longitude: location?.longitude ?? null,
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Coupon generated!');
     await AsyncStorage.setItem('couponId', data.couponId);
      router.replace({ pathname: './gen_coupon', params: { couponId: data.couponId } });
    } else {
      alert(data.message || 'Coupon generation failed.');
    }
  } catch (err) {
    console.error(err);
    alert('Server error');
  }
};



  return (
    <View style={styles.container}>
      {/* Header */}
      <Header/>
     

         <View style={styles.pageTitleBar}>
            
              <Text style={styles.pageTitle}>GENERATE COUPON</Text>
        </View>

      {/* Main content */}
      <View style={styles.card}>
            {loading ? (
        <Text style={styles.title}>Loading...</Text>
      ) : festival ? (
        <Text style={styles.title}>{festival.festivalName}</Text>
      ) : (
        <Text style={styles.title}>No Active Festival</Text>
      )}


        <View style={styles.divider} />
        <Text style={styles.subtitle}>Hare Krishna!</Text>

        {/* Name Input */}
        <View style={styles.inputRow}>
          <Icon name="user" size={18} color="#fff" style={styles.icon} />
          <TextInput
          placeholder="Person Name"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={personName}
          onChangeText={setPersonName}
          />
        </View>

        {/* Number of Devotees Input */}
        <View style={styles.inputRow}>
          <Icon name="users" size={18} color="#fff" style={styles.icon} />
          <TextInput
              placeholder="Number Of Devotees"
            placeholderTextColor="#ccc"
            keyboardType="number-pad"
            style={styles.input}
            value={numDevotees}
            onChangeText={setNumDevotees}
          />
        </View>

        {/* Generate Button */}
        <TouchableOpacity style={styles.generateBtn} onPress={handleGenerateCoupon}>
          <Text style={styles.generateText} >🎟 Generate Coupon</Text>
        </TouchableOpacity>

      

        {/* Notice */}
        <View style={styles.noticeBox}>

               <Text style={styles.noticeHead}>
                        
                             NOTICE
                </Text>
          <Text style={styles.noticeText}>
            If you go outside the temple campus for more than 50 metre, the coupon will be expired and you can’t take prasadam from this coupon.
          </Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <CustomTabBar/>
    </View>
  );
};

export default CouponScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
  },
  header: {
    height: height * 0.18,
    backgroundColor: '#f8c8dc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  logo: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 15,
    left: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  card: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    
    
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    marginBottom: 4,
    textShadowColor: '#7e57c2',
    textShadowRadius: 28,
     top:height*0.02
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
    top:height*0.03
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 5,
     top:height*0.05
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#fff',
    fontSize: 16,
  },
  generateBtn: {
    backgroundColor: '#a46be7',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 25,
    alignItems: 'center',
    top:height*0.03
  },
  generateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
noticeBox: {
  backgroundColor: '#333',
  borderRadius: width * 0.025,      // ~10 for most devices
  padding: width * 0.05,            // ~20 padding based on width
  marginTop: height * 0.055,         // 2% vertical spacing
  marginHorizontal: width * 0.05,   // 5% horizontal spacing (optional)
},
  noticeText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#a46be7',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  noticeHead :{
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    bottom:10,
    top:-height*0.02
},
  pageTitleBar: {
    backgroundColor: '#efb6d4',
    paddingVertical: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
    pageTitle: {
    color: '#1e1e1e',
    fontWeight: 'bold',
    fontSize: 20,
  },
  divider: {
  height: 3,
  backgroundColor: '#888',
  width: '40%',
  alignSelf: 'center',
  marginVertical: 8,
   top:height*0.02
},

});
