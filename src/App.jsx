import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Components/Header'
import Sidebar from "./Components/Sidebar"
const App = () => {
    return (
        <div>

            <Header />

            <div className='flex mt-[80px] max-w-full w-[95%] mx-auto'>
            <Sidebar />
                <Outlet />
            </div>

        </div>
    )
}

export default App