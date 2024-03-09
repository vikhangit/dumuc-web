'use client'

import slugify from 'slugify'

function CustomHeaderRenderer({ data }) {
    const slug = slugify(data?.text)

    if (data?.level === 1) {
        return (
            <h2 id={`${slug}_${data?.level}`} className='font-bold text-2xl text-[#c80000] my-2'>
                <div dangerouslySetInnerHTML={{__html: data.text}}/>
            </h2>
        )
    } else if (data?.level === 2) {
        return (
            <h3 id={`${slug}_${data?.level}`} className='font-semibold text-lg text-[#c80000] my-1'>
                <div dangerouslySetInnerHTML={{__html: data.text}}/>
            </h3>
        )
    } else if (data?.level === 3) {
        return (
            <h4 id={`${slug}_${data?.level}`} className='font-medium text-lg'>
                <div dangerouslySetInnerHTML={{__html: data.text}}/>
            </h4>
        )
    } else {
        return (
            <h5 id={`${slug}_${data?.level}`} className='font-medium text-lg'>
                <div dangerouslySetInnerHTML={{__html: data.text}}/>
            </h5>
        )
    }
}

export default CustomHeaderRenderer

