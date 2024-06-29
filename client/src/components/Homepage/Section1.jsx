import React from 'react'
import BIN from "../../assets/e-waste_home.jpg"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Section1 = () => {

    const { token } = useSelector((state) => state.auth)
    return (
        <div>

            <div className=' bg-[#FFFFFF]'>

                <div className='flex justify-evenly w-10/12 mx-auto'>

                    <div className='flex flex-col gap-2 justify-center max-w-[700px] font-semibold'>
                        <h1 className=' text-5xl font-roboto'>
                            Transforming <span className=' text-[#277158]'>E-waste</span> into Environmental Impact
                        </h1>

                        <p className=' text-2xl font-medium max-w-[500px] font-poppins opacity-55'>Get The Hidden Value Of Your Waste While Helping Environment</p>

                    </div>

                    <div>
                        <img src={BIN} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section1
