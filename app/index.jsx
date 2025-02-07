import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './header';

const SensorData = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAirQualityData = async () => {
    try {
      const response = await axios.get("https://minor-project-backend-bom7.onrender.com/api/data");
      const airQualityData = response.data;
      setSensorData(airQualityData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching air quality data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAirQualityData();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Air Quality Data</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.dataContainer}>
          {sensorData.length > 0 ? (
            sensorData.map((data, index) => (
              <View key={index} style={styles.dataCard}>
                <Text style={styles.label}>Value:</Text>
                <Text style={styles.value}>{data.airQuality}</Text>
                <Text style={styles.label}>Time:</Text>
                <Text style={styles.value}>
                  {new Date(data.timestamp).toLocaleString()}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No air quality data available.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default SensorData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"100%",
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBott: 16,
  },
  loader: {
    marginTop: 50,
  },
  dataContainer: {
    paddingBottom: 16,
  },
  dataCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  noDataText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
