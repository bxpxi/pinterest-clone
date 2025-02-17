"use client"
import Image from 'next/image'
import React from 'react'
import { HiBell, HiChat, HiSearch } from 'react-icons/hi'
import { useSession, signIn, signOut } from 'next-auth/react'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import app from './../shared/firebaseConfig';
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function Header() {
  const { data:session } = useSession()

  const router = useRouter()

  const db = getFirestore(app)

  useEffect(() => {
    saveUserInfo()
  }, [session])

  const saveUserInfo = async() => {
    if(session?.user) {
      await setDoc(doc(db, "user", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image
      })
    }
  }

  const onCreateClick = () => {
    if(session) {
      router.push('/pin-builder')
    }else {
      signIn()
    }
  }

  return (
    <div className='flex gap-3 md:gap-2 items-center p-6'>
        <Image onClick={() => router.push('/')} src='/logo.png' alt='logo' width={50} height={50} className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'/>
        <button className='bg-black text-white p-2 rounded-full px-4' onClick={()=>router.push('/')}>Home</button>
        <button className='bg-white text-black font-semibold p-2 rounded-full px-4' onClick={() => onCreateClick()}>Create</button>
        <div className='bg-[#e9e9e9] p-3 gap-3 items-center rounded-full w-full hidden md:flex'>
            <HiSearch className='text-gray-500 text-[25px]'/>
            <input type='text' placeholder='Search' className='bg-transparent outline-none'/>
        </div>
        <HiSearch className='text-gray-500 text-[25px] md:hidden'/>
        <HiBell className='text-[40px] text-gray-500'/>
        <HiChat className='text-[40px] text-gray-500'/>
        {session?.user ? 
            <Image onClick={() => router.push('/'+session.user.email)} src={session?.user?.image} alt='user image' width={50} height={50} className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'/>
            : <button onClick={() => signIn()} className='bg-white text-black font-semibold p-2 rounded-full px-4'>Login</button>
        }
    </div>
  )
}

export default Header