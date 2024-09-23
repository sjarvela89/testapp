import { ImageSourcePropType } from "react-native";

interface AuthorInfo {
    name: string;
    title: string;
    subtitle1: string;
    subtitle2: string;
    email: string;
    skills: string;
    linkedInUrl: string;
    profileImage: ImageSourcePropType;
  }
  
  const authorInfo: AuthorInfo = {
    name: "Sakari Järvelä",
    title: "Software Designer",
    subtitle1: "Master of Science",
    subtitle2: "Software Development Engineer",
    email: "sjarvela89@hotmail.com",
    skills: "React Native, React.js, TypeScript, JavaScript, C#, C++, C, SQL, Android, Angular, Windows, Linux, CSS, HTML",
    linkedInUrl: 'https://www.linkedin.com/in/sakari-j%C3%A4rvel%C3%A4-7b649254/',
    profileImage: require('../resources/profile.jpg'),
  };
  
  export default authorInfo;