import React, { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

import Logo from '../../assets/images/Logo.png'
import './navbar.scss';
import { useSelector } from 'react-redux';
import { RootReducerInterface } from '../../shared/models/rootReducer';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [firstTime, setFirstTime] = useState<boolean>(false);
  const { currentUser } = useSelector(
    (state: RootReducerInterface) => state.user,
  );

  useEffect(() => {
    if(!currentUser.id && firstTime) {
      navigate('/sign-in');
    }
    setFirstTime(true);
  }, [])
  return (
    <div className="navbar-container">
      <div className='left-side'>
        <img className="logo" src={Logo} alt="" />
        <span className="logo-title">SENTIUM CONSULTING</span>
      </div>
      <div className="right-side">
        <div className="avatar-container">
          <PersonIcon />
        </div>
        <span className="user-info">{`${currentUser.name} ${currentUser.surname}`}</span>
      </div>
    </div>
  );
}

export default Navbar;
