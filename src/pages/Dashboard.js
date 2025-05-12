import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './StudentDashboard.module.css';
import enroll from './Images/enroll.png';
import check from './Images/check.png';
import { handleSuccess } from '../util';
import { ToastContainer } from 'react-toastify';
import Enroll from "./Enroll";
import CheckAttendance from "./CheckAttendance";

function Dashboard() {
  const navigate = useNavigate();
  
  const [loggedInUser, setLoggedInUser] = useState('');
  const [id, setUserId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAttendance, setIsOpenAttendance] = useState(false);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
    setUserId(localStorage.getItem('id'));
  }, [])

  const handleLogout = (e) =>{
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
          <p>{`Roll no: ${id}`}</p>
        </div>
        <div className={style.left}>
          <button className={`${style.button} ${style.a}`} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className={style.nav}>
        <ul className={style.ll}>
          <li><button className={`${style.button} ${style.x}`} onClick={() => navigate('/Dashboard')}>Home</button></li>
          <li><button className={`${style.button} ${style.x}`} onClick={() => navigate('/about')}>About</button></li>
        </ul>
      </div>

      <main>
        <div className={style.main}>
          <button className={`${style.button} ${style.c}`} onClick={() => setIsOpen(true)}>
            <img src={enroll} alt="Enroll" width="20px" /> Enroll
          </button>
          <Enroll open = {isOpen} onClose = {() => setIsOpen(false)}>
          </Enroll>
          <button className={`${style.button} ${style.d}`}
          onClick={() => setIsOpenAttendance(true)}>
            <img src={check} alt="Check attendance" width="20px" /> Check attendance
          </button>
          <CheckAttendance open={isOpenAttendance} onClose={() => setIsOpenAttendance(false)}>
          </CheckAttendance>
        </div>
      </main>
      < ToastContainer />
    </div>
  );
}

export default Dashboard;
