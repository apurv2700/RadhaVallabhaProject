import { Entypo, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { HOST,PORT } from '@env';

import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Footer from '../../components/footer';
import Header from '../../components/loginHeader';


const { width } = Dimensions.get('window');
const router = useRouter();
export default function LoginScreen({ isDarkMode, toggleTheme }) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
 const backgroundColor = isDarkMode ? '#000' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#000';
const handleLogin = async () => {
  if (!emailOrPhone || !password) {
    alert("Please fill in both fields");
    return;
  }
  

  try {
    const response = await fetch(`http://${HOST}:${PORT}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailOrPhone,
        password: password
      })
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      const raw = await response.text();
      console.error("Non-JSON response:", raw);
      alert("Server returned non-JSON response.");
      return;
    }

    if (response.ok) {
      //  Save token and user info
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('userId', data.user.id);
      await AsyncStorage.setItem('userData', JSON.stringify(data.user));

      const email= data.user.email;
      const role=data.user.role;
      const status = data.user.status;
      

      // Conditional redirection
      if ((email === 'apurv@admin.com' || role === 'admin' || role === 'sub_admin' || role === 'super_admin') && status === 'Active') {
        router.replace('../admin/admin_dashboard');
      } else if (status === 'Active') {
        router.replace('../dashboard/dashboard');
      } else {
        alert("Login Failed: Account inactive or blocked.");
      }

    } else {
      alert("Login Failed: Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Could not connect to server. Please check your network.");
  }
};


  
  return (
    <SafeAreaView style={styles.safeArea}>
       <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require('../../assets/images/Login.png')}
          style={styles.bannerImage}
          resizeMode="contain"
        />

        <View style={styles.container}>
          <Text style={styles.heading}>Hare Krishna!</Text>
          <Text style={styles.subHeading}>Sign in here!</Text>

          {/* Email or Phone */}
          <View style={styles.inputRow}>
            <FontAwesome name="user" size={18} color="#ccc" style={styles.icon} />
            <TextInput
              placeholder="Your Email or Phone Number"
              placeholderTextColor="#aaa"
              style={styles.input}
              keyboardType="email-address"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
            />
          </View>

          {/* Password */}
          <View style={styles.inputRow}>
            <FontAwesome name="lock" size={18} color="#ccc" style={styles.icon} />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#aaa"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Entypo name="eye-with-line" size={18} color="#ccc" style={styles.iconRight} />
          </View>

          {/* Remember Me and Forgot Password */}
          <View style={styles.rowSpace}>
            <TouchableOpacity
              style={styles.rememberMeRow}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <FontAwesome
                name={rememberMe ? "check-square" : "square-o"}
                size={18}
                color="#fff"
              />
              <Text style={styles.rememberMeText}> Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('./forgot_password')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
        <TouchableOpacity activeOpacity={0.8} style={{ marginTop: 12 }} onPress={handleLogin}>
                <LinearGradient
                  colors={["#8A63D2", "#E896C7"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.signInButton, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
                >
                    <FontAwesome name="sign-in" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.signInText}>Sign In</Text>
                </LinearGradient>
            </TouchableOpacity>


          {/* Other options */}
          <View style={styles.bottomLinks}>
            <Text style={styles.signupLink}>
              Don't have an account?{' '}
              <Text style={styles.signupHighlight} onPress={() => router.push('../signup')}>
                <FontAwesome name="user-plus" size={12} color="#E896C7" /> Sign Up
              </Text>
            </Text>

            <Text style={styles.or}>OR</Text>

            <TouchableOpacity style={styles.googleButton}>
              <FontAwesome name="google" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Footer />
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
    paddingBottom: 20,
    backgroundColor: '#121212',
  },
  bannerImage: {
    width: width,
    height: 70,
  },
  container: {
    paddingHorizontal: width * 0.05,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: '#E896C7',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 25,
  },
  subHeading: {
    fontSize: 15,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    marginBottom: 14,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    color: '#fff',
    fontSize: 15,
  },
  icon: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    color: '#bbb',
    marginLeft: 5,
  },
  forgotPassword: {
    color: '#bbb',
    fontSize: 12,
  },
  signInButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomLinks: {
    marginTop: 22,
    alignItems: 'center',
  },
  signupLink: {
    color: '#bbb',
    fontSize: 13,
  },
  signupHighlight: {
    color: '#E896C7',
    fontWeight: '600',
  },
  or: {
    marginVertical: 14,
    color: '#bbb',
    fontWeight: '600',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  googleText: {
    color: '#fff',
    fontWeight: '600',
  },
});
