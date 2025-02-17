"use client"
import React, { useState } from 'react'
import { HiArrowUpCircle } from "react-icons/hi2";

function UploadImage({ setFile }) {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className='h-[450px] bg-[#e9e9e9] rounded-lg'>
            <label className='m-5 flex flex-col justify-center items-center cursor-pointer h-[90%] 
                border-[2px] border-gray-300 border-dashed rounded-lg text-gray-600'>
                {!preview ? (
                    <div className='flex items-center flex-col'>
                        <HiArrowUpCircle className='text-[22px]' />
                        <h2 className='font-semibold'>Click to Upload</h2>
                    </div>
                ) : (
                    <img src={preview} alt='selected-image' className='object-contain h-[90%]' />
                )}
                <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
        </div>
    );
}

export default UploadImage;
