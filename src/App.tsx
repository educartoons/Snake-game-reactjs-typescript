import Board from "./components/Board"
import { GameContextProvider } from "./context/game-contex"

export default function App() {
  return (
    <GameContextProvider>
      <div className="min-h-screen bg-black">
        <Board />
      </div>
    </GameContextProvider>
  )
}
