import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';

const quizzes = [
  {
    id: '1',
    title: 'Bhagavad Gita 2.13 Explained',
    questions: 5,
    passing: '70%',
    attempts: 120,
    avgScore: '82%',
    avgColor: '#2ecc71',
  },
  {
    id: '2',
    title: 'Daily Verses from Gita',
    questions: 10,
    passing: '80%',
    attempts: 95,
    avgScore: '76%',
    avgColor: '#f1c40f',
  },
  {
    id: '3',
    title: 'Understanding Karma Yoga',
    questions: 7,
    passing: '75%',
    attempts: 134,
    avgScore: '64%',
    avgColor: '#e74c3c',
  },
    {
    id: '4',
    title: 'Understanding Karma Yoga',
    questions: 7,
    passing: '75%',
    attempts: 134,
    avgScore: '64%',
    avgColor: '#e74c3c',
  },
      {
    id: '5',
    title: 'Understanding Karma Yoga',
    questions: 7,
    passing: '75%',
    attempts: 134,
    avgScore: '64%',
    avgColor: '#e74c3c',
  },
];

export default function QuizDashboardScreen() {
  useAuthGuard();

  return (
    <>
      <Header />
      
      <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
          <Text style={styles.header}>Quiz Dashboard</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
        

          {quizzes.map((quiz) => (
            <View key={quiz.id} style={styles.card}>
              <Text style={styles.title}>{quiz.title}</Text>

              <View style={styles.row}>
                <View style={styles.row}>
                  <Ionicons name="document-text-outline" size={16} color="#aaa" />
                  <Text style={styles.text}> {quiz.questions} Questions</Text>
                </View>
                <Text style={styles.text}>Passing: {quiz.passing}</Text>
              </View>

              <Text style={[styles.text, { marginTop: 4 }]}>
                {quiz.attempts} attempts
              </Text>

              <View style={styles.badgeRow}>
                <Text style={[styles.scoreBadge, { backgroundColor: quiz.avgColor }]}>
                  Avg Score: {quiz.avgScore}
                </Text>
              </View>

              <View style={styles.btnRow}>
                <TouchableOpacity style={[styles.btn, { backgroundColor: '#6c5ce7' }]}>
                  <Text style={styles.btnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, { backgroundColor: '#636e72' }]}>
                  <Text style={styles.btnText}>View Results</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, { backgroundColor: '#e74c3c' }]}>
                  <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        <CustomTabBar_admin />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // So that the last card isn't hidden behind the tab bar
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    color: '#ccc',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeRow: {
    marginTop: 8,
  },
  scoreBadge: {
    color: '#fff',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
