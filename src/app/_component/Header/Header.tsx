import React from 'react'

export default function Header({firstWord,secondWord}:{firstWord:string , secondWord:string}) {
  return (
    <>
    <h2 className='mb-4 text-[30px] font-bold leading[36px] text-[#21313c] relative after:h-8 after:w-1.5 after:bg-linear-180 ms-[18px] after:from-[#00BC7D] after:to-[#007A55] after:absolute after:top-[50%] after:translate-y-[-50%] after:left-[-18px] after:rounded-lg'>{firstWord} <span className="text-[#009966]">{secondWord}</span></h2>
    
    </>
  )
}
