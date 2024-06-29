import React from 'react'
import { TbWorld } from "react-icons/tb";
import { RiRotateLockFill } from "react-icons/ri";
import BULB from '../../assets/bulb_image.png'
import { Link } from 'react-router-dom';

function Why_sell() {
    return (
        <div>

            <div className='bg-[#277158]'>

                <div className='w-10/12 mx-auto'>

                    <h1 className=' text-white font-semibold text-5xl pt-16 font-roboto'>Why sell E-waste?</h1>

                    <div className=' text-white flex gap-10 mt-16 pb-28 group'>

                        <div className='bg-[#174B3A] px-10 py-10 flex flex-col gap-5 group-hover:scale-[0.80] hover:!scale-105 transition-all duration-200'>

                            <div>
                                <TbWorld size={50} />
                            </div>

                            <h2 className=' text-[28px] font-medium font-roboto'>Environmental Impact</h2>

                            <p className=' text-[16px] font-inter'>lorem epsum ut set unde omnis iste natus error lorem epsum ut set unde omnis iste natus error lorem epsum ut set unde omnis iste natus error lorem epsum ut set unde omnis iste natus error
                                lorem epsum ut set unde omnis iste natus error.
                            </p>

                        </div>

                        <div className='bg-[#174B3A] px-10 py-10 flex flex-col gap-5 group-hover:scale-[0.80] hover:!scale-105 transition-all duration-200'>

                            <div>
                                <RiRotateLockFill size={50} />
                            </div>

                            <h2 className=' text-[28px] font-medium font-roboto'>Data Security</h2>

                            <p className=' text-[16px] font-inter'>lorem epsum ut set unde omnis iste natus error lorem epsum ut set unde omnis iste natus error lorem epsum ut set unde omnis iste natus error lorem epsum ut set unde omnis iste natus error
                                lorem epsum ut set unde omnis iste natus error.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Why_sell
