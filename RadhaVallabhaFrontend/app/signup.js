import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
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
import Footer from '../components/footer';
import Header from '../components/loginHeader';

const { width } = Dimensions.get('window');
const router = useRouter();



export default function SignUpScreen() {
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState(new Date());
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status,setStatus]=useState('Active');
  const [role,setRole]=useState('user')
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSignup = async () => {
   if (!email || !password || !confirmPassword || !phone || !dob) {
    alert("Please fill all required fields.");
    return;
  }

  // Password confirmation check
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Email validation for Gmail or Yahoo
  const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/;
  if (!emailPattern.test(email)) {
    alert("Email must be a Gmail or Yahoo address.");
    return;
  }

  // Phone number validation (10 digits only)
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone)) {
    alert("Phone number must be exactly 10 digits.");
    return;
  }

  // Date of Birth should not be in the future
  const enteredDOB = new Date(dob);
  const today = new Date();
  if (enteredDOB > today) {
    alert("Date of Birth cannot be in the future.");
    return;
  }

  const signupData = {
    name,
    phone,
    email,
    password,
    gender,
    status,
    role,
    dob: dob.toISOString().split('T')[0],
  };

  try {
    const res = await axios.post(`http://${HOST}:${PORT}/api/signup`, signupData);
    alert("Welcome to SHRI GAUR RADHAVALLABHA TEMPLE");
    router.push('./login/login'); // go to login after signup
  } catch (err) {
    console.error("Signup Error:", err.message);
    alert("Signup failed. Check network or server.");
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require('../assets/images/Singup.png')}
          style={styles.bannerImage}
          resizeMode="contain"
        />

        <View style={styles.container}>
          <Text style={styles.heading}>Hare Krishna!</Text>
          <Text style={styles.subHeading}>Sign up here!</Text>

          {/* Full Name */}
          <View style={styles.inputRow}>
            <FontAwesome name="user" size={18} color="#ccc" style={styles.icon} />
            <TextInput
              placeholder="Full Name"
              value={name}
              placeholderTextColor="#aaa"
              style={styles.input}
              onChangeText={setName}
            />
          </View>

          {/* Phone */}
          <View style={styles.inputRow}>
            <FontAwesome name="phone" size={18} color="#ccc" style={styles.icon} />
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="#aaa"
              style={styles.input}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* Email */}
          <View style={styles.inputRow}>
            <MaterialIcons name="email" size={18} color="#ccc" style={styles.icon} />
            <TextInput
              placeholder="Your Email"
              placeholderTextColor="#aaa"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Gender */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderRow}>
            {["Male", "Female"].map((item) => (
             <TouchableOpacity
              key={item}
              onPress={() => setGender(item)}
              style={styles.radioOption}
            >
              <View
                style={[
                  styles.radioCircle,
                  gender === item && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioText}>{item}</Text>
            </TouchableOpacity>

            ))}
          </View>

          {/* Date of Birth */}
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity
            onPress={() => setShowDobPicker(true)}
            style={styles.dateField}
          >
            <Text style={styles.dateText}>
              {dob.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDobPicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowDobPicker(false);
                if (selectedDate) setDob(selectedDate);
              }}
            />
          )}

          {/* Create Password */}
          <View style={styles.inputRow}>
            <FontAwesome name="lock" size={18} color="#ccc" style={styles.icon} />
            <TextInput
              placeholder="Create Password"
              placeholderTextColor="#aaa"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Entypo name="eye-with-line" size={18} color="#ccc" style={styles.iconRight} />
          </View>

          {/* Confirm Password */}
          <View style={styles.inputRow}>
            <MaterialIcons name="check-circle" size={18} color="#ccc" style={styles.icon} />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Entypo name="eye-with-line" size={18} color="#ccc" style={styles.iconRight} />
          </View>

          {/* Sign Up Button */}
       <TouchableOpacity activeOpacity={0.8} style={{ marginTop: 14 }} onPress={handleSignup}>
          <LinearGradient
            colors={["#7E57C2", "#E896C7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.signInButton, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
          >
            <FontAwesome name="sign-in" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.signInText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>

          {/* Other options */}
          <View style={styles.bottomLinks}>
         <Text style={styles.signupLink}>
                Already have an account?{' '}
                <Text
                    style={styles.signupHighlight}
                    onPress={() => router.push('./login/login')}
                >
                    <FontAwesome name="sign-in" size={12} color="#E896C7" /> Sign In
                </Text>
                </Text>

            <Text style={styles.or}>OR</Text>
            <TouchableOpacity style={styles.googleButton}>
              <FontAwesome name="google" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.googleText}>Sign up with Google</Text>
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
    textShadowColor: '#E896C7',   // soft pink glow color
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 25,           // how much it glows
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
  label: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 8,
    fontWeight: '600',
  },
  genderRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#bbb',
    marginRight: 5,
  },
  radioSelected: {
    backgroundColor: '#fff',
  },
  radioText: {
    color: '#ccc',
    fontSize: 14,
  },
  dateField: {
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
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
