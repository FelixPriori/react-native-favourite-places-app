export const getMapPreview = (lat, lng) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`

export const getAddress = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch address.');
  }
  const data = await response.json();
  return data.results[0].formatted_address;
}