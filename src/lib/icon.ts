import type {
    IconNode,
    IconNodeChild
} from "lucide";

export function iconToSvg(icon: IconNode, size: number = 24): string {
    const [
        _,
        attrs,
        children
    ] = icon;

    const childTags: string = (children?.map(([tag, childAttrs]: IconNodeChild): string => {
        const attrStr: string = Object.entries(childAttrs).map(([k, v]: [string, string | number]): string => `${k}="${v}"`).join(" ");
        return `<${tag} ${attrStr} />`;
    }).join("") ?? "");

    const attrStr: string = Object.entries({
        ...attrs,

        width:  size,
        height: size
    }).map(([k, v]: [string, number]): string => `${k}="${v}"`).join(" ");

    return `<svg ${attrStr}>${childTags}</svg>`;
}
