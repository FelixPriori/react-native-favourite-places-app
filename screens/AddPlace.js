import PlaceForm from "../components/Place/PlaceForm";
import { insertPlace } from "../util/database";

export default function AddPlace({ navigation }) {
  const createPlaceHandler = async (place) => {
    await insertPlace(place);
    navigation.navigate('AllPlaces');
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />
}