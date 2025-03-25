export default function Image({HeroClassSlug, HeroGender, ClassName}) {
    return <Image
        key={index}
        className={`flex rounded-full border w-12 h-12 flex items-center justify-center shadow-lg border-${HcColor}-500 bg-${HcColor}-950 shadow-${HcColor}-700` + HcColor2}
        src={`https://assets.diablo3.blizzard.com/d3/icons/portraits/64/${HeroClassSlug}_${HeroGender}.png`}
        width={64}
        height={64}
        alt="Hero"
    />
}
