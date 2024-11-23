import React, { useEffect, useState } from 'react'
import styles from "./Header.module.css"
import img from "../images/lady.jpg"
import Form from "./Form.jsx"

function Header() {
  const [userName, setUserName]= useState("")
  const [LoggedIn,setLoggedIn] = useState(false)

  useEffect(()=>{
    const getUserData = ()=>{

      const supposedUser = "Kema"
      setUserName(supposedUser)
      setLoggedIn(true)
    }
    getUserData()
  },[])

  
  return (
    <div className={styles.Header}>
     <div className={styles.nameImage}>
      <div className={styles.username}>
         <h3>Hey {userName}!</h3>
      </div>
      <div className={styles.imageContainer}>
         <img src={img} alt="lady" />
      </div>
     </div>

        <Form/>
    </div>
  )
}

export default Header
