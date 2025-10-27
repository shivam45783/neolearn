import { GeneralContext } from '../../../context/GeneralContext'
import React, { useContext } from 'react'

const Dashboard = () => {
  const {userData} = useContext(GeneralContext);
  return (
    <div>{userData.name}</div>
  )
}

export default Dashboard