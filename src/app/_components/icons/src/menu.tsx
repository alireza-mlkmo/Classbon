import BaseIcon from "@/app/_components/icons/base-icon";
import { SvgIcon as SvgIconType } from "@/app/_components/icons/icon.types";

export default function SvgIcon(props:SvgIconType){
    return(
        <BaseIcon {...props}>
          <?xml version="1.0" encoding="utf-8"?><path d="M4 18L20 18"/><path d="M4 12L20 12"/><path d="M4 6L20 6"/>
        </BaseIcon>
    )
} 