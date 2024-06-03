interface props {
    titulo: string,
    info: string,
    img: string
}

export default function PostSecundario({ titulo, info, img }: props) {
    return (
        <article className="flex flex-wrap w-1/3 gap-3">
            <img src={img} alt="algo" />
            <div className="flex flex-col justify-evenly">
                <span className="font-medium capitalize ">{titulo}</span>
                <span className="text-black/70 text-sm">{info}</span>
            </div>
        </article>
    )
}
