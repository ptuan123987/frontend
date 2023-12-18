import './AdminLayout.css'

import RightSide from './RigtSide/RightSide';
import Sidebar from './Sidebar';

function AdminLayout({ children }) {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        {children}
       
        <RightSide/>
      </div>
    </div>
  );
}

export default AdminLayout;
