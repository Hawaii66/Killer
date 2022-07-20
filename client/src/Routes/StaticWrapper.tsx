import React, { useState } from 'react'
import { DebugStatic, IStaticContext, LocalStatic, ProdStatic, StaticContext } from '../Contexts/StaticContext';

interface Props 
{
    children:React.ReactNode
}

function StaticWrapper({children}:Props) {
    const mode = process.env.REACT_APP_MODE;
    const [context, _] = useState<IStaticContext>(mode === "Local" ? LocalStatic : mode === "Debug" ? DebugStatic : ProdStatic);

    return (
        <StaticContext.Provider value={context}>
            {children}
        </StaticContext.Provider>
    )
}

export default StaticWrapper