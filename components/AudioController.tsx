import React, { useEffect, useRef, useState } from 'react';

// Placeholder Lo-Fi track (Royalty Free)
// User should replace this with their own file in public/assets/
const AUDIO_URL = "/assets/weird_fishes.mp3";

interface AudioControllerProps {
    muted: boolean;
}

export const AudioController: React.FC<AudioControllerProps> = ({ muted }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Create audio instance
        const audio = new Audio(AUDIO_URL);
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;

        // Attempt autoplay on load
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log("Autoplay prevented. Waiting for interaction.");
                // If autoplay fails, we wait for interaction
            });
        }

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, []);

    // Handle Mute/Unmute
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = muted;
        }
    }, [muted]);

    // Handle Interaction Fallback
    useEffect(() => {
        const handleInteraction = () => {
            if (!hasInteracted && audioRef.current) {
                audioRef.current.play().catch(e => console.error("Playback failed:", e));
                setHasInteracted(true);
            }
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [hasInteracted]);

    return null; // Invisible component
};
