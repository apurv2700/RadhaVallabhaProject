import { FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width ,height} = Dimensions.get('window');

const InfoItem = ({ iconName, text }) => (
  <View style={styles.infoItem}>
    <FontAwesome name={iconName} size={14} color="#e2d9f8" style={styles.infoIcon} />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const Footer = () => {
  return (
    <View style={styles.footerWrapper}>
      {/* Top curved border */}
      <LinearGradient
        colors={['#8A63D2', '#8A63D2']}
        style={styles.curvedTop}
      />

      {/* Purple background */}
      <ImageBackground
        source={require('../assets/images/bg-dots.png')}
        resizeMode="cover"
        style={styles.footerBackground}
      >
        {/* Map, logo, description */}
        <View style={styles.topRow}>
        {/* Map */}
        <View style={styles.rowItem}>
         <MapView
            style={styles.map}
            initialRegion={{
              latitude: 23.2601,
              longitude: 77.4178,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{ latitude: 23.2601, longitude: 77.4178 }}
              title="ISKCON Bhopal"
              description="Sri Gaur Radha Vallabha Temple"
            />
          </MapView>
        </View>

        {/* vertical divider */}
        <View style={styles.verticalDivider} />

        {/* Logo and social icons */}
        <View style={styles.rowItem}>
          <Image
            source={require('../assets/images/iskcon-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.socialIcons}>
            {['facebook', 'instagram', 'twitter', 'youtube', 'whatsapp'].map((icon, idx) => (
              <FontAwesome
                name={icon}
                key={idx}
                size={16}
                color="#fff"
                style={styles.socialIcon}
              />
            ))}
          </View>
        </View>

        {/* vertical divider */}
        <View style={styles.verticalDivider} />

        {/* Description */}
        <View style={styles.rowItem}>
          <Text style={styles.description}>
            Sri Gaura Radha Vallabha Temple is an ISKCON Temple situated in Patel Nagar,
            Raisen Road, Bhopal, M.P.
          </Text>
        </View>
      </View>

          <View style={styles.linksRow}>
        {/* Explore */}
        <View style={styles.linkColumn}>
          <Text style={styles.linkHeader}>Explore</Text>
          {['Home', 'About', 'Gallery', 'Media', 'Contact'].map((item) => (
            <Text key={item} style={styles.linkText}>• {item}</Text>
          ))}
        </View>

        {/* Support */}
        <View style={styles.linkColumn}>
          <Text style={styles.linkHeader}>Support</Text>
          {['Donate', 'Volunteer', 'Seva', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
            <Text key={item} style={styles.linkText}>• {item}</Text>
          ))}
        </View>

        {/* Contact */}
        <View style={styles.linkColumn}>
          <Text style={styles.linkHeader}>Contact</Text>
          <InfoItem iconName="phone" text="+91-88155-63358" />
          <InfoItem iconName="envelope" text="iskconbhopal@gmail.com" />
          <InfoItem iconName="map-marker" text="Hare Krishna Land, ISKCON Bhopal, Patel Nagar, Bhopal, MP" />
        </View>

        {/* Lotus flower after Contact */}
        <Image
          source={require('../assets/images/deity-bg-lotus.png')}
          style={styles.lotus}
          resizeMode="contain"
        />
      </View>

      </ImageBackground>

  
   
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerWrapper: {
    width: '100%',
    backgroundColor: '#000',
    overflow: 'hidden',
    borderTopLeftRadius:  50,
    borderTopRightRadius:  50,
  },

  footerBackground: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#7E57C2',
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
map: {
  width: width * 0.25,
  height: width * 0.2,
  borderRadius: 20,        // curves the border
  overflow: 'hidden',      // ensures the content follows the curve
  marginBottom: 14,
  borderWidth: 2,
  borderColor: '#fff',
  top: height * 0.007,
},
  logoSection: {
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: width * 0.4,
    height: 60,
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 9,
    marginHorizontal: 7,
  },
 
  description: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 11,
    marginTop: 6,
    lineHeight: 15,
  },

  linkColumn: {
    width: width < 600 ? '45%' : '30%',
    marginBottom: 16,
  },
  linkHeader: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 12,
  },
  linkText: {
    color: '#e2d9f8',
    marginBottom: 4,
    marginRight:12,
    fontSize: 11,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  infoIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  infoText: {
    color: '#e2d9f8',
    fontSize: 9,
    flex: 1,
  },

  bottomBar: {
    backgroundColor: '#000',
    paddingVertical: 10,
    alignItems: 'center',
  },

 topRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap', // if you want wrap on overflow, or remove it to force horizontal scroll
  marginBottom: 10,
  gap: 2,
},
rowItem: {
  width: '30%',  // always 30% regardless of screen width
  alignItems: 'center',
  marginVertical: 0,
},
verticalDivider: {
  width: 2,
  height: '80%',
  backgroundColor: '#fff',
  opacity: 0.7,
},
linksRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  // remove flexWrap to force horizontal
  marginTop: 20,
},
linkColumn: {
  width: '22%',      // consistently 22% on all screens
  alignItems: 'flex-start',
  marginBottom: 12,
},
lotus: {
  width: 250,
  height: 180,
  alignSelf: 'flex-start',
  marginLeft: 2,
},

});
