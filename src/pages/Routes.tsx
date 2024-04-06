import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Navigation from './Navigation/Navigation'

const App: React.FC = () => (
	<Router>
		<Routes>
			{/* Public Pages */}
			<Route path="/test" element={<Navigation />} />
			<Route path="/*" element={<Home />} />
		</Routes>
	</Router>
)

export default App
