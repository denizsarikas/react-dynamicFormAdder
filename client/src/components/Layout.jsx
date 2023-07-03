//imports
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="bg-red-200 h-screen">
      <div className="bg-yellow-200 w-1/2 mx-auto"><Header /></div>
      <div className="bg-green-100 mx-auto w-11/12"><Outlet /></div>
    </div>
  )
}