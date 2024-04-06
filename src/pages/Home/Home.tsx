import { FormEvent, useState } from 'react'
import { Flex, Text, Button, FormControl, Input } from '@chakra-ui/react'
import {
	AttachmentIcon,
	EditIcon,
	DownloadIcon,
	Search2Icon,
} from '@chakra-ui/icons'

const Home: React.FC = () => {
	const [riskMap, setRiskMap] = useState(false)
	const [mapsURL, setMapsURL] = useState('')
	const [validURL, setValidURL] = useState(false)

	const submitURL = (event: FormEvent): void => {
		event.preventDefault
		validateURL()
	}

	const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMapsURL(e.target.value)
	}

	const validateURL = () => {
		// Hardcode working embed link
		setMapsURL(
			'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7977.544129326235!2d103.9281638!3d1.3121681!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1908c215a713%3A0x64e6be75c97709da!2sDowntown%20Core!5e0!3m2!1sen!2ssg!4v1712411085226!5m2!1sen!2ssg',
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
				bgColor="#9786FF"
				padding="30px 12px"
				justifyContent="space-between"
			>
				{/* Logo */}
				<Text fontSize="2xl" fontWeight="bold" alignSelf="center">
					QuickSave
				</Text>
				{/* Location List */}
				<Flex
					marginTop="40px"
					flexDir="column"
					height="100%"
					gap="10px"
				>
					<Text fontSize="xl" fontWeight="semibold">
						Key Areas
					</Text>
					<Flex
						height="60%"
						flexDir="column"
						bgColor="white"
						borderRadius="12px"
						padding="10px"
						gap="5px"
					>
						{/* Data Rows */}
						<Flex
							flexDir="row"
							borderRadius="8px"
							padding="6px 12px"
							bgColor="red"
							justifyContent="space-between"
						>
							<Text>Lagoon Hawker Center</Text>
							<Text>92</Text>
						</Flex>
						<Flex
							flexDir="row"
							borderRadius="8px"
							padding="6px 12px"
							bgColor="orange"
							justifyContent="space-between"
						>
							<Text>HDB Block 10</Text>
							<Text>64</Text>
						</Flex>
					</Flex>
				</Flex>
				{/* Risk Map Toggle */}
				<Button
					height="52px"
					width="100%"
					bgColor={riskMap ? '#454545' : 'white'}
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
						width="650px"
						borderRadius="30px"
						padding="0px 8px 0px 18px"
						alignItems="center"
						boxShadow="md"
					>
						<FormControl onSubmit={submitURL}>
							<Input
								placeholder="Google Maps URL:"
								fontSize="xl"
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
					<Flex flexDir="row" gap="20px" marginRight="30px">
						<Flex flexDir="column" alignItems="center">
							<Button
								bgColor="white"
								border="2px solid #034AFF"
								borderRadius="30px"
								height="50px"
								width="50px"
								padding="10px"
								boxShadow="md"
							>
								<EditIcon />
							</Button>
							<Text fontSize="md">DRAW</Text>
						</Flex>
						<Flex flexDir="column" alignItems="center">
							<Button
								bgColor="white"
								border="2px solid #034AFF"
								borderRadius="30px"
								height="50px"
								width="50px"
								padding="10px"
								boxShadow="md"
							>
								<AttachmentIcon />
							</Button>
							<Text fontSize="md">IMPORT</Text>
						</Flex>
						<Flex flexDir="column" alignItems="center">
							<Button
								bgColor="white"
								border="2px solid #034AFF"
								borderRadius="30px"
								height="50px"
								width="50px"
								padding="10px"
								boxShadow="md"
							>
								<DownloadIcon />
							</Button>
							<Text fontSize="md">EXPORT</Text>
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
				>
					{validURL ? (
						<Flex>
							<iframe
								src={mapsURL}
								width="600"
								height="450"
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							></iframe>
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
