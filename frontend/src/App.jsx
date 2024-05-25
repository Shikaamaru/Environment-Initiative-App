import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Protected from './pages/Protected'
import Pagelayout from './layouts/Pagelayout'
import { ROUTE_PATHS } from './constants'
import AboutPageContainer from './pages/about/AboutPageContainer'
import PageNotFound from './pages/pagenotfound/PageNotFound'
import ForLoggedInUsers from './protectedRoutes/ForLoggedInUsers'
import LoginPageContainer from './pages/login/LoginContainer'
import SignupPageContainer from './pages/signup/SignupPageContainer'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Pagelayout />}> 
          {/* Unsecured Routes */}
          <Route index element={<Home />} />
          <Route path={ROUTE_PATHS.login} element={<LoginPageContainer />} />
          <Route path={ROUTE_PATHS.about} element={<AboutPageContainer />} />
          <Route path={ROUTE_PATHS.signup} element={<SignupPageContainer />} />
          <Route path={ROUTE_PATHS.pageNotFound} element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />

          {/* Secured Routes */}
          <Route element={<ForLoggedInUsers />}>
            <Route path="protected" element={<Protected />} />
          </Route>

        </Route>
      </Routes>
    </div>
  )
}

export default App