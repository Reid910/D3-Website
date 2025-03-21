export default function ({children}) {
    return (
        <div
            // style={{background: 'rgba(0, 0, 0, 0.75)'}}
            style={{background: 'rgba(0,0,0,0.8)'}}
            // style={{background: 'var(--background)'}}
            className="min-h-full w-2/3 px-15 pt-30 pb-10 mx-auto border-x-1"
        >
            {children}
        </div>
    )
}
