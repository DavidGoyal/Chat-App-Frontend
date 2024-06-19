import moment from "moment";

export const fileFormat=(url="")=>{
    const fileExtension=url.split(".").pop();

    if(fileExtension==="mp4"||fileExtension==="ogg"||fileExtension==="webm") return "video";

    if(fileExtension==="mp3"||fileExtension==="wav") return "audio";

    if(fileExtension==="png"||fileExtension==="jpg"||fileExtension==="jpeg"||fileExtension==="gif") return "image";

    return "file";
}

export const transformImage=(url="",width=100)=>{
    if(url.includes("cloudinary")){
        const newUrl=url.replace("upload/",`upload/dpr_auto/w_${width}/`);
        return newUrl;
    }
    return url;
};

export const getLast7days=()=>{
    const currentDate=moment();
    const last7days=[];
    for(let i=0;i<7;i++){
        const dayDate=currentDate.clone().subtract(i,"days").format("dddd")
        last7days.unshift(dayDate);
    }
    return last7days;
}


export const getOrSaveNewMessagesAlert=({key,value,get})=>{
    if(get){
        const saved=localStorage.getItem(key);
        if(saved){
            return JSON.parse(saved);
        }
        else{
            return null;
        }
    }
    else{
        localStorage.setItem(key, JSON.stringify(value));
    }
}
