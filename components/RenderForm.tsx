// import React, { useState } from 'react';
// import { View, Text } from 'react-native';
// import ResponseText from './GetValueText';
// // import ResponseTextArea from './GetValueTextArea';
// // import ResponseNumber from './GetValueNumber';
// // import ResponseBoolean from './GetValueBoolean';
// // import ResponseDate from './GetValueDate';
// // import ResponseTime from './GetValueTime';
// // import ResponseDateTime from './GetValueDateTime';
// // import ResponseDateRange from './GetValueDateRange';
// import {globalStyles} from "../shared/globalStyles";

// type ItemType = {
//     _id: string;
//   type: string;
//   label: string;
//   min_length: number;
//   max_length: number;
//   question: string;
//   mandatory: boolean;
  
// };

// type RenderFormType = {
//   item: ItemType;
// };

// const RenderForm: React.FC<RenderFormType> = ({ item }) => {
//   const [inputValueText, setInputValueText] = React.useState("");
  
//   const handleChangeValue = (text: string) => {
//     setInputValueText(text);
//   }

//   console.log(item.type, ' type');
//   console.log(item, ' item');

//   if (item.type === 'text') {
//     return (
//       <View>
//         <ResponseText varText={item} />
//         <ResponseText getValue={handleChangeValue} varText={item} />
//         <Text> value in parent: {inputValueText} </Text>
//       </View>
//     );
// //   } else if (item.type === 'textarea') {
// //     return (
// //       <ResponseTextArea varTextArea={item} />
// //     );
// //   } else if (item.type === 'number') {
// //     return (
// //       <ResponseNumber varNumber={item} />
// //     );
// //   } else if (item.type === 'boolean') {
// //     return (
// //       <ResponseBoolean varBoolean={item} />
// //     );
// //   } else if (item.type === 'date') {
// //     return (
// //       <ResponseDate varDate={item} />
// //     );
// //   } else if (item.type === 'time') {
// //     return (
// //       <ResponseTime varTime={item} />
// //     );
// //   } else if (item.type === 'dateTime') {
// //     return (
// //       <ResponseDateTime varDateTime={item} />
// //     );
// //   } else if (item.type === 'dateRange') {
// //     return (
// //       <ResponseDateRange varDateRange={item} />
// //     );
//   } else {
//     return null;
//   }
// }

// export default RenderForm;
