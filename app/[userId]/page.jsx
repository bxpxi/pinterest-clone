"use client"
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import app from './../shared/firebaseConfig'
import UserInfo from './../components/UserInfo'
import PinList from './../components/Pins/PinList'
import { collection, getDocs, query, where } from 'firebase/firestore'

function Profile({params}) {
  const db = getFirestore(app)

  const [userInfo, setUserInfo] = useState()
  const [listOfPins, setListOfPins] = useState([])

  useEffect(() => {
    console.log(params.userId.replace('%40','@'))
    if (params) {
        getUserInfo(params.userId.replace('%40','@'))
    }
  },[params])

  const getUserInfo = async(email) => {
    const docRef = doc(db, "user", email)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
        setUserInfo(docSnap.data())
    } else {
        console.log("No such doc")
    }
  }

  useEffect(() => {
    if(userInfo) {
      getUserPins()
    }
  },[userInfo])

  const getUserPins = async () => {
    const q = query(collection(db,'pinterest-post'), where("email",'==',userInfo.email))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        setListOfPins(listOfPins=>[...listOfPins,doc.data()])
    })
  }


  return (
    <div>
        { userInfo ? 
            <UserInfo userInfo={userInfo}/>
            : null}
        <PinList listOfPins={listOfPins}/>
    </div>
  )
}

export default Profile
