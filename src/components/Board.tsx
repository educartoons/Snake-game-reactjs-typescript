import { useEffect, useState } from 'react'
import { useGameContext } from '../hooks/useGameContex'
import { ARROW_KEYS, isAValidKey } from '../utils/constants'

export function createBoard(horizontal: number, vertical: number) {
  return Array.from({ length: horizontal }, () => new Array(vertical).fill(0))
}

export const ROWS = 25
export const COLUMNS = 30

export default function Board() {
  const [board] = useState(createBoard(COLUMNS, ROWS))
  const { snake, moveRight, moveLeft, moveDown, moveUp, apple, stopMovement } =
    useGameContext()

  console.log(snake)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isAValidKey(event.key)) {
      switch (event.key) {
        case ARROW_KEYS.ArrowRight:
          moveRight()
          break
        case ARROW_KEYS.ArrowLeft:
          moveLeft()
          break
        case ARROW_KEYS.ArrowDown:
          moveDown()
          break
        case ARROW_KEYS.ArrowUp:
          moveUp()
          break
        default:
          break
      }
    }
    if (event.key === ' ') {
      stopMovement()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="flex justify-center">
      <div
        className="mt-20 grid border-l border-t border-neutral-800 relative"
        style={{
          gridTemplateColumns: 'repeat(30, 0fr)',
        }}
      >
        {board.map((row, r) =>
          row.map((_, c) => (
            <div
              key={`${r}-${c}`}
              className="text-white h-[30px] w-[30px] border-r border-b border-neutral-800"
            ></div>
          ))
        )}
        {snake.map((cell) => (
          <div
            key={cell.id}
            className="text-white h-[30px] w-[30px] bg-white absolute border-b border-r border-neutral-800 transition-all ease-out duration-300"
            style={{
              left: cell.positionX * 30,
              top: cell.positionY * 30,
            }}
          ></div>
        ))}

        {apple ? (
          <div
            key={apple.id}
            className="text-white h-[30px] w-[30px] bg-green-500 absolute border-b border-r border-neutral-800"
            style={{
              left: apple.positionX * 30,
              top: apple.positionY * 30,
            }}
          ></div>
        ) : null}
      </div>
    </div>
  )
}
