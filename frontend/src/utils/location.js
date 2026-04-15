export const getCurrentCoordinates = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported in this browser'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          lat: Number(coords.latitude.toFixed(6)),
          lng: Number(coords.longitude.toFixed(6)),
        })
      },
      () => reject(new Error('Unable to capture current location')),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  })

export const buildGoogleMapsDirectionsUrl = ({
  originCoordinates,
  destinationCoordinates,
  originAddress,
  destinationAddress,
}) => {
  const origin =
    originCoordinates?.lat != null && originCoordinates?.lng != null
      ? `${originCoordinates.lat},${originCoordinates.lng}`
      : encodeURIComponent(originAddress || '')

  const destination =
    destinationCoordinates?.lat != null && destinationCoordinates?.lng != null
      ? `${destinationCoordinates.lat},${destinationCoordinates.lng}`
      : encodeURIComponent(destinationAddress || '')

  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`
}
