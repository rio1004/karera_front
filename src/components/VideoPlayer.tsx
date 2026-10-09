import { useEffect, useRef, type InputHTMLAttributes } from "react";
import {create, PlayerState} from "amazon-ivs-player";
import wasmBinaryUrl from "amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.wasm?url";
import wasmWorkerUrl from "amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.js?url";

type Props = {
    url:string,
} & InputHTMLAttributes<HTMLDivElement>;

const VideoPlayer = ({url, className,  ...rest }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null as unknown as HTMLVideoElement);
  
  useEffect(() => {
    const player = create({ wasmBinary:wasmBinaryUrl, wasmWorker:wasmWorkerUrl });
  
    const callback = () => {
      videoRef.current.muted =false
      player.removeEventListener(PlayerState.PLAYING, callback)
    }

    player.addEventListener(PlayerState.PLAYING, callback)
    player.attachHTMLVideoElement(videoRef.current)
    player.load(url);
    player.play()
  }, [url])

  
  return (
    <div className={`flex items-center justify-center` + className? ` ${className}`: ""} {...rest}>
        <video
          ref={videoRef}
          controls
          playsInline
        />
    </div>
  );
};

export default VideoPlayer;
