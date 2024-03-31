import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from "../storage/storage";
import { I18nManager } from "react-native";
import countReducer from "../reducers/countReducer";
import { useSelector } from 'react-redux';
import {store} from "../../store/store";


export const getSelectedLang = ()=> {
    const count = useSelector((store) => store.count.count);
    return count.general.lng;
}



export const rotem = () => {
    return "Good!";
}

export const setRowType = (appLng) => {
	let style = "";
	if(I18nManager.isRTL == false && appLng == "en"){
		style = "row";
	}else if(I18nManager.isRTL == false && appLng == "he"){
		style = "row-reverse";
	}else if(I18nManager.isRTL == true && appLng == "he"){
		style = "row";
	}else if(I18nManager.isRTL == true && appLng == "en"){
		style = "row-reverse";
	}
	return style;
}

export const setTextDirection = (appLng) => {
	let style = "";
	if(I18nManager.isRTL == false && appLng == "en"){
		style = "left";
	}else if(I18nManager.isRTL == false && appLng == "he"){
		style = "right";
	}else if(I18nManager.isRTL == true && appLng == "he"){
		style = "left";
	}else if(I18nManager.isRTL == true && appLng == "en"){
		style = "right";
	}
	return style;
}


export const nice_list_text = (list) => {
	let lng = "he";
    let plus_charcter = lng == "he" ? " ו" : " & "
    if(list != undefined){
        let text = "";
        if(Object.keys(list).length == 1){
            text = list[Object.keys(list)[0]].name;
        }
        else if(Object.keys(list).length == 2){
            text = list[Object.keys(list)[0]].name + plus_charcter + list[Object.keys(list)[1]].name
        }
        else{
            for (let index = 0; index < Object.keys(list).length; index++) {
                if(index == Object.keys(list).length-2){
                    text += list[Object.keys(list)[index]].name+plus_charcter;
                }else if(index == Object.keys(list).length-1){
                    text += list[Object.keys(list)[index]].name;
                }
                else{
                    text += list[Object.keys(list)[index]].name+", ";
                }
            }
        }
        return text;
    }
}


export const setArray = (values) => {
    let array = [];
    if(values != undefined){
        Object.keys(values).forEach((element) => {
            array.push(values[element]);
        });
    }
    return array;
}


export const getDateFormat = (value, type) => {
    let date = "";
    switch (type) {
        case 1:
            date = moment(value, "YYYY-MM-DD").format("DD/MM/YYYY");
            break;

        case 2:
            date = moment(value, "YYYY-MM-DD").format("DD");
            break;

        case 3:
            date = moment(value, "YYYY-MM-DD").format("MM/YYYY");
            break;

        case 4:
            date = moment(value, "YYYY-MM-DD").format("DD/MM");
            break;
    }
    return date;
}



export const getMyObject = () => {
    storage
    .load({
      key: 'latinApp',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {},
        someFlag: true
      }
    })
    .then(ret => {
        
      return ret;
    })
    .catch(err => {
      return false;
      switch (err.name) {
        case 'NotFoundError':
          break;
        case 'ExpiredError':
          break;
      }
    });
  }


export const setObjectValue = (value) => {
    storage.save({
        key: 'latinApp', // Note: Do not use underscore("_") in key!
        data: value,
      
        // if expires not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        expires: 1000 * 3600
      });
  }

