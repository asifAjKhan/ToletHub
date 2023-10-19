import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/home/Home.jsx';
import List from './pages/list/List.jsx'
import Single from "./pages/single/Single.jsx";
import PropertyForm from "./pages/addProperty/PropertyForm.jsx";

import {userInputs} from './FormSorce.js';
import FormPage from "./pages/FormPage/FormPage.jsx";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/register/Login.jsx";
import PropertyList from "./components/propertyList/PropertyList.jsx";
import PropertyListPage from "./pages/propertyListPage/PropertyListPage.jsx";
import SliderTabs from "./components/sliderTabs/SliderTabs.jsx";



function App() {
  return (
     <BrowserRouter>
        <Routes>
           <Route path="/" element = {<Home />} />
           <Route path="/propertys" element = {<List />} />
           <Route path="/single/:id" element = {<Single />} />
           <Route path="/propertys/img/:id" element = {<PropertyForm  />} />
           <Route path="/propertys/inter" element = {<FormPage />} />
           <Route path="/register" element = {<Register />} />
           <Route path="/login" element = {<Login />} />
           <Route path="/property-list/:division" element ={<PropertyListPage />} />
           <Route path="/property-list/:division/:district" element ={<PropertyListPage />} />
           <Route path="/property-list/:division/:district/:area" element ={<PropertyListPage />} />
           <Route path="/slider" element = {<SliderTabs />} />
           
        </Routes>
     </BrowserRouter>
  );
}

export default App;
