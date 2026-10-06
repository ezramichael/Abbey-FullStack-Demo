import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// For an Android emulator use http://10.0.2.2:4000/api.
// For a physical phone, replace this with your computer's LAN IP, e.g. http://192.168.1.20:4000/api.
const API = 'http://10.0.2.2:4000/api';

export default function App() {
  const [email, setEmail] = useState('abbeyuser1@example.com');
  const [password, setPassword] = useState('Password123!');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  async function login() {
    try {
      const response = await fetch(`${API}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password}) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      // This intentionally keeps the mobile demo simple. For a real mobile app, use a secure token store.
      setUser(data.user); setMessage('Logged in successfully.');
    } catch (e) { Alert.alert('Login failed', e.message); }
  }

  return <SafeAreaView style={styles.safe}><StatusBar style="dark"/><View style={styles.container}>
    <Text style={styles.eyebrow}>ABBEY CHALLENGE</Text><Text style={styles.title}>Mobile client</Text>
    {!user ? <View><Text style={styles.muted}>The same backend also serves this React Native client.</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" placeholder="Email"/>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="Password"/>
      <Button title="Sign in" onPress={login}/></View>
      : <View><Text style={styles.welcome}>Hello, {user.displayName}</Text><Text style={styles.muted}>{user.email}</Text><Text style={styles.success}>{message}</Text><Button title="Demo logout" onPress={()=>{setUser(null);setMessage('')}}/></View>}
  </View></SafeAreaView>;
}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:'#f5f7f9'},container:{flex:1,padding:28,justifyContent:'center'},eyebrow:{fontSize:11,fontWeight:'800',letterSpacing:2,color:'#697586'},title:{fontSize:34,fontWeight:'800',marginTop:6,marginBottom:12},welcome:{fontSize:26,fontWeight:'800',marginBottom:6},muted:{color:'#697586',lineHeight:22,marginBottom:22},input:{backgroundColor:'#fff',borderWidth:1,borderColor:'#d0d5dd',borderRadius:10,padding:13,marginBottom:12},success:{color:'#176b3a',marginBottom:20}});
