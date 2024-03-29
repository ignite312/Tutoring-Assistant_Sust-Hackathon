import React from "react";
import Link from 'next/link';
import { CiCirclePlus } from "react-icons/ci";

export default function ClassRoom() {
    return (
        <div className="bg-white text-black flex flex-col h-screen">
            <div className="flex justify-end p-4">
                <div>
                    <Link href="/classroom/uploadMaterials">
                        <div className="btn btn-outline text-black">
                            <CiCirclePlus style={{ fontSize: '2em' }} />
                            Upload Materials
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex justify-center items-center flex-col"> {/* Center the content */}
                <h1 className="title" style={{ fontSize: '2.5rem' }}>Materials</h1>
            </div> 
            <div className="flex justify-center">
                <div className="w-1/2">
                    <ul className="materials-list space-y-4">
                        <li>
                            <div className="bg-gray-100 p-4 rounded-md shadow-md">
                                <p className="text-sm text-gray-600">ID: 1</p>
                                <p className="font-bold text-lg">Question Bank for Physics</p>
                                <p className="text-sm">Type: PDF</p>
                            </div>
                        </li>
                        <li>
                            <div className="bg-gray-100 p-4 rounded-md shadow-md">
                                <p className="text-sm text-gray-600">ID: 2</p>
                                <p className="font-bold text-lg">Math Solution</p>
                                <p className="text-sm">Type: Image</p>
                            </div>
                        </li>
                        <li>
                            <div className="bg-gray-100 p-4 rounded-md shadow-md">
                                <p className="text-sm text-gray-600">ID: 3</p>
                                <p className="font-bold text-lg">Physics Text Book</p>
                                <p className="text-sm">Type: PDF</p>
                            </div>
                        </li>
                        {/* Add more material cards here */}
                    </ul>
                </div>
            </div>
        </div>
    );
}
