import React from 'react';
import { StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default ({ onPick, isFromGallery, style={} }) => {
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (!permissionResult.granted) {
      return Alert.alert('Error!', "Permission to access camera roll is required!");
    }

    let pickerResult = await ImagePicker[isFromGallery ? 'launchImageLibraryAsync' : 'launchCameraAsync']();
    onPick(pickerResult.uri)
  }

  return (
    <TouchableOpacity onPress={openImagePickerAsync} style={{ ...style, ...styles.button }}>
      <Text style={{ color: 'white' }}>{isFromGallery ? 'Gallery' : 'Camera'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 100,
    width: 100,
    backgroundColor: 'blue',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
})