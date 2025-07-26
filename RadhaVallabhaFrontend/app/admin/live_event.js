import React, { useState,useEffect } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';
import { useLocalSearchParams } from 'expo-router';
import { HOST,PORT } from '@env';

const { width, height } = Dimensions.get('window');


const statusColors = {
  VALID: 'green',
  USED: 'gray',
  INVALID: 'red',
};



const LiveEventDashboard = () => {
  useAuthGuard();
  const router = useRouter();
  const { festivalId } = useLocalSearchParams();
  const [coupons, setCoupons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
   const [loading, setLoading] = useState(false);
   const totalGenerated = coupons.length;
   const usedCount = coupons.filter(coupon => coupon.status === 'Used' ).length;
   const inValidatedCount = coupons.filter(coupon => coupon.status === 'INVALID' ).length;
   const activeCount = coupons.filter(coupon => coupon.isActive ).length;


  useEffect(() => {
    if (!festivalId) return;

    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://${HOST}:${PORT}/api/coupons/byFestival/${festivalId}`
        );
        setCoupons(response.data);
        
      } catch (error) {
        console.error('Failed to fetch coupons:', error.message);
        Alert.alert('Error', 'Could not load coupons');
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [festivalId]);

  const handleToggleStatus = (coupon) => {
    const updatedCoupons = coupons.map((c) =>
      c.id === coupon.id
        ? {
            ...c,
            status:
              c.status === 'VALID'
                ? 'USED'
                : c.status === 'USED'
                ? 'INVALID'
                : 'VALID',
          }
        : c
    );
    setCoupons(updatedCoupons);
  };

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon?.personName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon?.id.includes(searchQuery)
  );

  const renderCoupon = ({ item }) => (
    <View style={styles.couponItem}>
      <Text style={styles.couponName}>{item.personName}</Text>
      <TouchableOpacity onPress={() => handleToggleStatus(item)}>
        <Text style={[styles.couponStatus, { color: statusColors[item.status] }]}>
          {item.status}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Header />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Live Event Dashboard</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalGenerated}</Text>
            <Text style={styles.statLabel}>Total Generated</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{usedCount}</Text>
            <Text style={styles.statLabel}>Coupons Scanned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{inValidatedCount}</Text>
            <Text style={styles.statLabel}>Coupons Invalidated</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{activeCount}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
        </View>

        <TextInput
          style={styles.searchBar}
          placeholder="Search by name or coupon ID..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#aaa"
        />
         {loading ? (
          <Text style={{ color: '#aaa', textAlign: 'center' }}>Loading...</Text>
        ) : (
        <FlatList
          data={filteredCoupons}
          renderItem={renderCoupon}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
        )}
      </SafeAreaView>
      <CustomTabBar_admin />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e12',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:height * 0.01,
    paddingHorizontal: width * 0.04,
    backgroundColor: '#0e0e12',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.04,
    marginTop: height * 0.01,
  },
  statCard: {
    backgroundColor: '#1a1a28',
    borderRadius: 10,
    padding: width * 0.05,
    width: '48%',
    marginBottom: height * 0.02,
    alignItems: 'center',
    elevation: 3,
  },
  statValue: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: width * 0.035,
    color: '#aaa',
    textAlign: 'center',
  },
  searchBar: {
    backgroundColor: '#1a1a28',
    borderRadius: 8,
    padding: width * 0.035,
    fontSize: width * 0.04,
    marginHorizontal: width * 0.04,
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
    color: 'white',
  },
  listContent: {
    paddingBottom: height * 0.15,
  },
  couponItem: {
    backgroundColor: '#1a1a28',
    borderRadius: 10,
    padding: width * 0.04,
    marginBottom: height * 0.015,
    marginHorizontal: width * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  couponName: {
    fontSize: width * 0.04,
    color: '#fff',
    fontWeight: '500',
  },
  couponStatus: {
    fontSize: width * 0.035,
    fontWeight: 'bold',
  },
});

export default LiveEventDashboard;
