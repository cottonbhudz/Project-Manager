import React from 'react'

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    name: string;
}

const Modal = ({
    children,
    isOpen,
    onClose,
    name
}: Props) => {
    if (!isOpen) return null;
    return ReactDom.createPortal(
        <div className='fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4'>
            
        </div>
    );
}

export default Modal