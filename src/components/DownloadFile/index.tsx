import { ENDPOINTS_URL } from "@/utils/config";
import { MouseEvent, ReactNode } from "react";

type Props = {
    fileName: string,
    children: ReactNode,
    textName: string
};

export default function DownloadFile({ fileName, textName, children }: Props) {

    const onClick = (e: any) => {
        e.preventDefault()
        fetch(ENDPOINTS_URL.AUDIO + fileName)
            .then(response => response.blob())
            .then(blob => {
                var newBlob = new Blob([blob], { type: 'audio/mpeg' });

                var downloadLink = document.createElement('a');
                downloadLink.style.display = 'none';
                downloadLink.href = URL.createObjectURL(newBlob);
                downloadLink.download = `${textName}.mp3`;
                document.body.appendChild(downloadLink);

                downloadLink.click();

                return document.body.removeChild(downloadLink);
            });
    }

    return <a href={ENDPOINTS_URL.AUDIO + fileName} onClick={onClick}>{children}</a>;
}
