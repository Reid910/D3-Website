'use client'

import { UppercaseFirstLetters } from "@/components/server/stringFuncs";
import Image from "next/image";

import PlayerDetail from '@/components/client/Leaderboard/PlayerDetail';

function Display(title,value) {
    return <div className="flex-2 items-center justify-between bg-gray-900 rounded-md m-1">
        <div className="flex flex-col items-center">
            <p className="text-xs text-gray-400">{title}</p>
            <p className="text-xs font-bold text-white p-2 text-center">{value}</p>
        </div>
    </div>
}

export default function Rank({Data, Team}) {
    
    console.log(Data,Team);
    
    const DATA_MAP = new Map();
    
    Data.column.forEach(e => {
        // not hidden means it is a part of Team.Data while hidden is Team.player[array].data
        // I only want to map the main data here, and I can map player data elsewhere
        const TeamData = Team.data.find(b=>e.id===b.id)
        if (!e.hidden && TeamData) {
            // console.log(TeamData,TeamData[e.type.toLowerCase()]);
            const Type = e.type.toLowerCase()
            console.log(e.id,Type);
            DATA_MAP.set(e.id, {column:e,value:TeamData[Type === 'datetime' ? 'timestamp' : Type]});
        }
        else {
            DATA_MAP.set(e.id, {column:e})
        }
    });
    
    const Labels = Data.conquest ? ['CompletedTime'] : Data.greater_rift ? ['RiftLevel', 'RiftTime', 'CompletedTime'] : ['AchievementPoints', 'CompletedTime'];
    
    const Rank = DATA_MAP.get("Rank") || Team.order;
    console.log(Rank);
    
    const IsHardcore = Data?.hardcore || false;
    
    const rankColors = {
        1: "border-2 border-red-700 bg-red-950 shadow-red-500 shadow-xl",
        2: "border-2 border-amber-600 bg-amber-950 shadow-amber-600 shadow-xl",
        3: "border-2 border-yellow-500 bg-yellow-900 shadow-yellow-900 shadow-lg",
        default: "border-2 border-gray-700 bg-gray-900"
    };
    
    const RankColor = rankColors[Rank.value] || rankColors.default;
    
    const HcColor = IsHardcore ? 'red' : 'green'
    
    return (
        <div>
            
            {/* <Image
                className={`rounded-full border border-${HcColor}-500 w-11 h-11 flex items-center justify-center shadow-lg bg-${HcColor}-950 shadow-${HcColor}-700`}
                src={`https://assets.diablo3.blizzard.com/d3/icons/portraits/64/${HeroClassSlug}_${HeroGender}.png`} width={64} height={64} alt='Hero'
            /> */}
            <div key={Team.order} className={`flex bg-gray-950 border border-gray-900 rounded-lg p-1 mt-1 transition duration-300`}>
                {/* <div className={`flex-1 place-items-center grid grid-cols-2 gap-2 border`}> */}
                <div className={`flex flex-row gap-2 px-2 place-items-center justify-start`}>
                    {Team.player.map((player,index) => {
                        const HeroClass = player.data.find(e=>e.id==='HeroClass').string;
                        const HeroGender = player.data.find(e=>e.id==='HeroGender') == 'm' ? 'male' : 'female';
                        console.log(HeroClass,HeroGender)
                        const HeroClassSlug = HeroClass == 'necromancer' ? 'p6_necro' : HeroClass == 'crusader' ? 'x1_'+HeroClass : HeroClass.replace(' ','')
                        return <Image
                            key={index}
                            className={`flex rounded-full border border-${HcColor}-500 w-12 h-12 flex items-center justify-center shadow-lg bg-${HcColor}-950 shadow-${HcColor}-700`}
                            src={`https://assets.diablo3.blizzard.com/d3/icons/portraits/64/${HeroClassSlug}_${HeroGender}.png`}
                            width={64}
                            height={64}
                            alt="Hero"
                        />
                    })}
                </div>
                {Labels.map(l => {
                    const data = DATA_MAP.get(l);
                    const title = data.column.label.en_US;
                    const str = l === 'CompletedTime' ? new Date(data.value).toLocaleDateString() : data.value;
                    return <div className="flex-2 items-center justify-between bg-gray-900 rounded-md m-1">
                        <div className="flex flex-col items-center">
                            <p className="text-xs text-gray-400">{title}</p>
                            <p className="text-xs font-bold text-white p-2 text-center">{str}</p>
                        </div>
                    </div>
                })}
                <div className={`flex-1 items-center justify-between rounded-md m-1 ${RankColor}`}>
                    {/* Leaderboard Stat */}
                    <div className="flex flex-col items-center">
                        <p className="text-xs text-white">{'RANK'}</p>
                        <p className="text-sm font-bold text-white">{Rank.value}</p>
                        {/* {RiftTime && <p style={{color: TimeColor}} className="text-xs font-bold text-white">{TimeinMins + ' mins'}</p>} */}
                    </div>
                </div>
            </div>
            <div className={`flex flex-row gap-2 px-2 place-items-center justify-start`}>
                {Team.player.map((player,index) => {
                    
                    return (
                        <div className="flex">
                            <p>name</p>
                        </div>
                    )
                    
                    const HeroClass = player.data.find(e=>e.id==='HeroClass').string;
                    const HeroGender = player.data.find(e=>e.id==='HeroGender') == 'm' ? 'male' : 'female';
                    console.log(HeroClass,HeroGender)
                    const HeroClassSlug = HeroClass == 'necromancer' ? 'p6_necro' : HeroClass == 'crusader' ? 'x1_'+HeroClass : HeroClass.replace(' ','')
                    
                    return <p>Name</p>
                    return <Image
                        key={index}
                        className={`flex rounded-full border border-${HcColor}-500 w-12 h-12 flex items-center justify-center shadow-lg bg-${HcColor}-950 shadow-${HcColor}-700`}
                        src={`https://assets.diablo3.blizzard.com/d3/icons/portraits/64/${HeroClassSlug}_${HeroGender}.png`}
                        width={64}
                        height={64}
                        alt="Hero"
                    />
                })}
            </div>
        </div>
    )
}
