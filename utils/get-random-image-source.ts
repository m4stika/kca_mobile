// import {
//   unsplash1,
//   unsplash2,
//   unsplash3,
//   unsplash4,
//   unsplash5,
//   unsplash6,
//   unsplash7,
//   unsplash8,
//   unsplash9,
// } from "@/assets/images";
// import { ImageSourcePropType } from "react-native";
//
// const noOfPic = 9;
// const imgMap: Record<number, ImageSourcePropType> = {
//   0: unsplash1,
//   1: unsplash2,
//   2: unsplash3,
//   3: unsplash4,
//   4: unsplash5,
//   5: unsplash6,
//   6: unsplash7,
//   7: unsplash8,
//   8: unsplash9,
// };
//
// export const getRandomImageSource = (index?: number) => {
//   const random = Math.floor(Math.random() * Math.floor(noOfPic));
//   // return require(`./images/${imgMap[random]}`);
//   return imgMap[index ? index : random];
// };
