import { createContext, useEffect, useRef, useState } from 'react'
import { produce } from 'immer'
import { COLUMNS, createBoard, ROWS } from '../components/Board'
import { find } from 'lodash'

type Cell = {
  positionX: number
  positionY: number
  leaving: boolean
  id: string
}

// type GameContext = {
//   snake: Cell[];
// }

type GameContext =
  | {
      snake: Cell[]
      apple: Cell | null
      moveRight: () => void
      moveLeft: () => void
      moveUp: () => void
      moveDown: () => void
      stopMovement: () => void
    }
  | undefined

export const GameContext = createContext<GameContext>(undefined)

type GameContextProviderProps = {
  children: React.ReactNode
}

const initialState: Cell[] = [
  { positionX: 5, positionY: 10, leaving: false, id: crypto.randomUUID() },
]

function GameContextProvider({ children }: GameContextProviderProps) {
  const [snake, setSnake] = useState<Cell[]>(initialState)
  const snakeRef = useRef(snake)
  snakeRef.current = snake

  const [board] = useState(createBoard(ROWS, COLUMNS))
  const [apple, setApple] = useState<Cell | null>({
    positionX: 15,
    positionY: 10,
    leaving: false,
    id: crypto.randomUUID(),
  })
  const appleRef = useRef(apple)
  appleRef.current = apple
  const intervalRef = useRef<number | null>(null)

  const stopMovement = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const generateRandomApple = () => {
    const availableIndex: [number, number][] = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (
          !find(snake, {
            positionX: j,
            positionY: i,
          })
        ) {
          availableIndex.push([i, j])
        }
      }
    }

    const randomPosition =
      availableIndex[Math.floor(Math.random() * availableIndex.length)]

    const newApple: Cell = {
      positionY: randomPosition[0],
      positionX: randomPosition[1],
      id: crypto.randomUUID(),
      leaving: false,
    }

    setApple(newApple)
  }

  const samePositions = (cell1: Cell, cell2: Cell) => {
    if (!cell1 || !cell2) return false
    return (
      cell1.positionX === cell2.positionX && cell1.positionY === cell2.positionY
    )
  }

  const moveSnakeRight = () => {
    const newSnake = produce(snakeRef.current, (draftSnake) => {
      draftSnake[0].positionX = draftSnake[0].positionX + 1

      for (let i = 1; i < draftSnake.length; i++) {
        draftSnake[i] = { ...snakeRef.current[i - 1], id: draftSnake[i].id }
      }

      const head = draftSnake[0]
      const tail = draftSnake[draftSnake.length - 1]
      if (samePositions(head, appleRef.current!)) {
        draftSnake.push({
          ...appleRef.current!,
          positionX: snakeRef.current[snakeRef.current.length - 1].positionX,
          positionY: snakeRef.current[snakeRef.current.length - 1].positionY,
        })
        setApple(null)
      }
      if (samePositions(tail, appleRef.current!)) {
        draftSnake.push({
          ...appleRef.current!,
          positionX: snakeRef.current[0].positionX,
          positionY: snakeRef.current[0].positionY,
        })
        setApple(null)
      }
    })
    setSnake(newSnake)
  }

  const moveRight = () => {
    stopMovement()
    moveSnakeRight()
    intervalRef.current = setInterval(() => {
      moveSnakeRight()
    }, 250)
  }

  const moveSnakeLeft = () => {
    const newSnake = produce(snakeRef.current, (draftSnake) => {
      draftSnake[0].positionX = draftSnake[0].positionX - 1

      for (let i = 1; i < draftSnake.length; i++) {
        draftSnake[i] = { ...snakeRef.current[i - 1], id: draftSnake[i].id }
      }
      const head = draftSnake[0]
      const tail = draftSnake[draftSnake.length - 1]
      if (samePositions(head, appleRef.current!)) {
        draftSnake.push({
          ...appleRef.current!,
          positionX: snakeRef.current[snakeRef.current.length - 1].positionX,
          positionY: snakeRef.current[snakeRef.current.length - 1].positionY,
        })
        setApple(null)
      }
      if (samePositions(tail, appleRef.current!)) {
        draftSnake.push({
          ...appleRef.current!,
          positionX: snakeRef.current[0].positionX,
          positionY: snakeRef.current[0].positionY,
        })
        setApple(null)
      }
    })
    setSnake(newSnake)
  }

  const moveLeft = () => {
    stopMovement()
    moveSnakeLeft()
    intervalRef.current = setInterval(() => {
      moveSnakeLeft()
    }, 200)
  }

  const moveSnakeUp = () => {
    const newSnake = produce(snakeRef.current, (draftSnake) => {
      draftSnake[0].positionY = draftSnake[0].positionY - 1

      for (let i = 1; i < draftSnake.length; i++) {
        draftSnake[i] = { ...snakeRef.current[i - 1], id: draftSnake[i].id }
      }
      const head = draftSnake[0]
      const tail = draftSnake[draftSnake.length - 1]
      if (samePositions(head, appleRef.current!)) {
        draftSnake.push({
          ...appleRef.current!,
          positionX: snakeRef.current[snakeRef.current.length - 1].positionX,
          positionY: snakeRef.current[snakeRef.current.length - 1].positionY,
        })
        setApple(null)
      }
      if (samePositions(tail, appleRef.current!)) {
        draftSnake.push({
          ...appleRef.current!,
          positionX: snakeRef.current[0].positionX,
          positionY: snakeRef.current[0].positionY,
        })
        setApple(null)
      }
    })
    setSnake(newSnake)
  }

  const moveUp = () => {
    stopMovement()
    moveSnakeUp()
    intervalRef.current = setInterval(() => {
      moveSnakeUp()
    }, 200)
  }

  const moveSnakeDown = () => {
    const newSnake = produce(snakeRef.current, (draftSnake) => {
      draftSnake[0].positionY = draftSnake[0].positionY + 1

      for (let i = 1; i < draftSnake.length; i++) {
        draftSnake[i] = { ...snakeRef.current[i - 1], id: draftSnake[i].id }
      }
      const head = draftSnake[0]
      const tail = draftSnake[draftSnake.length - 1]
      if (samePositions(head, appleRef.current!)) {
        draftSnake.push({
          ...appleRef.current!,
          positionX: snakeRef.current[snakeRef.current.length - 1].positionX,
          positionY: snakeRef.current[snakeRef.current.length - 1].positionY,
        })
        setApple(null)
      }
      if (samePositions(tail, appleRef.current!)) {
        draftSnake.push({
          ...appleRef.current!,
          positionX: snakeRef.current[0].positionX,
          positionY: snakeRef.current[0].positionY,
        })
        setApple(null)
      }
    })
    setSnake(newSnake)
  }

  const moveDown = () => {
    stopMovement()
    moveSnakeDown()
    intervalRef.current = setInterval(() => {
      moveSnakeDown()
    }, 200)
  }

  useEffect(() => {
    if (apple === null) {
      generateRandomApple()
    }
  }, [apple])

  return (
    <GameContext.Provider
      value={{
        snake,
        apple,
        moveRight,
        moveLeft,
        moveDown,
        moveUp,
        stopMovement,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export { GameContextProvider }
