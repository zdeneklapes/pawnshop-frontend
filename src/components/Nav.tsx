import Link from 'next/link'
import Image from 'next/image'

import {useState, useEffect} from 'react';
// import {signIn, signOut, useSession, getProviders} from 'next-auth/client';

const Nav = () => {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/">
        <Image src={"/next.svg"} alt="aas" width={30} height={30}></Image>
      </Link>
    </nav>
  )
}

export default Nav
