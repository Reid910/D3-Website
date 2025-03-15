import Background from "@/components/client/Background";
import ScrollingFrame from "@/components/client/ScrollingFrame";
import TitleText from "@/components/client/TitleText";
import Button from "@/components/client/Buttons/Button";

import Player from '@/components/client/Leaderboard/PlayerDetail';

export default function Page() {
    return (
        <Background>
            <TitleText>Seasonal Leaderboard</TitleText>
            <ScrollingFrame>
                <Player/>
                <Player/>
                <Player/>
                <Player/>
                <Player/>
                {/* <div className='h-1/2 w-2/3' >
                    <p>Hello World</p>
                    <div
                    style={{background: 'var(--foreground)'}}
                    className="w-100% h-screen bg-blue-500 mx-auto">
                    </div>
                    <div
                        style={{background: 'var(--foreground)'}}
                        className="w-1/2 h-16"
                    >
                        <div
                            style={{background: 'var(--background)'}}
                            className="w-1/2 h-16"
                        >
                            
                        </div>
                        <Button className="w-16,h-16"/>
                    </div>
                </div> */}
            </ScrollingFrame>
        </Background>
    )
}
