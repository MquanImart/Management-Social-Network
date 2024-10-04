import { Box} from "@mui/material";
import { MyPhoto } from "../../../../../interface/interface";
import CollectionCard from "../../../../../shared/components/collection-card/CollectionCard";

const ProfileCollection = () => {
  const dataTestImg: MyPhoto[] = [
    {
      _id: "img1",
      name: "Avatar 1",
      idAuthor: "author1",
      type: "img",
      link: "/src/assets/images/avt.png",
      createdAt: new Date("2024-09-20T10:00:00Z"),
      updatedAt: new Date("2024-09-26T12:00:00Z"),
    },
    {
      _id: "img2",
      name: "Avatar 2",
      idAuthor: "author1",
      type: "img",
      link: "/src/assets/images/avt.png",
      createdAt: new Date("2024-09-21T10:00:00Z"),
      updatedAt: new Date("2024-09-26T12:05:00Z"),
    },
    {
      _id: "img3",
      name: "Background Login",
      idAuthor: "author2",
      type: "img",
      link: "/src/assets/images/background-login.png",
      createdAt: new Date("2024-09-22T10:00:00Z"),
      updatedAt: new Date("2024-09-26T12:10:00Z"),
    },
    {
      _id: "img4",
      name: "Test Image",
      idAuthor: "author3",
      type: "img",
      link: "/src/assets/images/test.png",
      createdAt: new Date("2024-09-23T10:00:00Z"),
      updatedAt: new Date("2024-09-26T12:15:00Z"),
    },
    {
      _id: "img5",
      name: "Avatar 5",
      idAuthor: "author4",
      type: "img",
      link: "/src/assets/images/avt.png",
      createdAt: new Date("2024-09-24T10:00:00Z"),
      updatedAt: new Date("2024-09-26T12:20:00Z"),
    }
    // Thêm nhiều đối tượng `img` tương tự như trên
  ];
  
  const dataTestVideo: MyPhoto[] = [
    {
      _id: "video1",
      name: "Test Video 1",
      idAuthor: "author5",
      type: "video",
      link: "/src/assets/video-test/TestVideo.mp4",
      createdAt: new Date("2024-09-20T10:00:00Z"),
      updatedAt: new Date("2024-09-26T12:30:00Z"),
    },
    {
      _id: "video2",
      name: "Test Video 2",
      idAuthor: "author6",
      type: "video",
      link: "/src/assets/video-test/TestVideo.mp4",
      createdAt: new Date("2024-09-21T10:00:00Z"),
      updatedAt: new Date("2024-09-26T12:35:00Z"),
    },
    {
      _id: "video3",
      name: "Test Video 3",
      idAuthor: "author7",
      type: "video",
      link: "/src/assets/video-test/TestVideo.mp4",
      createdAt: new Date("2024-09-22T10:00:00Z"),
      updatedAt: new Date("2024-09-26T12:40:00Z"),
    },
    {
      _id: "video4",
      name: "Test Video 4",
      idAuthor: "author8",
      type: "video",
      link: "/src/assets/video-test/TestVideo.mp4",
      createdAt: new Date("2024-09-23T10:00:00Z"),
      updatedAt: new Date("2024-09-26T12:45:00Z"),
    },
    {
      _id: "video5",
      name: "Test Video 5",
      idAuthor: "author9",
      type: "video",
      link: "/src/assets/video-test/TestVideo.mp4",
      createdAt: new Date("2024-09-24T10:00:00Z"),
      updatedAt: new Date("2024-09-26T12:50:00Z"),
    }
    // Thêm nhiều đối tượng `video` tương tự như trên
  ];    
  
  return (
    <Box sx={{
      backgroundColor: '#e9e9e9',
      padding: '20px'
    }}>
      <CollectionCard title={"Ảnh"} data={dataTestImg} id={'collection-image'} type={"img"}/>
      <CollectionCard title={"Video"} data={dataTestVideo} id={'collection-video'} type={"video"}/>
    </Box>
  );
};

export default ProfileCollection;
