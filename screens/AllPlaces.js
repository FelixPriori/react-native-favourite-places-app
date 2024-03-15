import { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"
import PlacesList from "../components/Place/PlacesList"
import { fetchPlaces } from "../util/database"

export default function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    const loadPlaces = async () => {
      if (isFocused) {
        const places = await fetchPlaces();
        setLoadedPlaces(places)
      }
    }
    loadPlaces();
  }, [isFocused])

  return (
    <PlacesList places={loadedPlaces} />
  )
}