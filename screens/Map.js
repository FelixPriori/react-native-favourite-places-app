import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import useLocation from '../hooks/useCurrentLocation';
import IconButton from '../components/UI/IconButton';

export default function Map({ navigation, route }) {
  const currentLocation = useLocation();
  const [region, setRegion] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const selectLocationHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked.',
        'You have to pick a location by tapping on the map first.'
      )
      return;
    }

    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng
    });
  }, [navigation, selectedLocation]);

  const mapPickedLocation = useCallback(
    route.params && {
      lat: route.params.pickedLat,
      lng: route.params.pickedLng,
    },
    [route.params]
  );

  useEffect(() => {
    mapPickedLocation && setRegion({
      latitude: mapPickedLocation.lat,
      longitude: mapPickedLocation.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    mapPickedLocation && setSelectedLocation({
      lat: mapPickedLocation.lat,
      lng: mapPickedLocation.lng,
    });
  }, [mapPickedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      )
    })
  }, [navigation, savePickedLocationHandler])

  useEffect(() => {
    if (currentLocation) {
      setRegion(() => ({
        latitude: currentLocation.lat,
        longitude: currentLocation.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }))
    }
  }, [currentLocation])

  return region && (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
          }}
        />
      )}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
})