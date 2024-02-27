// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Platform } from 'react-native';
// import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
// import { globalStyles } from '../shared/globalStyles';
// import { RawVariableType } from '../shared/types/SessionType';
// import {format, set} from 'date-fns';
// import {fr} from 'date-fns/locale';
// import RNDateTimePicker from '@react-native-community/datetimepicker';

// type ResponseDateType = {
// //   onDateChange: (date: Date) => void;
//   varDate: RawVariableType;
//   onRawVariablesChange: (rawVariables: RawVariableType) => void; 
// //   toLocaleDateString: (date: Date) => string;

// }

// const GetValueDate: React.FC<ResponseDateType> = ({ varDate, onRawVariablesChange}) => {
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

//   const [response, setResponse] = useState<RawVariableType>({
//       _id: varDate._id,
//       label: varDate.label,
//       value: new Date(),
//       type: varDate.type,
//     });
    
//     useEffect(() => {
//         console.log(response, 'response')
//         onRawVariablesChange(response);
//       }, [response]);
    

//     useEffect(() => {
//         handleDateChange;
//         console.log(selectedDate, 'selectedDate afteruse')
//     }
//     , [selectedDate]);
//     const handleDateChange = (_event: DateTimePickerEvent, date?: Date) => {
//         if (Platform.OS === 'android') {
//             setShowDatePicker(false);
//         }
//         if (date) {
//             let selectedDateCopy = { ...selectedDate };
//             console.log(selectedDateCopy, 'selectedDateCopy')
//             const selectedDateUpdate = new Date(date) as Date;
//             selectedDateCopy = selectedDateUpdate;
//             setSelectedDate(selectedDateUpdate);
//             setResponse(prev => ({ ...prev, value: selectedDateUpdate }));
            
//         }
//     };
    
//   const showDatepicker = () => {
//     setShowDatePicker(true);
//   };

//   return (
//     <View>
        

//       <View >
//             <Text style={globalStyles.textLight}>Sélectionnez une date ..</Text>
//         <TouchableOpacity style={globalStyles.input} onPress={showDatepicker}>
//             <Text style={globalStyles.textLight}>
//                 {/* {format(selectedDate, 'PP', {locale: fr})}
//                  */}
//                  {selectedDate.toLocaleDateString('fr-Fr')}
//             </Text>
//         </TouchableOpacity>

//         {showDatePicker && (
//           <RNDateTimePicker
//             //  value={response.value?.toLocaleString() ? response.value.toLocaleString() : new Date().toLocaleString() } 
//              value = {selectedDate}
//             mode="date"
//             display="spinner"
//             onChange={handleDateChange}
//           />
//         )}
//         </View>
        
//     </View>
//   );
// };

// export default GetValueDate;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { globalStyles } from '../shared/globalStyles';
import { RawVariableType } from '../shared/types/SessionType';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import RNDateTimePicker from '@react-native-community/datetimepicker';

type ResponseDateType = {
  varDate: RawVariableType;
  onRawVariablesChange: (rawVariables: RawVariableType) => void; 
}

const GetValueDate: React.FC<ResponseDateType> = ({ varDate, onRawVariablesChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    onRawVariablesChange({
      _id: varDate._id,
      label: varDate.label,
      value: selectedDate,
      type: varDate.type,
    });
  }, [selectedDate]);

  const handleDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };
  
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      <View>
        <Text style={globalStyles.textLight}>Sélectionnez une date ..</Text>
        <TouchableOpacity style={globalStyles.input} onPress={showDatepicker}>
          <Text style={globalStyles.textLight}>
            {format(selectedDate, 'PP', { locale: fr })}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <RNDateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
        )}
      </View>
    </View>
  );
};

export default GetValueDate;
