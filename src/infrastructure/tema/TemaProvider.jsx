import  { useState } from 'react';
import TemaContext from './TemaContext';

function TemaProvider({ children }) {
    const [tema, setTema] = useState('slate'); //green, purple, slate, red, blue, yellow

    return (
        <TemaContext.Provider value={{ tema, setTema }}>
            {children}
        </TemaContext.Provider>
    );

}

export default TemaProvider;