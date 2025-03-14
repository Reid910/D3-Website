import Background from "@/components/client/Background";
import Button from "@/components/client/Buttons/Button";
import ScrollingFrame from "@/components/client/ScrollingFrame";

export default function Page() {
    return (
        <Background>
            <ScrollingFrame>
                <div className='h-1/2 w-1/2' >
                    <p>Hello World</p>
                    <div
                    style={{background: 'var(--foreground)'}}
                    className="w-80% h-screen bg-blue-500 mx-auto">
                    {/* Content inside the bar */}
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
                </div>
            </ScrollingFrame>
        </Background>
    )
}
