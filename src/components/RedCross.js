import { Box } from '@material-ui/core'
import React from 'react'

export default function RedCross() {
    return (
        <>
            <Box
                sx={{
                    transform: 'rotate(-45deg)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#E94242',
                    border: '1px solid #656565',
                    borderRadius: '50%',
                    color: '#FFFFFF',
                    fontSize: '21px',
                    width: '35px',
                    height: '35px',
                    cursor: 'pointer',
                }}
            >+</Box>
        </>
    )
}
