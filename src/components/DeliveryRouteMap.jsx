import { useEffect } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, Polyline, TileLayer, useMap } from 'react-leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { buildGoogleMapsDirectionsUrl } from '../utils/location'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const FitBounds = ({ points }) => {
  const map = useMap()

  useEffect(() => {
    if (points.length > 1) {
      map.fitBounds(points, { padding: [40, 40] })
    } else if (points.length === 1) {
      map.setView(points[0], 14)
    }
  }, [map, points])

  return null
}

const DeliveryRouteMap = ({ pickupLocation, deliveryLocation }) => {
  const pickupPoint = pickupLocation?.coordinates
    ? [pickupLocation.coordinates.lat, pickupLocation.coordinates.lng]
    : null
  const deliveryPoint = deliveryLocation?.coordinates
    ? [deliveryLocation.coordinates.lat, deliveryLocation.coordinates.lng]
    : null

  const points = [pickupPoint, deliveryPoint].filter(Boolean)

  if (!pickupPoint || !deliveryPoint) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        Route map is unavailable because pickup or delivery coordinates are missing.
      </div>
    )
  }

  const googleMapsUrl = buildGoogleMapsDirectionsUrl({
    originCoordinates: pickupLocation.coordinates,
    destinationCoordinates: deliveryLocation.coordinates,
    originAddress: pickupLocation.address,
    destinationAddress: deliveryLocation.address,
  })

  return (
    <div className="mt-5 rounded-[2rem] border border-slate-200 bg-white p-4">
      <div className="overflow-hidden rounded-[1.5rem]">
        <MapContainer
          center={pickupPoint}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '320px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds points={points} />
          <Marker position={pickupPoint}>
            <Popup>Restaurant: {pickupLocation.address}</Popup>
          </Marker>
          <Marker position={deliveryPoint}>
            <Popup>Customer: {deliveryLocation.address}</Popup>
          </Marker>
          <Polyline positions={[pickupPoint, deliveryPoint]} pathOptions={{ color: '#f97316', weight: 4 }} />
        </MapContainer>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-slate-600">
          <p>Pickup: {pickupLocation.address}</p>
          <p>Drop: {deliveryLocation.address}</p>
        </div>

        <button
          type="button"
          onClick={() => window.open(googleMapsUrl, '_blank', 'noopener,noreferrer')}
          className="rounded-3xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Show Route
        </button>
      </div>
    </div>
  )
}

export default DeliveryRouteMap
