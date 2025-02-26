import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const FACILITY_OPTIONS = [
  { type: 'Hospital', icon: require("../assets/hospital.png") },
  { type: 'Fire Station', icon: require("../assets/metro.png") },
  { type: 'Dam Station', icon: require("../assets/police.png") },
];

const getIcon = (type) => {
  const icons = {
    "Hospital": require("../assets/hospital.png"),
    "Fire Station": require("../assets/metro.png"),
    "Dam Station": require("../assets/police.png"),
  };
  return icons[type];
};

const Index2 = () => {
  const [wards, setWards] = useState([]);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [facilities, setFacilities] = useState([]);

  const fetchWards = async () => {
    try {
      const response = await axios.get('https://minor-project-backend-bom7.onrender.com/api/wards');
      setWards(response.data);
    } catch (error) {
      console.error('❌ Error fetching wards:', error);
      Alert.alert('Error', 'Failed to fetch wards');
    }
  };

  const toggleFacility = (facilityType) => {
    setFacilities((prev) => {
      const exists = prev.find(f => f.type === facilityType);
      return exists ? prev.filter(f => f.type !== facilityType) : [...prev, { type: facilityType, name: '', link: '' }];
    });
  };

  const updateFacilityField = (type, field, value) => {
    setFacilities(prev => prev.map(f => f.type === type ? { ...f, [field]: value } : f));
  };

  const createWard = async () => {
    if (!name || facilities.length === 0) {
      Alert.alert('Validation Error', 'Ward name and at least one facility are required');
      return;
    }
    try {
      const payload = { name, link, facilities };
      const response = await axios.post('https://minor-project-backend-bom7.onrender.com/api/wards', payload);
      setWards([...wards, response.data]);
      setName('');
      setLink('');
      setFacilities([]);
      Alert.alert('Success', 'Ward created successfully');
    } catch (error) {
      console.error('❌ Error creating ward:', error);
      Alert.alert('Error', 'Failed to create ward');
    }
  };

  const deleteWard = async (id) => {
    try {
      await axios.delete(`https://minor-project-backend-bom7.onrender.com/api/wards/${id}`);
      setWards(wards.filter(ward => ward._id !== id));
      Alert.alert('Deleted', 'Ward deleted successfully');
    } catch (error) {
      console.error('❌ Error deleting ward:', error);
      Alert.alert('Error', 'Failed to delete ward');
    }
  };

  useEffect(() => {
    fetchWards();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wards Management</Text>

      <TextInput style={styles.input} placeholder="Ward Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Ward Link (Optional)" value={link} onChangeText={setLink} />

      <Text style={styles.subtitle}>Select Facilities:</Text>
      {FACILITY_OPTIONS.map((facility) => (
        <View key={facility.type} style={styles.facilityItem}>
          <TouchableOpacity onPress={() => toggleFacility(facility.type)}>
            <Image source={facility.icon} style={styles.icon} />
          </TouchableOpacity>
          <Text>{facility.type}</Text>
          {facilities.some(f => f.type === facility.type) && (
            <>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${facility.type} Name`}
                onChangeText={(text) => updateFacilityField(facility.type, 'name', text)}
              />
              <TextInput
                style={styles.input}
                placeholder={`Enter ${facility.type} Link`}
                onChangeText={(text) => updateFacilityField(facility.type, 'link', text)}
              />
            </>
          )}
        </View>
      ))}

      <Button title="Create Ward" onPress={createWard} />

      <FlatList
        data={wards}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.wardItem}>
            <View>
              <Text style={styles.wardName}>{item.name}</Text>
              {item.link ? <Text style={styles.wardLink}>🔗 {item.link}</Text> : null}
              
              {item.facilities && item.facilities.length > 0 ? (
                <View style={styles.facilitiesContainer}>
                  <Text style={styles.facilitiesTitle}>Facilities:</Text>
                  {item.facilities.map((facility, index) => (
                    <View key={index} style={styles.facilityDetails}>
                      <Image source={getIcon(facility.type)} style={styles.icon} />
                      <View>
                        <Text style={styles.facilityName}>{facility.type}: {facility.name}</Text>
                        {facility.link ? (
                          <Text style={styles.facilityLink}>🔗 {facility.link}</Text>
                        ) : null}
                      </View>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
            <Button title="Delete" onPress={() => deleteWard(item._id)} color="red" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 5 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  facilityItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  icon: { width: 30, height: 30, marginRight: 10 },
  wardItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#f9f9f9', marginVertical: 5, borderRadius: 5 },
  wardName: { fontSize: 18 },
  facilitiesContainer: { marginTop: 5 },
  facilitiesTitle: { fontWeight: 'bold', marginBottom: 3 },
  facilityDetails: { flexDirection: 'row', alignItems: 'center', marginVertical: 3 },
  facilityName: { fontSize: 16 },
  facilityLink: { color: 'blue', textDecorationLine: 'underline' },
  wardLink: { color: 'blue', marginBottom: 5 },
});

export default Index2;
