import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import './navigation.css'

mapboxgl.accessToken =
	'pk.eyJ1IjoidGhla2Vuc2hpcnl1IiwiYSI6ImNsdW53dnRzYjEyeDgyamxuYnRnZXRyYjQifQ.DWhRGI-MQ6TZmskULKyzmA'

const Navigation: React.FC = () => {
	const mapContainer = useRef(null)
	const map = useRef(null)
	const [lng, setLng] = useState(103.9281638)
	const [lat, setLat] = useState(1.3121681)
	const [zoom, setZoom] = useState(15)
	useEffect(() => {
		if (map.current) return // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom,
		})

		const directions = new MapboxDirections({
			accessToken: mapboxgl.accessToken,
			unit: 'metric',
			profile: 'mapbox/driving',
		})
		map.current.addControl(directions, 'top-left')
	})

	return (
		<div className="map-container">
			<div ref={mapContainer} className="map" />
		</div>
	)
}

export default Navigation
