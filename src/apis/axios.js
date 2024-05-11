import axiosInstance from "./axiosInstance";

//http method담은 함수명은 http method와 유사하게 가져감, id가 포함된 메소드는 detail키워드 붙임
export const getCommunity = async () => {
  try {
    const response = await axiosInstance.get("/community");
    return response;
  } catch (error) {
    console.error("커뮤니티 불러오기 실패 : ", error);
  }
};

export const getCommunityDetail = async (id) => {
  try {
    const response = await axiosInstance.get(`/community/${id}`);
    return response;
  } catch (error) {
    console.error("커뮤니티 상세 불러오기 실패 : ", error);
  }
};

export const postCommunity = async (data) => {
  try {
    const response = await axiosInstance.post("/community", data);
    return response;
  } catch (error) {
    console.error("커뮤니티 작성 저장 실패 : ", error);
  }
};

export const deleteCommunityDetail = async (id, password) => {
  try {
    const response = await axiosInstance.delete(`/community/${id}`, {
      data: { password: password },
    });
    return response;
  } catch (error) {
    console.error("커뮤니티 상세 삭제 실패 : ", error);
  }
};

//공지사항 불러오기
export const getNoticeList = async () => {
  try {
    const response = await axiosInstance.get("/notice");
    return response;
  } catch (error) {
    console
    .error("리스트 불러오기 실패 : ", error);
  }
};

export const getLostList = async()=>{
  try{
    const response = await axiosInstance.get("/find");
    return response;
  }catch(error){
    console.error("리스트 불러오기 실패 :",error);
  }
};


export const addReservation = async(data)=>{
  try{
    const response = await axiosInstance.post("/reservation",data);
    return response;
  }catch(error){
    console.error("리스트 불러오기 실패 :",error);
  }
};


