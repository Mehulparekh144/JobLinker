import { Card, Skeleton } from '@nextui-org/react'
import React from 'react'


const SkeletonLoader = () => {
    return (
        <Card className="w-full md:w-[32.5%] p-6 space-y-5 ">
            <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-second"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-second"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-main"></div>
                </Skeleton>
            </div>
        </Card>
    )
}

export default SkeletonLoader
