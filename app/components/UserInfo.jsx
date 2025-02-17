import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function UserInfo({userInfo}) {
  console.log(userInfo)
  const router = useRouter()
  const {data:session} = useSession()

  const onLogoutClick = () => {
    signOut()
    router.push('/')
  }

  return (
    <div className='flex flex-col items-center'>
        <Image src={userInfo.userImage} alt='user image' width={100} height={100} className='rounded-full'/>
        <h2 className='text-[30px] font-semibold text-white text-gray-800'>{userInfo.userName}</h2>
        <h2 className='text-gray-800'>{userInfo.email}</h2>
        <div className='flex gap-4'>
          <button className='bg-gray-200 p-2 px-3 rounded-full font-semibold text-gray-800 mt-5'>Share</button>
          {session?.user.email==userInfo.email ? <button className='bg-gray-200 p-2 px-3 rounded-full font-semibold text-gray-800 mt-5' onClick={() => onLogoutClick()}>Logout</button> : null}
        </div>
    </div>
  )
}

export default UserInfo