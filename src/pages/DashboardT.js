import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './StudentDashboard.module.css';
import enroll from './Images/enroll.png';
import check from './Images/check.png';
import { handleSuccess } from '../util';
import { ToastContainer } from 'react-toastify';
import EnrollClass from "./EnrollClass";
import MarkAttendance from "./MarkAttendance";

function DashboardT() {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState('');
  const [id, setUserId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAttendance, setIsOpenAttendance] = useState(false);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
    setUserId(localStorage.getItem('id'));
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    handleSuccess("user logged out");
    setTimeout(() => {
      navigate('/home');
    }, 1000)
  }
  return (
    <div className={style.body}>
      <div className={style.head}>
        <button className={`${style.button} ${style.a}`} onClick={() => navigate('/Dashboard')}>
          SAM
        </button>
        <div className={style.center}>
          <p>{loggedInUser}</p>
          <p>{`ID: ${id}`}</p>
        </div>
        <div className={style.left}>
          <button className={`${style.button} ${style.a}`} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className={style.nav}>
        <ul className={style.ll}>
          <li><button className={`${style.button} ${style.x}`} onClick={() => navigate('/DashboardT')}>Home</button></li>
          <li><button className={`${style.button} ${style.x}`} onClick={() => navigate('/about')}>About</button></li>
          <li><button className={`${style.button} ${style.x}`} onClick={() => navigate('/details')}>Details</button></li>
        </ul>
      </div>

      <main>
        <div className={style.main}>
          <button className={`${style.button} ${style.c}`} onClick={() => setIsOpen(true)}>
            <img src={enroll} alt="img" width="20px" /> Enroll Class
          </button>
          <EnrollClass open={isOpen} onClose={() => setIsOpen(false)}>
          </EnrollClass>
          <button className={`${style.button} ${style.d}`} onClick={() => setIsOpenAttendance(true)}>
            <img src={check} alt="img" width="20px" /> Mark attendance
          </button>
          <MarkAttendance open={isOpenAttendance} onClose={() => setIsOpenAttendance(false)}>
          </MarkAttendance>
        </div>
      </main>
      < ToastContainer />
    </div>
  );
}

export default DashboardT;
