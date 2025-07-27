import { auth } from "@clerk/nextjs/server";

const adminIds = [
    "user_2pvuIHXt8zB05P3ylrorDxLl6Kx",
];

export const getIsAdmin = async () => {
    const { userId } = await  auth();
    
    if(!userId){
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
};