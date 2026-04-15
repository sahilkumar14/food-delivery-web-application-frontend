import React from 'react'
import Section01 from '../components/landingPageComponents/Section01'
import Section02 from '../components/landingPageComponents/Section02'
import Section03 from '../components/landingPageComponents/Section03'

const LandingPage = () => {
  return (
      <div className='flex flex-col w-full overflow-x-hidden'>
        <Section01 />
        <Section02 />
        <Section03 />
      </div>
  )
}

export default LandingPage