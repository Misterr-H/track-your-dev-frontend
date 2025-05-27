import { axiosInstance } from "./axiosInstance";

// response from api: {
//     "success": true,
//     "message": "Successfully joined the waitlist",
//     "data": {
//         "email": "hs913271@gmail.comm",
//         "_id": "683194e12217f46374b4e848",
//         "joinedAt": "2025-05-24T09:44:01.152Z",
//         "__v": 0
//     }
// }

export const joinWaitListApi = async (email: string) => {
  const response = await axiosInstance.post<{
    success: boolean;
    message: string;
    data: {
      email: string;
      _id: string;
      joinedAt: string;
      __v: number;
    };
  }>("/api/waitlist", { email });
  return response.data;
};