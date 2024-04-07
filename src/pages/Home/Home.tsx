import { FormEvent, useState } from 'react'
import {
	Flex,
	Text,
	Button,
	FormControl,
	Image,
	Input,
	Spinner,
} from '@chakra-ui/react'
import { RepeatIcon, Search2Icon } from '@chakra-ui/icons'
import Navigation from '../Navigation/Navigation'
import QuickSaveLogo from '../Home/QuickSaveLogo.png'

export type LocationType = {
	latitude: Float32Array
	longitude: Float32Array
	name: string
	risk: number
	total_reviews: number
}

const Home: React.FC = () => {
	const [riskMap, setRiskMap] = useState(false)
	const [mapsURL, setMapsURL] = useState('')
	const [validURL, setValidURL] = useState(false)
	const [locationJSON, setLocationJSON] = useState<LocationType[]>()
	const [locationStatus, setLocationStatus] = useState('NONE') // NONE, LOADING, LOADED

	const [long, setLong] = useState(103.9281638)
	const [lat, setLat] = useState(1.3121681)
	const [zoom, setZoom] = useState(15)

	const getRGB = (risk: number): string => {
		// start from 0,250,0 (green) -> 250,250,0 (yellow) -> 250,0,0 (red)
		risk *= 5
		if (risk > 250) {
			return `rgb(250, ${500 - risk}, 0)`
		} else {
			return `rgb(${risk},250,0)`
		}
	}

	const submitURL = (event: FormEvent): void => {
		event.preventDefault()
		validateURL()
	}

	const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMapsURL(e.target.value)
	}

	const validateURL = async () => {
		setLocationStatus('LOADING')
		const temp = mapsURL.substring(29).split(',')

		const a = Number(temp[0]),
			b = Number(temp[1])
		setLat(a)
		setLong(b)

		fetch(`http://127.0.0.1:5000/getLocationsJSON?lat=${a}&long=${b}`).then(
			async (response) => {
				const data = await response.json()
				// check for error response
				if (response.ok) {
					setLocationJSON(data)
					setLocationStatus('LOADED')
				}
			},
		)

		setValidURL(true)
	}

	return (
		<Flex
			height="100vh"
			flexDir="row"
			alignItems="center"
			bgColor="#F4F4F4"
		>
			{/* Left bar */}
			<Flex
				flexDir="column"
				height="100%"
				width="25vw"
				bgColor="#FFF"
				padding="30px 12px"
				justifyContent="space-between"
			>
				{/* Logo */}
				<Image src={QuickSaveLogo} width="70%" alignSelf="center" />
				{/* Location List */}
				<Flex
					marginTop="40px"
					flexDir="column"
					height="100%"
					gap="10px"
					overflow="hidden"
				>
					<Text fontSize="xl" fontWeight="semibold">
						Key Areas
					</Text>
					<Flex
						height="80%"
						flexDir="column"
						bgColor="#EEE"
						borderRadius="12px"
						padding="10px"
						gap="5px"
						overflow="scroll"
						overflowX="hidden"
						css={{
							'&::-webkit-scrollbar': { display: 'none' },
						}}
					>
						{/* Data Rows */}
						{locationStatus == 'LOADING' && (
							<Spinner
								alignSelf="center"
								marginTop="100px"
								thickness="6px"
								speed="0.7s"
								emptyColor="gray.200"
								color="blue.500"
								size="xl"
							/>
						)}
						{locationStatus == 'LOADED' &&
							// @ts-expect-error will not rended unless location loaded
							locationJSON.map((item, index) => (
								<Flex
									key={index}
									flexDir="row"
									borderRadius="8px"
									padding="6px 12px"
									bgColor={getRGB(item.risk)}
									justifyContent="space-between"
								>
									<Text>{item.name}</Text>
									<Text>{item.risk}</Text>
								</Flex>
							))}
					</Flex>
				</Flex>
				{/* Risk Map Toggle */}
				<Button
					height="52px"
					width="100%"
					bgColor={riskMap ? '#454545' : '#58fac7'}
					color={riskMap ? 'white' : 'black'}
					_hover={
						riskMap
							? { bgColor: 'darkgray' }
							: { bgColor: 'lightgray' }
					}
					onClick={() => setRiskMap((riskMap) => !riskMap)}
				>
					<Text display={riskMap ? 'initial' : 'none'}>
						Disable Risk Map
					</Text>
					<Text display={riskMap ? 'none' : 'initial'}>
						Enable Risk Map
					</Text>
				</Button>
			</Flex>
			{/* Main Panel */}
			<Flex flexDir="column" width="100%" height="100%" padding="16px">
				{/* Utilities Section */}
				<Flex
					flexDir="row"
					alignItems="center"
					justifyContent="space-between"
					paddingBottom="12px"
				>
					<Flex
						flexDir="row"
						bgColor="#FFF"
						height="65%"
						width="680px"
						borderRadius="30px"
						padding="0px 8px 0px 18px"
						alignItems="center"
						boxShadow="md"
					>
						<FormControl onSubmit={submitURL}>
							<Input
								placeholder="Google Maps URL:"
								fontSize="lg"
								fontWeight="light"
								variant="unstyled"
								onChange={inputChange}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										validateURL()
									}
								}}
							/>
						</FormControl>
						<Button
							width="50px"
							borderRadius="30px"
							onClick={() => validateURL()}
						>
							<Search2Icon />
						</Button>
					</Flex>
					{/* Functional Buttons */}
					<Flex flexDir="row" gap="20px" marginRight="16px">
						<Flex flexDir="column" alignItems="center">
							<Button
								bgColor="white"
								border="2px solid #034AFF"
								borderRadius="30px"
								height="50px"
								width="50px"
								padding="10px"
								boxShadow="md"
								onClick={() => window.location.reload()}
							>
								<RepeatIcon />
							</Button>
							<Text fontSize="md">RESET</Text>
						</Flex>
					</Flex>
				</Flex>
				{/* Google Maps */}
				<Flex
					height="100%"
					width="100%"
					bgColor="white"
					borderRadius="12px"
					boxShadow="md"
					alignItems="center"
					justifyContent="center"
					overflow="hidden"
				>
					{validURL ? (
						<Flex height="100%" width="100%">
							<Navigation
								riskmap={locationJSON}
								locationStatus={locationStatus}
								enabled={riskMap}
								lng={long}
								lat={lat}
								zoom={zoom}
							/>
						</Flex>
					) : (
						<Text fontWeight="semibold" fontSize="3xl">
							PLEASE ENTER A GOOGLE MAPS URL
						</Text>
					)}
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Home
