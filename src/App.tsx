import Board from "./components/Board"
import { GameContextProvider } from "./context/game-contex"

export default function App() {
  return (
    <GameContextProvider>
      <div className="min-h-screen bg-black">
        <Board />
        <div className="w-[901px] mx-auto mt-4"><p className="text-base font-normal text-white">Developed by @educartoons using Typescript + ReactJS + TailwindCSS</p></div>
      </div>
    </GameContextProvider>
  )
}
