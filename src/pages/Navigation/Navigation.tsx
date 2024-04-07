import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import './navigation.css'
import { LocationType } from '../Home/Home'

interface ChildProps {
	riskmap: LocationType[] | undefined
	locationStatus: String
}
mapboxgl.accessToken =
	'pk.eyJ1IjoidGhla2Vuc2hpcnl1IiwiYSI6ImNsdW53dnRzYjEyeDgyamxuYnRnZXRyYjQifQ.DWhRGI-MQ6TZmskULKyzmA'

const Navigation: React.FC<ChildProps> = ({ riskmap, locationStatus }) => {
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
			controls: {
				profileSwitcher: false,
			},
			exclude: 'point(103.929444 1.313870)',
		})

		map.current.addControl(directions, 'top-left')
	})

	useEffect(() => {
		console.log(riskmap)
		if (locationStatus == 'LOADED') {
			map.current.addSource('trees', {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: riskmap.map((coord) => ({
						type: 'Feature',
						properties: { dbh: 1 },
						geometry: {
							type: 'Point',
							coordinates: [coord.longitude, coord.latitude],
						},
					})),
				},
			})
			map.current.addLayer(
				{
					id: 'trees-heat',
					type: 'heatmap',
					source: 'trees',
					maxzoom: 15,
					paint: {
						// increase weight as diameter breast height increases
						'heatmap-weight': {
							property: 'dbh',
							type: 'exponential',
							stops: [
								[1, 0],
								[62, 1],
							],
						},
						// increase intensity as zoom level increases
						'heatmap-intensity': {
							stops: [
								[11, 1],
								[15, 3],
							],
						},
						// use sequential color palette to use exponentially as the weight increases
						'heatmap-color': [
							'interpolate',
							['linear'],
							['heatmap-density'],
							0,
							'rgba(236,222,239,0)',
							0.2,
							'rgb(208,209,230)',
							0.4,
							'rgb(166,189,219)',
							0.6,
							'rgb(103,169,207)',
							0.8,
							'rgb(255,0,0)',
						],
						// increase radius as zoom increases
						'heatmap-radius': {
							stops: [
								[11, 15],
								[15, 20],
							],
						},
						// decrease opacity to transition into the circle layer
						'heatmap-opacity': {
							default: 1,
							stops: [
								[14, 1],
								[15, 0],
							],
						},
					},
				},
				'waterway-label',
			)

			map.current.addLayer(
				{
					id: 'trees-point',
					type: 'circle',
					source: 'trees',
					minzoom: 14,
					paint: {
						// increase the radius of the circle as the zoom level and dbh value increases
						'circle-radius': {
							property: 'dbh',
							type: 'exponential',
							stops: [
								[{ zoom: 15, value: 1 }, 5],
								[{ zoom: 15, value: 62 }, 10],
								[{ zoom: 22, value: 1 }, 20],
								[{ zoom: 22, value: 62 }, 50],
							],
						},
						'circle-color': {
							property: 'dbh',
							type: 'exponential',
							stops: [
								[0, 'rgba(236,222,239,0)'],
								[10, 'rgb(236,222,239)'],
								[20, 'rgb(208,209,230)'],
								[30, 'rgb(166,189,219)'],
								[40, 'rgb(103,169,207)'],
								[50, 'rgb(28,144,153)'],
								[60, 'rgb(1,108,89)'],
							],
						},
						'circle-stroke-color': 'white',
						'circle-stroke-width': 1,
						'circle-opacity': {
							stops: [
								[14, 0],
								[15, 1],
							],
						},
					},
				},
				'waterway-label',
			)
		}
	}, [locationStatus])

	return (
		<div className="map-container">
			<div ref={mapContainer} className="map" />
		</div>
	)
}

export default Navigation
