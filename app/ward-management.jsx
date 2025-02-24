// ward-management.tsx
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Image, FlatList, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const facilities = [
  { type: 'Police Station', icon: require('@/assets/police.png') },
  { type: 'Hospital', icon: require('@/assets/hospital.png') },
  { type: 'Metro Station', icon: require('@/assets/metro.png') },
];

const WardManagement = () => {
  const [wards, setWards] = useState([]);
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentWard, setCurrentWard] = useState(null);
  const [facilityInputs, setFacilityInputs] = useState({});

  const handleAddWard = () => {
    if (!input.trim()) {
      Alert.alert('Error', 'Please enter a valid ward name');
      return;
    }
    const newWard = { name: input, facilities: [] };
    setCurrentWard(newWard);
    setFacilityInputs({});
    setModalVisible(true);
    setInput('');
  };

  const handleFacilityInputChange = (type, text) => {
    setFacilityInputs(prev => ({ ...prev, [type]: text }));
  };

  const handleSaveWard = () => {
    const facilitiesToAdd = facilities.map(facility => ({
      type: facility.type,
      name: facilityInputs[facility.type] || '',
      icon: facility.icon,
    }));

    const updatedWard = { ...currentWard, facilities: facilitiesToAdd };
    setWards([...wards, updatedWard]);
    setModalVisible(false);
  };

  const renderWard = ({ item }) => (
    <View style={styles.wardTile}>
      <Text style={styles.wardTitle}>{item.name}</Text>
      <View style={styles.facilityContainer}>
        {item.facilities.map((facility, idx) => (
          <View key={idx} style={styles.facilityTile}>
            <Image source={facility.icon} style={styles.icon} />
            <Text style={styles.facilityName}>{facility.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏙️ Ward Management</Text>

      <TextInput
        placeholder="Enter Ward Name"
        style={styles.input}
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddWard}>
        <Text style={styles.addButtonText}>➕ Add Ward</Text>
      </TouchableOpacity>

      <FlatList
        data={wards}
        renderItem={renderWard}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.wardList}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>🏗️ Add Facilities to {currentWard?.name}</Text>
          {facilities.map((facility, idx) => (
            <TextInput
              key={idx}
              placeholder={`Enter ${facility.type} Name`}
              style={styles.input}
              value={facilityInputs[facility.type] || ''}
              onChangeText={(text) => handleFacilityInputChange(facility.type, text)}
            />
          ))}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveWard}>
            <Text style={styles.saveButtonText}>💾 Save Ward</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>❌ Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default WardManagement;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#EAF6F6',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2E8B57',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  wardList: {
    marginTop: 20,
  },
  wardTile: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    margin: 8,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  facilityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  facilityTile: {
    alignItems: 'center',
    margin: 8,
  },
  facilityName: {
    fontSize: 14,
    marginTop: 6,
    color: '#555',
  },
  icon: {
    width: 50,
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E8B57',
  },
  saveButton: {
    backgroundColor: '#008CBA',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
