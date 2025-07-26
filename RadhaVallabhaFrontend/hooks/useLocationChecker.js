import * as Location from 'expo-location';
import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



const BISP_BHOPAL = {
    latitude: 23.1909,
    longitude: 77.4358
};

export default function useLocationChecker() {
  const intervalRef = useRef(null);
   

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return;
      }

      checkLocation(); // Check immediately
      intervalRef.current = setInterval(() => {
        checkLocation();
      }, 15 * 60 * 1000); // every 15 minutes
    })();

    return () => clearInterval(intervalRef.current);
  }, []);

  const checkLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const distance = getDistanceInMeters(
        location.coords.latitude,
        location.coords.longitude,
        BISP_BHOPAL.latitude,
        BISP_BHOPAL.longitude
      );
      const existingCouponId = await AsyncStorage.getItem('couponId');

      console.log("User is", distance, "meters away");

      if (distance < 50) {
        console.log("✅ User is at the target location (within 50 meters)");
        // You can perform actions here (e.g. send API, mark attendance)
      } else {
          try {
    const response = await fetch(`http://192.168.1.43:3000/api/user/location/${existingCouponId}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();

    if (response.ok) {
      await AsyncStorage.removeItem('couponId');
      console.log('QR marked as Invalid:', result);
    } else {
      console.warn('Failed to mark as Invalid:', result.message);
   
    }
  } catch (error) {
    console.error('Error using QR:', error);
  }
      }
    } catch (e) {
      console.error("Error checking location", e);
    }
  };
}


function getDistanceInMeters(lat1, lon1, lat2, lon2) {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371e3; // meters

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
