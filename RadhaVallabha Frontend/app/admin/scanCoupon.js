import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';


export default function QRScanner() {
    const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);

const handleBarCodeScanned = async ({ data }) => {
  console.log('QR Code scanned:', data); // this `data` should be the QR ID like "dba77f46-..."
 

  try {
    const response = await fetch(`http://192.168.1.43:3000/api/use/${data}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();

    if (response.ok) {
         await AsyncStorage.removeItem('couponId');
      router.push('../coupon/generate_cou');

      console.log('QR marked as used:', result);
    } else {
      console.warn('Failed to mark as used:', result.message);
      
    }
  } catch (error) {
    console.error('Error using QR:', error);
  }
};



//   const handleBarCodeScanned = ({ data }) => {
//     console.log('QR Code scanned:', data);
//     updateQRStatus(data);
//   };

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onCameraReady={() => setCameraReady(true)}
        ref={cameraRef}
      />
      {cameraReady && (
        <View style={styles.textContainer}>
          <Text style={styles.scanText}>Scan the QR Code</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#999',
  },
  textContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 8,
  },
  scanText: {
    color: '#fff',
    fontSize: 18,
  },
});
