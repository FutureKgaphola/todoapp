import {Link, Outlet} from 'react-router-dom';
const ParentLayout = () => {
    return ( 
        <div className="ParentLayout">
            <header>
                <div className="navbar">

                </div>
            </header>

            <main>
                <Outlet/>
            </main>

        </div>
     );
}
 
export default ParentLayout;