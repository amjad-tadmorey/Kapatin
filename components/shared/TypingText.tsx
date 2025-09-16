import React, { useEffect, useState } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface TypingTextProps {
    text: string;
    style?: StyleProp<TextStyle>;
    speed?: number;
    loop?: boolean;
}

const TypingText: React.FC<TypingTextProps> = ({ text, style, speed = 100, loop = false }) => {
    const [displayedText, setDisplayedText] = useState<string>("");

    useEffect(() => {
        let currentIndex = 0;
        let interval: NodeJS.Timer;

        const type = () => {
            interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayedText(text.substring(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    if (loop) {
                        setTimeout(() => {
                            setDisplayedText("");
                            currentIndex = 0;
                            type();
                        }, 1000);
                    }
                }
            }, speed);
        };

        type();

        return () => clearInterval(interval);
    }, [text, speed, loop]);

    return <Text style={style}>{displayedText}</Text>;
};

export default TypingText;
