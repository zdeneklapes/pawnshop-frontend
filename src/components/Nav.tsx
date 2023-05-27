import Link from 'next/link'
import Image from 'next/image'

// import {useState, useEffect} from 'react';
// import {signIn, signOut, useSession, getProviders} from 'next-auth/client';

const Nav = () => {
    const s  = 10;
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/">
        <Image src={"/next.svg"} alt="aas" width={30} height={30}></Image>
      </Link>
      <h1>{s}</h1>
    </nav>
  )
}

export default Nav
