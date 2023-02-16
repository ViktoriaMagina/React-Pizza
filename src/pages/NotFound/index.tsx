import {
    Link
  } from 'react-router-dom' 
import Header from '../../components/Header';


const NotFound =() => {
    return(
        <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <p>404</p>
            <p>Вы явно зашли куда-то не туда</p>
            <Link to={"/"}>Начальная страница</Link>
          </div>
        </div>
      </div>
    )
}
export default NotFound