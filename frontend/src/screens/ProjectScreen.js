import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

function ProjectScreen() {

    const [count, setCount] = useState(0)

    const clickHandler = () => {
        setCount(count + 1)
    }

  return (
    <div>
        <Button variant='primary' onClick={clickHandler}>Click Me</Button>
        <p>Count: {count}</p>
    </div>
  )
}

export default ProjectScreen