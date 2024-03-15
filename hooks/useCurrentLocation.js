import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

function useLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (granted) {
          const lastKnownPosition = await Location.getLastKnownPositionAsync();
          if (!lastKnownPosition) {
            return;
          }
          const { latitude, longitude } = lastKnownPosition.coords;
          setLocation({ lat: latitude, lng: longitude });
        } else {
          Alert.alert("No permission to view current location.");
          return;
        }
      } catch (error) {
        Alert.alert("Error while getting location: " + error.message);
      }
    };
    getLocation();
  }, []);

  return location;
}

export default useLocation;