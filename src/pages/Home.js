import React from 'react';
import { Link } from "react-router-dom";
import a1 from './Images/a1.png';
import a2 from './Images/a2.png';
import styles from './Home.module.css';

function Home() {
  return (
    <div className="main">
      <div className={styles.head}>
        <a href="/home">
          <button className={`buttongroup ${styles.b}`}>
            SAM
          </button>
        </a>
        <div className={styles.b}>
          <Link to="/signup" className={`buttongroup ${styles.b}`}>
            Signup
          </Link>
          <Link to="/login" className={`buttongroup ${styles.b}`}>
            Login
          </Link>
        </div>
      </div>

      <div className={styles.nav}>
        <ul className = {styles.unol}>
          <li className = {styles.li}><Link to="http://localhost:3000/home" className = {styles.linkers}>Home</Link></li>
          <li className = {styles.li}><Link to="http://localhost:3000/About" className = {styles.linkers}>About</Link></li>
        </ul>
      </div>

      <div className = {styles.about}>
        Effortlessly track and manage student attendance with our intuitive system. Automate records, reduce errors, and generate real-time reports with ease. Designed for efficiency, our platform ensures seamless attendance monitoring, making it simple for educators to focus on what truly matters—student success and academic growth
      </div>

      <div className = {styles.about}>
        <div className = {styles.first}>
          Easily maintain your attendance
        </div>
        <div className="fi">
          <img src={a1} alt="" width="300px" />
        </div>
      </div>

      <div className = {styles.about}>
        <div className = {styles.first}>
          A very easiest yet errorless attendance Management
        </div>
        <div className="fi">
          <img src={a2} alt="" width="350px" />
        </div>
      </div>
    </div>
  )
}

export default Home