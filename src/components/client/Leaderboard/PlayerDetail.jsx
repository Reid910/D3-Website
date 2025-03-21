'use client'

import { UppercaseFirstLetters } from "@/components/server/stringFuncs";
import Image from "next/image";

export default function Player({selectedTitle, selectedStat, Data, player, dataMap, Hardcore}) {
    // console.log(Data,player,dataMap);
    const ClanName = dataMap.get('ClanName');
    const ClanTag = dataMap.get('HeroClanTag');
    
    const ClanDisplay = ClanName && `${ClanName} (${ClanTag})` || 'No Clan';
    
    const rankColors = {
        1: "border-2 border-red-700 bg-red-950 shadow-red-500 shadow-xl",
        2: "border-2 border-amber-600 bg-amber-950 shadow-amber-600 shadow-xl",
        3: "border-2 border-yellow-500 bg-yellow-900 shadow-yellow-900 shadow-lg",
        default: "border-2 border-gray-700 bg-gray-900"
    };
    
    const RankColor = rankColors[player.order] || rankColors.default;
    
    // const RankColor = player.order == 1 ? "yellow" : player.order == 2 ? "silver" : player.order == 3 ? "bronze" : "gray";
    
    const HeroClass = dataMap.get('HeroClass');
    const HeroGender = dataMap.get('HeroGender') == 'm' ? 'male' : 'female';
    
    const HeroClassSlug = HeroClass == 'necromancer' ? 'p6_necro' : HeroClass == 'crusader' ? 'x1_'+HeroClass : HeroClass.replace(' ','')
    
    const date = new Date(dataMap.get('CompletedTime'));
    
    const Stat = dataMap.get(selectedStat);
    const RiftTime = dataMap.get('RiftTime');
    
    const TimeinMins = RiftTime ? Math.floor(RiftTime/60)/1000 : null;
    const TimeColor = RiftTime ? `rgb(${Math.min(255, Math.max(0, 100 + (TimeinMins / 15) * 155))}, ${Math.min(255, Math.max(0, 255 - (TimeinMins / 15) * 255))}, 0)` : null;
    
    const HcColor = Hardcore ? 'red' : 'green'
    
    return (
        <div className="flex items-center justify-between bg-gray-950 border border-gray-900 rounded-lg p-1 pl-2 my-1 hover:border-emerald-400 transition duration-300">
            {/* Rank */}
            <Image
                className={`rounded-full border border-${HcColor}-500 w-11 h-11 flex items-center justify-center shadow-lg bg-${HcColor}-950 shadow-${HcColor}-700`}
                src={`https://assets.diablo3.blizzard.com/d3/icons/portraits/64/${HeroClassSlug}_${HeroGender}.png`} width={64} height={64} alt='Hero'
            />
            {/* <div
                style={{background-image: url('https://assets.diablo3.blizzard.com/d3/icons/portraits/42/barbarian_male.png')}}
                className="w-16 h-16 flex items-center justify-center bg-green-700 text-white text-2xl font-bold rounded-md shadow-md">
            </div> */}
            
            {/* Player Info */}
            <div className="flex-1 ml-4 text-white">
                <p className={`text-lg font-semibold ${Hardcore && 'italic'}`}>{dataMap.get('HeroBattleTag')?.replace('#',' - #') || 'Unknown Player'}</p>
                <p className="text-xs ml-1 text-emerald-400">{ClanDisplay}</p>
                <p className="text-xs ml-1 text-amber-700">
                    {Hardcore && <span className="pr-2 text-xs text-red-700 italic">Hardcore</span>}
                    <span>{UppercaseFirstLetters(dataMap.get('HeroClass')) || 'Unknown Class'}</span>
                </p>
            </div>
            
            {/* Leaderboard Stat */}
            <div className="flex flex-col items-center w-1/4 border-2 border-gray-900 rounded-full">
                <p className="text-sm text-gray-400 italic">{selectedTitle}</p>
                <p className="text-xl font-bold text-white">{Stat && Stat || 'N/A'}</p>
                {RiftTime && <p style={{color: TimeColor}} className="text-xs font-bold text-white">{TimeinMins + ' mins'}</p>}
            </div>
            {/* Completion Time */}
            <div className="flex flex-col items-center w-1/4 mx-8 border-2 border-gray-900 rounded-full">
                <p className="text-sm text-gray-400 italic">Date Completed</p>
                <p className="text-base font-bold text-white">{date.toLocaleDateString() || 'N/A'}</p>
                {/* <p className="text-sm font-bold text-white">{date.toLocaleTimeString() || 'N/A'}</p> */}
            </div>
            
            {/* Ranking Stat Display */}
            <div className={`flex flex-col items-center w-18 p-3 rounded-md ${RankColor}`}>
                <p className="text-white text-xs uppercase">RANK</p>
                <p className="text-lg font-bold text-white">
                    {player.order}
                </p>
            </div>
        </div>
    );
}
