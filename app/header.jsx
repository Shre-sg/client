import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Air Quality Index Monitoring</Text>
      <Text style={styles.subtitle}>Dept. of Information Science and Engineering</Text>
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
});
