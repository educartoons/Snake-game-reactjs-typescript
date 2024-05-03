import { useContext } from "react"
import { GameContext } from "../context/game-contex"

function useGameContext() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw Error("useGameContext needs to be used inside GameContextProvider")
  }
  return context
}

export { useGameContext }
