'use client'

import Background from "@/components/client/Background";
import ScrollingFrame from "@/components/client/ScrollingFrame";

import RankDetail from '@/components/client/Leaderboard/RankDetail';
import Player from '@/components/client/Leaderboard/PlayerDetail';

import { GetSeasonIndex, GetSeasonLeaderboardTypes, GetSeasonalLeaderboard } from '@/components/server/API_requests';
import { UppercaseFirstLetters } from '@/components/server/stringFuncs';
import { useEffect, useRef, useState } from "react";
import Dropdown from "@/components/client/DropdownMenu";

export default function Page() {
    const [Search, setSearch] = useState("");
    
    const [Region, SetRegion] = useState('us');
    const [Season, SetSeason] = useState(1);
    const [Hardcore, SetHardcore] = useState(false);
    const [Party, SetParty] = useState('Any');
    const [Leaderboard, SetLeaderboard] = useState('achievement-points');
    
    const [Data, setData] = useState(null);
    const [Loading, setLoading] = useState(true);
    
    let PartyOptions = useRef([{'value':'Any'}]);
    let LeaderboardOptions = useRef([{'value':'achievement-points'}]);
    
    const [FilteredLb, SetFilteredLb] = useState([{'value':'achievement-points'}]);
    
    let TitleHasHardcode = useRef(Data?.title?.en_US.toLowerCase().includes('hardcore'));
    
    const regions = [
        {'value':'us'},
        {'value':'eu'},
        {'value':'kr'},
        {'value':'tw'},
    ]
    
    let currentSeason = useRef(1);
    const seasons = Array.from({ length: currentSeason.current }, (_, i) => ({ value: (i + 1).toString() })); // thank you gpt!
    
    const [selectedStat, setSelectedStat] = useState('Rank'); // Default ranking stat
    
    const DataMapped = Data?.row?.map((player) => {
        // Create dataMap ONCE per player ( makes it easier to get data from player ( it was in two arrays and not in a map ) )
        const dataMap = new Map()
        
        player.data.forEach(o => {
            dataMap.set(o.id, o.string || o.number || o.timestamp)
        });
        player.player[0]?.data.forEach(o => {
            dataMap.set(o.id, o.string || o.number || o.timestamp)
        });
        
        return { player, dataMap }; // Store both in an array
    });
    
    useEffect(() => {
        // get season index ( current season )
        GetSeasonIndex(Region).then((seasonsList) => {
            console.log(seasonsList);
            currentSeason.current = seasonsList.current_season;
            SetSeason(seasonsList.current_season);
        })
    }, [Region]);
    
    useEffect(() => {
        // get a list of leaderboards for the season
        GetSeasonLeaderboardTypes(Region,Season).then((LbTypes) => {
            console.log(LbTypes);
            
            const pOptions = [{'value':'Any'}];
            const UniqueParties = new Map();
            
            const lbOptions = [];
            LbTypes.leaderboard?.forEach((ele,index) => {
                const lb = ele.ladder?.href.split("/").slice(-1)[0].split("?")[0]
                lbOptions.push({'value':lb,'txt':UppercaseFirstLetters(lb.replace(/-/g,' '))});
                UniqueParties.set(ele.team_size == 1 ? ele.hero_class_string : ele.team_size, {'team_size':ele.team_size,'hero_class_string':ele.hero_class_string})
            });
            
            LeaderboardOptions.current = lbOptions;
            SetFilteredLb(lbOptions);
            
            UniqueParties.forEach(({team_size, hero_class_string}) => {
                if (team_size > 1) {
                    pOptions.push({'value':`team-${team_size}`,'txt':`Team of ${team_size}`});
                }
                else if (hero_class_string) {
                    const slug = hero_class_string;
                    hero_class_string = hero_class_string == 'dh' ? 'Demon Hunter' : hero_class_string == 'wd' ? 'Witch Doctor' : UppercaseFirstLetters(hero_class_string);
                    pOptions.push({'value':slug,'txt':`Solo ${hero_class_string}`});
                }
            });
            
            PartyOptions.current = pOptions;
        })
    }, [Region,Season]);
    
    useEffect(() => {
        // fetch data here
        GetSeasonalLeaderboard(Region,Season,Leaderboard).then((Data) => {
            console.log(Data);
            setData(Data);
            TitleHasHardcode.current = Data?.title?.en_US.toLowerCase().includes('hardcore');
            setLoading(false);
        })
    }, [Region,Season,Leaderboard]); // dependency array ( page state depends on x )
    
    useEffect(() => {
        const LBFilter = LeaderboardOptions.current.filter(e => {
            console.log(Hardcore,Hardcore == true,typeof(Hardcore));
            return !isNaN(Number(e.value)) || Party === "Any" && e.value.includes('achievement') || (Party === "Any" || e.value.includes(Party)) && Hardcore === e.value.includes('hardcore');
        })
        
        SetFilteredLb(LBFilter);
        
        SetLeaderboard(LBFilter[0].value);
        
    }, [Party,Hardcore]);
    
    function handleSearch(passing) {
        // console.log(passing,passing.target.value);
        setSearch(passing.target.value);
    }
    
    function handleHardcore(value) {
        SetHardcore(value === "true");
    }
    
    return (
        <Background>
            <h1 className="w-full mb-4 text-center text-6xl font-extrabold text-transparent bg-clip-text 
                bg-gradient-to-b from-green-600 to-emerald-400">Seasonal Leaderboard</h1>
            
            <div className="flex mb-4 text-2xl text-sky-500 justify-center text-center font-bold">
                <h1 className="text-gray-500 italic">Displaying:</h1>
                <u className="ml-4 text-lg text-amber-700">
                    <h1 className=" text-2xl text-gray-300">
                        {'Season ' + Season}
                    </h1>
                </u>
                {/* <h1 className="ml-4 text-gray-300 italic">{'Season ' + Season + ' '}</h1> */}
                <u className="ml-4 text-lg text-emerald-500">
                    <h1 className=" text-2xl text-gray-300">
                        {Data?.title?.en_US}
                    </h1>
                </u>
            </div>
            
            {Data?.conquest_desc && <h1 className="mx-auto mb-4 p-2 w-2/3 text-center text-md text-white border border-gray-800 rounded-lg">
                <u className="text-sm">Conquest Desc</u>{': ' + Data?.conquest_desc?.en_US}
            </h1>}
            
            <div className='rounded w-full h-[85vh] px-3 mb-10 flex flex-col border-1 border-gray-800'> {/* flex container for search and dropdown menus */}
                <div className="flex flex-row my-3"> {/* flex container for search and dropdown menus */}
                    <h1 className='flex flex-row my-2 mr-2 text-emerald-500 font-bold italic'>Select a Leaderboard:</h1>
                    {/* DROPDOWN MENUS */}
                    <Dropdown
                        label='Region'
                        Selected={Region}
                        Options={regions}
                        setSelectedStat={SetRegion}
                        className='flex justify-end relative ml-2'
                    />
                    <Dropdown
                        label='Season'
                        Selected={Season}
                        Options={seasons}
                        setSelectedStat={SetSeason}
                        className='flex justify-end relative ml-2'
                    />
                    <Dropdown
                        label='Hardcore'
                        Selected={Hardcore}
                        Options={[{value:true,'txt':'Yes'},{value:false,'txt':'No'}]}
                        setSelectedStat={handleHardcore}
                        className='flex justify-end relative ml-2'
                    />
                    <Dropdown
                        label='Rift Party'
                        Selected={Party}
                        Options={PartyOptions.current}
                        setSelectedStat={SetParty}
                        className='flex justify-end relative ml-2'
                    />
                    <Dropdown
                        label='Leaderboard'
                        Selected={Leaderboard}
                        FilteredLb={FilteredLb}
                        Options={FilteredLb}
                        setSelectedStat={SetLeaderboard}
                        className='flex justify-end relative ml-2'
                    />
                </div>
                
                <div className="flex flex-row mb-3"> {/* flex container for search and dropdown menus */}
                    <div className="flex flex-1 text-sm"> {/* SEARCH BAR */}
                        {/* <label className="text-white text-sm font-semibold">Username</label> */}
                        <input 
                            type="text"
                            onChange={handleSearch}
                            placeholder="Search - ( Name, Clan, Class )"
                            className="w-full p-2 z-5 border border-gray-600 rounded-md bg-gray-900 text-white
                                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:shadow-xl focus:shadow-sky-700 duration-100"
                        />
                    </div>
                </div>
                
                <ScrollingFrame>
                    {/* <div className="flex items-center justify-between bg-gray-950 border border-gray-700 rounded-lg my-2 p-4 shadow-md shadow-gray-800 hover:shadow-green-500 hover:shadow-lg transition duration-250"></div> */}
                    
                    {/* {Loading ? (
                        <h1 className="w-full my-10 text-center text-3xl font-extrabold text-transparent bg-clip-text 
                            bg-gradient-to-r from-sky-400 to-blue-900">Loading...</h1>
                    ) : (
                        
                        Data.row.map(Team => (
                            <RankDetail key={Team.order} Data={Data} Team={Team} />
                        ))
                        
                    )} */}
                    
                    {Loading ? (
                        <h1 className="w-full my-10 text-center text-3xl font-extrabold text-transparent bg-clip-text 
                            bg-gradient-to-r from-sky-400 to-blue-900">Loading...</h1>
                    ) : (
                        <div>
                            {
                                DataMapped.filter(({ dataMap }) => {
                                    // If search is empty, show all players
                                    if (Search.trim() === "") return true;
                                    
                                    // Check if the search term matches BattleTag or HeroBattleTag
                                    return (
                                        (dataMap.get('BattleTag')?.toLowerCase().includes(Search.toLowerCase())) ||
                                        (dataMap.get('HeroBattleTag')?.toLowerCase().includes(Search.toLowerCase()))
                                    );
                                })
                                .map(({ player, dataMap }, index) => (
                                    <Player key={index} selectedTitle={Data.column[2].label.en_US} selectedStat={player.data[1].id} Data={Data} player={player} dataMap={dataMap} Hardcore={TitleHasHardcode.current} />
                                ))
                            }
                        </div>
                    )}
                </ScrollingFrame>
            </div>
            
            
        </Background>
    );
}
