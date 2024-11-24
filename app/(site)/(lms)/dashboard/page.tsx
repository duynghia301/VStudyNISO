'use client'

import { ModeToggle } from "@/components/themebutton";
import { UserButton } from "@clerk/nextjs";

const Dashboard = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between mb-4">
                <UserButton />
                <ModeToggle />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 40 }, (_, i) => (
                    <div key={i} className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2">Card {i + 1}</h3>
                        <p className="text-gray-700">This is card number {i + 1}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
