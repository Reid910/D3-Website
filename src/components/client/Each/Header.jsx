// import '../../../app/navbar.css'

export default function Header() {
    return (
        <nav
        id="Navbar"
        style={{
            background: 'rgb(40,40,40)'
        }}
        className='w-full h-15 fixed'
        >
            {/* <div className='h-full w-1/2 bg-sky-100'></div> */}
            <div>
                <div className='h-full w-1/2 bg-sky-100'></div>
                <a className='h-full'>
                    Home
                </a>
                <a>
                    Info
                </a>
                <a>
                    About
                </a>
            </div>
        </nav>
    );
}
