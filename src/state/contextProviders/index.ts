import { combinedContexts } from "combined-contexts";
import { GameContextProvider } from "./gameContext";
import { PlayerContextProvider } from "./playerContext";

let providers = [GameContextProvider, PlayerContextProvider];

export const AppContextProvider = combinedContexts(...providers);
