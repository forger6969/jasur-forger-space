import React from 'react'
import mars_logo from '../assets/mars_logo.webp'
import fire from '../assets/fire.svg'
import coin from '../assets/coin.svg'

import avatar from '../assets/avatar.jpg'

const Header = () => {
    return (
        <div>

            <header className='bg-white fixed top-0 w-full'>


                <div className='py-[20px] flex items-center justify-between max-w-full w-[95%] mx-auto'>


                    <img className='w-[200px]' src="data:image/webp;base64,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" alt="" />

                    <div className='flex items-center gap-6'>

                        <div className='border-[#D7E1F3] border-[1px] rounded px-[8px] py-[3px] w-fit flex gap-[8px] cursor-pointer'>
                            <img className='w-[20px]' src={fire} alt="" />
                            <p className='text-[#fc6736] text-[20px]'>2</p>
                        </div>

                        <div className='border-[#D7E1F3] border-[1px] rounded px-[8px] py-[3px] w-fit flex gap-[8px] cursor-pointer'>
                            <img className='w-[20px]' src={coin} alt="" />
                            <p className='text-[#fc6736] text-[20px]'>319</p>
                        </div>

                        <div className='border-[#D7E1F3] border-[1px] rounded px-[8px] py-[3px] w-fit flex gap-[8px] cursor-pointer'>

                            <p className='text-[#fc6736] text-[20px]'>⚡319</p>
                        </div>

                        <button className=' w-full bg-gradient-to-r from-[#ce42ff] via-[#27b0fc] to-[#3bf1da] rounded py-[7px] text-white font-bold text-[16px] cursor-pointer'>Obuna boling</button>

                        <div className='rounded-full w-fit border-[#979797] border-[3px]'>
                            <img className='w-[100px] rounded-full' src={avatar} alt="" />
                        </div>

                    </div>

                </div>


            </header>

        </div>
    )
}

export default Header