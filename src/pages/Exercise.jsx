import React from 'react'
import ExercisePlan from '../components/exercises/ExercisePlan'
import ExerciseDetail from '../components/exercises/ExerciseDetail'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
const Exercise = () => {
  return (
    <div className='w-[100%] h-[100%] bg-white'>
     
      <Routes>
        <Route path='/' element={ <ExercisePlan/>}/>
        <Route path='/:id' element={ <ExerciseDetail/>}/>
      </Routes>
     
     
    </div>
  )
}

export default Exercise
