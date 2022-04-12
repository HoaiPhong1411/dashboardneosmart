import './App.css';
import { ClientRoutes } from "./Router/Router"
import ClientLayout from "./Layout/ClientLayout"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
function App() {
  const renderLayout =  (routes) => {
    return (
      routes?.map((route) => {
        const {path, element, index} = route;
        return (
          <Route key={index} element={element} path={path} index={index}/>
        )
      })
    )
  }
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<ClientLayout/>}>
          {renderLayout(ClientRoutes)}
        </Route>
        <Route path='*' element={<img src='https://www.totolink.vn/public/uploads/img_post/truy-tim-nguyen-nhan-va-cach-sua-chua-loi-tra-cuu-404-not-found-1.jpg' className='dt:w-[100vw] dt:h-[100vh]' />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
