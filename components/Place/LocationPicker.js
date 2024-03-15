import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Alert, Image, Text } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getAddress, getMapPreview } from "../../util/location";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function LocationPicker({ onPickLocation }) {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
        onPickLocation({
          ...pickedLocation,
          address
        });
      }
    }
    handleLocation();
  }, [pickedLocation, onPickLocation])

  const verifyPermissions = async () => {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } else if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant permissions to use this app.'
      )
      return false
    } else if (locationPermissionInformation.status === PermissionStatus.GRANTED) {
      return true;
    }
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    });
  }

  const pickOnMapHandler = () => {
    navigation.navigate('Map', pickedLocation && {
      pickedLat: pickedLocation.lat,
      pickedLng: pickedLocation.lng
    });
  }

  const mapPickedLocation = useCallback(
    route.params && {
      lat: route.params.pickedLat,
      lng: route.params.pickedLng,
    },
    [route.params]
  );

  useEffect(() => {
    mapPickedLocation && setPickedLocation(mapPickedLocation);
  }, [mapPickedLocation]);

  let locationPreview = <Text style={styles.fallbackText}>No location picked yet.</Text>

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)
        }}
      />
    )
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlinedButton
          onPress={getLocationHandler}
          icon="location"
        >
          Locate User
        </OutlinedButton>
        <OutlinedButton
          onPress={pickOnMapHandler}
          icon="map"
        >
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fallbackText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapPreview: {
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
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
})