// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, Alert } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';

// export default function QRScannerScreen() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     if (!scanned) {
//       setScanned(true);
//       Alert.alert('Scanned!', `Data: ${data}`, [
//         { text: 'OK', onPress: () => setScanned(false) },
//       ]);
//     }
//   };

//   if (hasPermission === null) {
//     return (
//       <View style={styles.centered}>
//         <Text>Requesting for camera permission...</Text>
//       </View>
//     );
//   }
//   if (hasPermission === false) {
//     return (
//       <View style={styles.centered}>
//         <Text>No access to camera</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//       />
//       <View style={styles.textContainer}>
//         <Text style={styles.scanText}>Scan the QR Code</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textContainer: {
//     position: 'absolute',
//     top: 50,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     zIndex: 1,
//   },
//   scanText: {
//     fontSize: 18,
//     color: 'white',
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 8,
//     textAlign: 'center',
//   },
// });
