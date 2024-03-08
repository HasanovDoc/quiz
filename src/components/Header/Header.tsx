import { DragEvent, useEffect, useRef, useState } from 'react'
import './Header.css'

interface Position {
    y: number;
}

export default function Header() {
    const [position, setPosition] = useState<Position>({ y: 0 });
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (headerRef.current) {
        setPosition({ y: headerRef.current.offsetTop });
        }
    }, []);

    const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text/plain', event.currentTarget.id);
    };

    const dragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setPosition({ y: event.pageY });
    };

    return (
        <div className='HeaderContainer'>
            <div id="draggableHeader" className="HeaderWrapper" draggable="true"
            onDragStart={dragStart}
            onDragOver={dragOver}
            // style={{position: 'absolute', top: position.y}}
            style={{position: 'absolute', transform: `translateY(${position.y}px)`}}
            ></div>
            <h1 className='LoveTips'>Люблю тебя</h1>
        </div> 
    )
}