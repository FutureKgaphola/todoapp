
import './App.css';
import {Route, createBrowserRouter,createRoutesFromElements, RouterProvider} from 'react-router-dom';
import ParentLayout from './Layouts/ParentLayout';
import Comp404 from './components/Comp404';
import Login from './components/Login';
import SignUp from './SignUp';
import Forgotpassword from './Forgotpassword';
import Dashboard from './components/Dashboard';
import { TasksLoader } from './Loaders/TasksLoader';
import { SignUpaction } from './FormActions/SignupAction';

const router= createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<ParentLayout/>}>
          <Route path='/'  element={<Login/>} action={SignUpaction}/>
          <Route path='SignUp' element={<SignUp/>}/>
          <Route path='dashboard' loader={TasksLoader} element={<Dashboard/>}/>
          <Route path='Forgotpassword' element={<Forgotpassword/>}/>
          <Route path='*' element={<Comp404/>}/>
      </Route>
  )
)
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
