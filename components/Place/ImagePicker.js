import { useState } from "react";
import { StyleSheet, View, Button, Alert, Image, Text } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

const cameraConfig = {
  allowEditing: true,
  aspect: [16, 9],
  quality: 0.5,
};

export default function ImagePicker({ onTakeImage }) {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState();

  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } else if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant permissions to use this app.'
      )
      return false
    } else if (cameraPermissionInformation.status === PermissionStatus.GRANTED) {
      return true;
    }
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const [image] = (await launchCameraAsync(cameraConfig)).assets;
    setImage(image.uri)
    onTakeImage(image.uri)
  }

  let imagePreview = <Text style={styles.fallbackText}>No image taken yet.</Text>

  if (image) {
    imagePreview = (
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
    )
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {imagePreview}
      </View>
      <OutlinedButton
        icon="camera"
        onPress={takeImageHandler}
      >
        Take image
      </OutlinedButton>
    </View>
  )
}

const styles = StyleSheet.create({
  fallbackText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  }
})