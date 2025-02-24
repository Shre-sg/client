import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const FACILITY_OPTIONS = [
  { type: 'Police Station', icon: 'path/to/icons/police.png' },
  { type: 'Hospital', icon: 'path/to/icons/hospital.png' },
  { type: 'Metro Station', icon: 'path/to/icons/metro.png' },
];

const Index2 = () => {
  const [wards, setWards] = useState([]);
  const [name, setName] = useState('');
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
    setFacilities((prevFacilities) => {
      const exists = prevFacilities.find(f => f.type === facilityType);
      if (exists) {
        return prevFacilities.filter(f => f.type !== facilityType);
      } else {
        const iconPath = `path/to/icons/${facilityType.toLowerCase().replace(/\s/g, '_')}.png`;
        return [...prevFacilities, { type: facilityType, name: '', icon: iconPath }];
      }
    });
  };

  const updateFacilityName = (type, newName) => {
    setFacilities((prevFacilities) =>
      prevFacilities.map(f => f.type === type ? { ...f, name: newName } : f)
    );
  };

  const createWard = async () => {
    if (!name || facilities.length === 0) {
      Alert.alert('Validation Error', 'Ward name and at least one facility are required');
      return;
    }

    const payload = { name, facilities };
    console.log('📤 Sending payload:', payload);

    try {
      const response = await axios.post('https://minor-project-backend-bom7.onrender.com/api/wards', payload);
      setWards([...wards, response.data]);
      setName('');
      setFacilities([]);
      Alert.alert('Success', 'Ward created successfully');
    } catch (error) {
      console.error('❌ Error creating ward:', error);
      if (error.response) {
        console.error('🚫 Server response:', error.response.data);
        Alert.alert('Error', `Failed to create ward: ${error.response.data.message || 'Unknown error'}`);
      } else {
        Alert.alert('Error', 'Failed to create ward');
      }
    }
  };

  const deleteWard = async (id) => {
    try {
      await axios.delete(`https://minor-project-backend-bom7.onrender.com/api/wards/${id}`);
      setWards(wards.filter((ward) => ward._id !== id));
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

      <TextInput
        style={styles.input}
        placeholder="Ward Name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.subtitle}>Select Facilities:</Text>
      {FACILITY_OPTIONS.map((facility) => {
        const selected = facilities.find(f => f.type === facility.type);
        return (
          <View key={facility.type} style={styles.facilityItem}>
            <TouchableOpacity onPress={() => toggleFacility(facility.type)}>
              <Image source={{ uri: facility.icon }} style={styles.icon} />
            </TouchableOpacity>
            <Text>{facility.type}</Text>
            {selected && (
              <TextInput
                style={styles.input}
                placeholder={`Enter ${facility.type} Name`}
                value={selected.name}
                onChangeText={(text) => updateFacilityName(facility.type, text)}
              />
            )}
          </View>
        );
      })}

      <Button title="Create Ward" onPress={createWard} />

      <FlatList
        data={wards}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.wardItem}>
            <Text style={styles.wardText}>{item.name}</Text>
            {item.facilities.map((facility) => (
              <View key={facility._id} style={styles.facilityDisplay}>
                <Image source={{ uri: facility.icon }} style={styles.icon} />
                <Text>{facility.name} ({facility.type})</Text>
              </View>
            ))}
            <Button title="Delete" color="red" onPress={() => deleteWard(item._id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  wardItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  wardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  facilityDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Index2;
