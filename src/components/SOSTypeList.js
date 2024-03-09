import React, { useState } from 'react'
import Image from 'next/image'
function SOSTypeList({sosTypes, onSosTypeChange}) {
    const [selectedCategory,setSelectedCategory]=useState();
    return (
        <div>
            <h2 className='font-bold px-2'>
                Chọn loại S.O.S
            </h2>
            <div class="relative hidden md:block">
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2'>
                    {sosTypes?.map((item,index)=>(
                        <div 
                            key={index} 
                            className={`flex flex-col justify-center items-center bg-gray-100 p-2 m-2 rounded-lg grayscale hover:grayscale-0 cursor-pointer text-[12px] border-purple-400
                            ${selectedCategory==index
                            ?'grayscale-0 border-[1px]'
                            :null}`}

                        onClick={()=>{
                            setSelectedCategory(index);
                            onSosTypeChange(item.sosTypeId)}
                        }>
                            <Image src={item?.photo}
                                alt={item.name}
                                width={40}
                                height={40}
                            />
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex overflow-scroll overflow-x-auto gap-2 scrollbar-hide scroll-smooth md:hidden'>
                {sosTypes?.map((item,index)=>(
                    <div 
                        key={index} 
                        className={`w-[95px] flex-shrink-0 text-center justify-center items-center bg-gray-100 p-2 m-2 rounded-lg grayscale hover:grayscale-0 cursor-pointer text-[12px] border-purple-400
                        ${selectedCategory==index
                        ?'grayscale-0 border-[1px]'
                        :null}`}

                    onClick={()=>{
                        setSelectedCategory(index);
                        onSosTypeChange(item.value)}
                    }>
                        <Image src={item?.photo}
                            alt={item.name}
                            width={80}
                            height={80}
                            className='rounded-lg object-cover p-2'
                        />
                        {item.name}
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default SOSTypeList