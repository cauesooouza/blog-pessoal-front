interface postsProps {
    tema?: string,
    principal: {
        titulo?: string,
        info?: string,
        desc?: string
        image?: string
    }
}

export default function ShowPost({ tema, principal }: postsProps) {
    return (
        <div className="bg-white max-w-[750px] overflow-hidden">
            <div className="px-6 py-2 flex justify-between border-b border-b-[#eee] ">
                <span className="font-bold capitalize">
                    {tema}
                </span>
                <button className="bg-[#4653f6] px-1 text-white text-sm">Ver mais</button>
            </div>
            <div className="p-6 flex flex-col gap-6">
                {/* principal */}
                <article className='bg-center bg-cover' style={{backgroundImage: `url('${principal.image}')`}}>
                    <div className="min-h-[350px] flex items-end bg-gradient-to-b from-transparent via-black/25 to-black/75">
                        <div className="px-4 pb-4 flex flex-col gap-1">
                            <span className="text-white font-bold text-xl">
                                {principal.titulo}
                            </span>
                            <span className="text-white/70 text-xs">{principal.info}</span>
                            <p className="text-white/75 text-sm">{principal.desc}</p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}
