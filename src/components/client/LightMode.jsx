'use client'

function handleClick() {
    console.log('clicked btn lightmode');
}

export default function () {
    return (
        <button
            onClick={handleClick}
        >
            Light Mode
        </button>
    );
}
