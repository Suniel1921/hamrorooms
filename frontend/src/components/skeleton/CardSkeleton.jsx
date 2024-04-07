import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = () => {
  return (
    <>
    <SkeletonTheme>        
      <div className='chilCard'>
      <Skeleton width={300} height={300} />
      <h3><Skeleton width={300} /></h3>
      <p><Skeleton width={150} /></p>
      <p><Skeleton width={150} /></p>
    </div>
    </SkeletonTheme>
    </>
  )
}

export default CardSkeleton