import React, { useState, useRef, useEffect } from "react";
import Styles from "../styles/AudioPlayer.module.css";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";

function AudioPlayer() {
  const [isPlaying, setPlaying] = useState(false);

  //   duration state
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrenttime] = useState(0);

  const audioPlayer = useRef(); //   reference to our audio component
  const progressBar = useRef(); //   reference to our prgressbar
  const animationRef = useRef(); //  reference to our animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);

    // set max prop with out seconds in input[range]
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMin} : ${returnSec}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;

    setPlaying(!prevValue);

    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const changeProgress = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changeCurrentTime();
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changeCurrentTime();
    // need to run more than once
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--played-width",
      `${(progressBar.current.value / duration) * 100}%`
    );

    setCurrenttime(progressBar.current.value);
  };

  return (
    <div className={Styles.audioPlayer}>
      <audio
        ref={audioPlayer}
        src="https://firebasestorage.googleapis.com/v0/b/codewithvetriapi-c56e3.appspot.com/o/bellaciao.mp3?alt=media&token=b0709131-d551-4ec6-96de-9417c58e7180"
        preload="metadata"
      />

      <i className={Styles.forwardBackward}>
        <FaBackward />
      </i>
      <i className={Styles.playPause} onClick={togglePlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </i>
      <i className={Styles.forwardBackward}>
        <FaForward />
      </i>

      {/* Current time */}
      <div className={Styles.currentTime}>{calculateTime(currentTime)}</div>

      <div>
        <input
          type="range"
          className={Styles.progresBar}
          defaultValue="0"
          ref={progressBar}
          onChange={changeProgress}
        />
      </div>

      {/* duration */}
      <div className={Styles.duration}>
        {duration && !isNaN(duration) && calculateTime(duration)}
      </div>
    </div>
  );
}

export { AudioPlayer };
