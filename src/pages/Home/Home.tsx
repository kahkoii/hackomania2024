import { useState } from 'react'
import { Flex, Text, Button, background } from '@chakra-ui/react'
import { AttachmentIcon, EditIcon, DownloadIcon } from '@chakra-ui/icons'

const Home: React.FC = () => {
	const [riskMap, setRiskMap] = useState(false)

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
						width="500px"
						borderRadius="30px"
						padding="0px 18px"
						alignItems="center"
						boxShadow="md"
					>
						<Text fontSize="xl" fontWeight="semibold">
							Google Maps URL:
						</Text>
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
				></Flex>
			</Flex>
		</Flex>
	)
}

export default Home
