'use client'

import Background from "@/components/client/Background";
import ScrollingFrame from "@/components/client/ScrollingFrame";

import RankDetail from '@/components/client/Leaderboard/RankDetail';

import { GetSeasonIndex, GetSeasonLeaderboardTypes, GetSeasonalLeaderboard } from '@/components/server/API_requests';
import { UppercaseFirstLetters } from '@/components/server/stringFuncs';
import { useEffect, useRef, useState } from "react";
import Dropdown from "@/components/client/DropdownMenu";

export default function Page() {
    const [SearchBar, setSearchBar] = useState("");
    const [Search, setSearch] = useState("");
    
    const [Region, SetRegion] = useState('us');
    const [Season, SetSeason] = useState(1);
    const [Hardcore, SetHardcore] = useState(false);
    const [Party, SetParty] = useState('Any');
    const [Leaderboard, SetLeaderboard] = useState('achievement-points');
    
    const [Data, setData] = useState(null);
    const [Loading, setLoading] = useState(true);
    
    const [FilteredLb, SetFilteredLb] = useState([{'value':'achievement-points'}]);
    
    let PartyOptions = useRef([{'value':'Any'}]);
    let LeaderboardOptions = useRef([{'value':'achievement-points'}]);
    
    let TitleHasHardcode = useRef(Data?.title?.en_US.toLowerCase().includes('hardcore'));
    
    const regions = [ // hard coded regions used to choose regions from dropdown menu
        {'value':'us'},
        {'value':'eu'},
        {'value':'kr'},
        {'value':'tw'},
    ]
    
    let currentSeason = useRef(1);
    const seasons = Array.from({ length: currentSeason.current }, (_, i) => ({ value: (i + 1).toString() })); // thank you gpt!
    
    function FilterLeaderboardOptions() { // filters the list of leaderboards so that only the leaderboards that are filtered by will show up
        const LBFilter = LeaderboardOptions.current.filter(e => {
            return !isNaN(Number(e.value)) || Party === "Any" && e.value.includes('achievement') || (Party === "Any" || e.value.includes(Party)) && Hardcore === e.value.includes('hardcore');
        })
        SetFilteredLb(LBFilter);
        // SetLeaderboard(LBFilter[0].value);
    }
    
    useEffect(() => {
        // get season index ( current season )
        GetSeasonIndex(Region).then((seasonsList) => {
            currentSeason.current = seasonsList.current_season;
            SetSeason(seasonsList.current_season);
        })
    }, [Region]);
    
    useEffect(() => {
        // get a list of leaderboards for the season
        GetSeasonLeaderboardTypes(Region,Season).then((LbTypes) => {
            const pOptions = [{'value':'Any'}];
            const UniqueParties = new Map();
            const lbOptions = [];
            LbTypes.leaderboard?.forEach((ele,index) => {
                const lb = ele.ladder?.href.split("/").slice(-1)[0].split("?")[0]
                lbOptions.push({'value':lb,'txt':UppercaseFirstLetters(lb.replace(/-/g,' '))});
                UniqueParties.set(ele.team_size == 1 ? ele.hero_class_string : ele.team_size, {'team_size':ele.team_size,'hero_class_string':ele.hero_class_string})
            });
            
            LeaderboardOptions.current = lbOptions;
            FilterLeaderboardOptions();
            // SetFilteredLb(lbOptions);
            
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
            setData(Data);
            console.log(Data);
            TitleHasHardcode.current = Data?.title?.en_US.toLowerCase().includes('hardcore');
            setLoading(false);
        })
    }, [Region,Season,Leaderboard]); // dependency array ( page state depends on x )
    
    useEffect(FilterLeaderboardOptions, [Party,Hardcore]); // this allows the leaderboard list (dropdown menu) to update
    // it updates whenever you select a rift party or a hardcore type
    
    function handleSearch(passing) {
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
                <u className="text-lg">Conquest Description</u>{': ' + Data?.conquest_desc?.en_US}
            </h1>}
            
            <div className='rounded-3xl w-full h-[90vh] px-3 mb-10 py-5 flex flex-col border-2 border-gray-800'> {/* flex container for search and dropdown menus */}
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
                    <div className="flex flex-1 text-sm"> {/* SEARCH BAR (updates search every keystroke) */}
                        <input 
                            type="text"
                            onChange={handleSearch}
                            placeholder="Search - ( Name, Clan, Class )"
                            className="w-full p-2 z-5 border border-gray-600 rounded-md bg-gray-900 text-white
                                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:shadow-xl focus:shadow-sky-700 duration-100"
                        />
                    </div>
                </div>
                
                <div className="flex flex-row mb-3"> {/* flex container for search and button */}
                    <div className="flex flex-1 text-sm"> {/* SEARCH BAR (this is a custom one that waits for button press ) */}
                        <input 
                            type="text"
                            onChange={e=>{setSearchBar(e.target.value)}}
                            placeholder="Search - ( Name, Clan, Class )"
                            className="w-full p-2 z-5 border border-gray-600 rounded-md bg-gray-900 text-white
                                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:shadow-xl focus:shadow-sky-700 duration-100"
                        />
                    </div>
                    {/* BUTTON */}
                    <div className="ml-3"> {/* Adds spacing between search bar and button */}
                        <button 
                            onClick={()=>{
                                // handleSearch()
                                setSearch(SearchBar);
                            }}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md border-2 border-gray-700 hover:border-sky-500 hover:bg-gray-800 hover:shadow-lg hover:shadow-sky-500 duration-100">
                            Search
                        </button>
                    </div>
                </div>
                
                <ScrollingFrame>
                    {Loading ? (
                        <h1 className="w-full my-10 text-center text-3xl font-extrabold text-transparent bg-clip-text 
                            bg-gradient-to-r from-sky-400 to-blue-900">Loading...</h1>
                    ) : (
                        Data.row.map(Team => {
                            const lower_search = Search.toLowerCase();
                            // if search is empty keep all elements or check match
                            const Show = (Search.trim() === "") || Team.player.some(player => player.data.some(
                                val => val.id !== "GameAccount" && val.id !== "HeroVisualItems" && (val.number || val.string).toString().toLowerCase().includes(lower_search)
                            ))
                            // hiding elements instead of removing them makes it faster to show and hide while searching
                            return <RankDetail key={Team.order} Show={Show} Data={Data} Team={Team} />
                        })
                        // Data.row.filter(Team => {
                        //     if (Search.trim() === "") return true; // if search is empty keep all elements
                        //     // const value_obj = Team.data.find(e=>e.id===l)
                        //     const lower_search = Search.toLowerCase();
                        //     return Team.player.some(player => player.data.some(
                        //         val => val.id !== "GameAccount" && val.id !== "HeroVisualItems" && (val.number || val.string).toString().toLowerCase().includes(lower_search)
                        //     ))
                        // }).map(Team => (
                        //     <RankDetail key={Team.order} Data={Data} Team={Team} />
                        // ))
                    )}
                </ScrollingFrame>
            </div>
            
            
        </Background>
    );
}
