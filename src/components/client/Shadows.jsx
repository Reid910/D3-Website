export default function ({ toppx, botpx }) {
    return (<div>
        <div
            style={{background: 'linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0))'}}
            className="fixed w-full h-35 top-0"
        />
        <div
            style={{background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))'}}
            className="fixed w-full h-5 bottom-0"
        />
    </div>)
}
