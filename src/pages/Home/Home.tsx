import { useState } from 'react'
import reactLogo from './react.svg'
import './Home.css'
import { Flex, Text, Image, Button } from '@chakra-ui/react'

const Home: React.FC = () => {
	const [count, setCount] = useState(0)

	return (
		<Flex
			height="100vh"
			flexDir="column"
			alignItems="center"
			paddingTop="40px"
		>
			<Flex flexDir="row">
				<Image
					src={reactLogo}
					boxSize="160px"
					className="logo"
					id="react-logo"
				/>
			</Flex>
			<Text fontSize="xl" margin="10px 0 20px 0">
				Test vite hot reloading feature: {count}
			</Text>
			<Button onClick={() => setCount((count) => count + 1)}>
				Click Me
			</Button>
		</Flex>
	)
}

export default Home
