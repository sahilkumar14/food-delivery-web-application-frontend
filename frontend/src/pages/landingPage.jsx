import React from 'react'
import Section01 from '../components/landingPageComponents/section01'
import Section02 from '../components/landingPageComponents/Section02'

const LandingPage = () => {
  return (
      <div className='flex flex-col w-full overflow-x-hidden'>
        <Section01 />
        <Section02 />
      </div>
  )
}

export default LandingPage