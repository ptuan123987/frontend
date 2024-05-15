import './AdminLayout.css'

import RightSide from './RigtSide/RightSide';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import {
  Chart as ChartJs,
  LineElement, 
  CategoryScale,
  LinearScale ,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
);

function AdminLayout({ children }) {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        {children}
        <RightSide/>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default AdminLayout;
