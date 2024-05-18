import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from "../storage/storage";
import { I18nManager, StatusBar, Dimensions} from "react-native";
import { useSelector } from 'react-redux';




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


export const getImageUrl = (uri) => {
    let result = uri.includes("/sites/default/files/tools/") ? "https://latinet.co.il/"+uri : uri.replace("public://", "https://latinet.co.il/sites/default/files/");
    return result;
}


export const getPlayingHeight = () => {
    const {width, height} = Dimensions.get('screen');
    const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24; 
    let windowH = Dimensions.get('window').height;
    return height-110-(height-windowH-STATUS_BAR_HEIGHT)-STATUS_BAR_HEIGHT;
}



export const nice_list_text = (list, taxonomy, lng) => {
    let text = "Bug!";
    if(list != null){
        text = "";
        list = list.split(",");
        let plus_charcter = lng == "he" ? " ו" : " & ";
        if(Object.keys(list).length == 1){
            text += taxonomy[list[0]][lng];
        }
        else if(Object.keys(list).length == 2){
            text += taxonomy[list[0]][lng] + plus_charcter + taxonomy[list[1]][lng];
        }
        else{
            for (let index = 0; index < Object.keys(list).length; index++) {
                if(index == Object.keys(list).length-2){
                    text += taxonomy[list[index]][lng]+plus_charcter;
                }else if(index == Object.keys(list).length-1){
                    text += taxonomy[list[index]][lng];
                }
                else{
                    text += taxonomy[list[index]][lng]+", ";
                }
            }
        }
    }
    return text;
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


export const filterDataItem = (item, eventsSelectedFilters) => {
    let filtersAmount = Object.keys(eventsSelectedFilters).length;
    if(Object.keys(eventsSelectedFilters).length > 0){
        Object.keys(eventsSelectedFilters).forEach(filterKey => {
            if(eventsSelectedFilters[filterKey].length > 0){
                eventsSelectedFilters[filterKey].forEach(filterTagKey => {
                    if(item[filterKey].split(",").includes(filterTagKey)){
                        filtersAmount--;
                        return true;
                    }
                });
            }else{
                filtersAmount--;
            }
        });
    }
    return filtersAmount === 0;
}



export const getTranslationString = (string, lng) => {
    let translations = {
        "Calender":"חודשי",
        "List": "רשימה",
        "Lines": "ליינים",
        "Events": "אירועים",
    };
    let result = string;
    if(lng != "en" && translations[string] != undefined){
        result = translations[string];
    }
    return result;
}


export const getTranslationMonth = (index) => {
    let translations = [
        "ינואר",
        "פברואר",
        "מרץ",
        "אפריל",
        "מאי",
        "יוני",
        "יולי",
        "אוגוסט",
        "ספטמבר",
        "אוקטובר",
        "נובמבר",
        "דצמבר",
    ];
    return translations[index] != undefined ? translations[index] : index;
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

