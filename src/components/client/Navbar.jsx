'use client'

// import Img from '../../assets/images/favicon.ico';

import Image from 'next/image';

import Link from 'next/link';
import NavButton from './NavButton';

function test() {
    
}

export default function Navbar() {
    return (
        <nav
            // style={{background: 'linear-gradient(black, rgba(0,0,0,0))'}}
            className="fixed w-full"
        >
            <div className='w-full truncate'>
                <button className='relative bg-gray-900 border-2 rounded-full mx-4 py-3 float-left'>
                    Logo
                </button>
                <NavButton label="Home" to='/'/>
                <NavButton label="Leaderboard" to='/leaderboards' txt='Normal' />
                <NavButton label="Leaderboard" to='/info' txt='Seasonal' />
                <NavButton label="Items" />
                <NavButton label="Character" />
            </div>
        </nav>
    );
}
