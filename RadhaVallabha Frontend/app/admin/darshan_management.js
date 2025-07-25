import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const initialTabs = ['Sringar', 'Mangala', 'Festival'];

const images = [
  {
    id: 1,
    date: 'July 3, 2025',
    category: 'Sringar',
    caption: 'Rath Yatra 2025',
    visible: true,
    image: require('../../assets/images/krsna ji.png'),
  },
  {
    id: 2,
    date: 'July 1, 2025',
    category: 'Mangala',
    caption: '',
    visible: true,
    image: require('../../assets/images/krsna ji.png'),
  },
  {
    id: 3,
    date: 'July 5, 2025',
    category: 'Festival',
    caption: '',
    visible: true,
    image: require('../../assets/images/krsna ji.png'),
  },
];

export default function GalleryManagementScreen() {
  useAuthGuard();
  const router = useRouter();

  const [tabs, setTabs] = useState(initialTabs);
  const [activeTab, setActiveTab] = useState(initialTabs[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTab, setNewTab] = useState('');

  const filteredImages = images.filter((img) => img.category === activeTab);

  const handleAddTab = () => {
    if (newTab.trim() && !tabs.includes(newTab)) {
      setTabs([...tabs, newTab]);
      setNewTab('');
      setModalVisible(false);
    }
  };

  return (
    <>
      <Header />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Darshan Gallery</Text>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tabButton, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addTabButton}>
            <Icon name="add" size={20} color="white" />
          </TouchableOpacity>
        </ScrollView>

        {/* Images */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {filteredImages.length > 0 ? (
            filteredImages.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.imageRow}>
                  <Image source={item.image} style={styles.image} />
                  <View style={styles.details}>
                    <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
                      Category: <Text style={styles.bold}>{item.category}</Text>
                    </Text>
                    <Text style={styles.label}>
                      Date: <Text>{item.date || '-'}</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.iconRow}>
                  <TouchableOpacity onPress={() => router.push('./gallery_management')}>
                    <Icon name="create-outline" size={20} color="#ccc" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="trash-outline" size={20} color="#ccc" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No images found for this category.</Text>
          )}
        </ScrollView>

        {/* FAB */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push({ pathname: './upload_darshan', params: { tab:tabs } })}
        >
          <Icon name="add-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Add Tab Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Tab</Text>
              <TextInput
                style={styles.input}
                placeholder="Tab Name"
                value={newTab}
                onChangeText={setNewTab}
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleAddTab}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <CustomTabBar_admin />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f20',
    paddingHorizontal: RFValue(16),
    paddingTop: RFValue(20),
  },
  title: {
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: RFValue(10),
  },
  tabContainer: {
    marginBottom: RFValue(10),
  },
 tabButton: {
  backgroundColor: '#7e57c2',
  borderRadius: 20,
  paddingHorizontal: 15,
  height: RFValue(38), // Set a fixed height
  justifyContent: 'center', // Center text vertically
  alignItems: 'center', // Center text horizontally
  marginRight: 10,
},
  activeTab: {
    backgroundColor: '#6a6aff',
  },
tabText: {
  color: 'white',
  fontSize: RFValue(12),
  textAlign: 'center',
},

  addTabButton: {
    backgroundColor: '#7e57c2',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingBottom: RFValue(100),
  },
  card: {
    backgroundColor: '#1c1c2b',
    borderRadius: RFValue(12),
    padding: RFValue(12),
    marginBottom: RFValue(16),
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(6),
    marginRight: RFValue(10),
  },
  details: {
    flex: 1,
  },
  label: {
    color: '#ccc',
    fontSize: RFValue(13),
    marginBottom: RFValue(4),
  },
  bold: {
    fontWeight: 'bold',
    color: 'white',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: RFValue(16),
    marginTop: RFValue(10),
  },
  noDataText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: RFValue(20),
    fontSize: RFValue(14),
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 110,
    backgroundColor: '#e91e63',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: RFValue(14),
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#6a6aff',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
