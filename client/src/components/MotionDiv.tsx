import React, {ReactNode , HTMLProps} from 'react'
import { motion } from 'framer-motion'

interface MotionDivProps extends HTMLProps<HTMLDivElement> {
    children : ReactNode
}

const MotionDiv: React.FC<MotionDivProps> = ({ children, ...rest }) => {
    return (
        <motion.div
            {...rest}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', bounce: '0.5' }}
        >
            {children}

        </motion.div>
    )
}

export default MotionDiv
