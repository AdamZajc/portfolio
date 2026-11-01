import Link from "next/link";

type IType = "paragraph" | "heading" | "link" | "image" | "video" | "list" | "code";
type Props = { text?: string; href?: string; src?: string; heading?: string; items?: string[]; };

function Paragraph({ text }: any) {
    return <p className={"text-justify"}>{text}</p>
}

function ILink({ text, href }: any) {
    return <Link href={href} className={"text-sky-400 hover:text-sky-300"} target={"_blank"}>{text}</Link>
}

function Image({ src }: any) {
    return <img src={src} alt={"photo"} className={"w-full h-auto"} />
}

function Video({ src }: any) {
 return <div></div>
}

function Heading({ text, heading }: any) {
    switch (heading) {
        case "1":
            return <h1 className={"text-3xl font-bold text-justify"}>{text}</h1>
        case "2":
            return <h2 className={"text-2xl font-bold text-justify"}>{text}</h2>
        case "3":
            return <h3 className={"text-xl font-bold text-justify"}>{text}</h3>
        case "4":
            return <h4 className={"text-lg font-bold text-justify"}>{text}</h4>
        case "5":
            return <h5 className={"text-base font-bold text-justify"}>{text}</h5>
    }
}

function List({ items }: any) {
    return <div>
        {items.map((item: string, index: number) => {
            return  <div className={"ml-2 flex"} key={index} ><p className={"mr-4"}>&#8211;</p><Paragraph text={item}/></div>
        })}
    </div>
}

function Code() {
    return <div></div>
}

export default function PostItem({ type, props }: { type: IType, props: Props }) {
    switch (type) {
        case "paragraph":
            return <Paragraph {...props} />
        case "link":
            return <ILink {...props} />
        case "image":
            return <Image {...props} />
        case "video":
            return <Video {...props} />
        case "heading":
            return <Heading {...props} />
        case "list":
            return <List {...props} />
        case "code":
            return <Code {...props} />
    }
}