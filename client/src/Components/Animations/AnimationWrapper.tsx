import React from 'react'
import HitmanDeathAnimation from './HitmanDeathAnimation'
import TargetDeathAnimation from './TargetDeathAnimation'

function AnimationWrapper() {
    return (
        <>
            <TargetDeathAnimation />
            <HitmanDeathAnimation />
        </>
    )
}

export default AnimationWrapper