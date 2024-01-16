import { ENDPOINTS } from "@utils/config";
import { ReactNode } from "react";

type Props = {
    fileName: string,
    children: ReactNode
};

export default function DownloadFile({ fileName, children }: Props) {
    return <a href={ENDPOINTS.AUDIO.GET_FILE + fileName} download={true} target="_blank" >{children}</a>;
}
