import { useEffect, useState } from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";

export default function PlaceDetails({ route, navigation }) {
  const [place, setPlace] = useState()
  const selectedPlaceId = route.params.placeId

  useEffect(() => {
    const loadPlaceData = async () => {
      if (selectedPlaceId) {
        const placeDetails = await fetchPlaceDetails(selectedPlaceId)
        navigation.setOptions({
          title: placeDetails.title
        })
        setPlace(placeDetails)
      }
    }
    loadPlaceData()
  }, [selectedPlaceId])

  const showOnMapHandler = () => {
    navigation.navigate('StaticMap', {
      title: place.title,
      lng: place.location.lng,
      lat: place.location.lat,
    })
  }

  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.address}>Loading place data...</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlinedButton
          onPress={showOnMapHandler}
          icon="map"
        >
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: "center"
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  }
})