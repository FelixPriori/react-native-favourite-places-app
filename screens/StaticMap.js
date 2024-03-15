import { StyleSheet } from "react-native"
import MapView, { Marker } from "react-native-maps"

export default function StaticMap({ route }) {
  const place = route.params && {
    lat: route.params.lat,
    lng: route.params.lng,
    title: route.params.title
  };

  if (!place) {
    return;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: place.lat,
        longitude: place.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        title={place.title}
        coordinate={{
          latitude: place.lat,
          longitude: place.lng,
        }}
      />
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
})