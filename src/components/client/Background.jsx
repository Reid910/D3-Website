export default function ({children}) {
    return (
        <div
            // style={{background: 'rgba(0, 0, 0, 0.75)'}}
            style={{background: 'rgba(0,0,0,0.8)'}}
            // style={{background: 'var(--background)'}}
            className="w-2/3 px-20 pt-35 h-screen mx-auto border-x-1"
        >
            {children}
        </div>
    )
}
