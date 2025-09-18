import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

export function useCustomEffect(runAlways: (event: string) => void) {
    // Mount / Unmount
    useEffect(() => {
        runAlways("mount");
        return () => runAlways("unmount");
    }, [runAlways]);

    // App open / close / background / foreground
    useEffect(() => {
        const sub = AppState.addEventListener("change", (state: AppStateStatus) => {
            runAlways("AppState:" + state);
        });
        return () => sub.remove();
    }, [runAlways]);

    // Screen focus
    useFocusEffect(
        useCallback(() => {
            runAlways("screen focused");
            return () => runAlways("screen unfocused");
        }, [runAlways])
    );
}
