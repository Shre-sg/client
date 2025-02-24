
// header.jsx
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Header = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Air Quality Index Monitoring</Text>
      <Text style={styles.subtitle}>Dept. of Information Science and Engineering</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/ward-management')}>
        <Text style={styles.buttonText}>Ward Management</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFF',
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
