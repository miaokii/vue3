import { type ComponentType } from "@/enums/type";
import { type Component } from "vue";
import { fieldTypeConfig } from "@/enums/preObjectManage";
import Filed from "./filed.vue";
import FiledCard from "./filedIdcard.vue";
import Upload from "./filedUpload.vue";
import FileUpload from "./filedUploadFile.vue";
import Address from "./fileAddress.vue";
import Select from "./fileSelect.vue";
import Date from "./fileDateCom.vue";
import Time from "./fileTimeCom.vue";
import Radio from "./filedRadio.vue";
import CheckBox from "./filedCheck.vue";
export const includeKey = [
  fieldTypeConfig.singleLineText,
  fieldTypeConfig.multilineText,
  fieldTypeConfig.phone,
  fieldTypeConfig.money,
  fieldTypeConfig.creditCode,
  fieldTypeConfig.number,
  fieldTypeConfig.percentage,
  fieldTypeConfig.idCard,
  fieldTypeConfig.select,
  fieldTypeConfig.address,
  fieldTypeConfig.picture,
  fieldTypeConfig.enclosure,
  fieldTypeConfig.date1,
  fieldTypeConfig.date3,
  fieldTypeConfig.radio,
  fieldTypeConfig.checkbox,
  fieldTypeConfig.serial,
];
export const uploadType = [
  fieldTypeConfig.picture,
  fieldTypeConfig.enclosure,
  fieldTypeConfig.date1,
  fieldTypeConfig.date3,
  fieldTypeConfig.checkbox,
];
const componentMap = new Map<ComponentType, Component>();
[
  fieldTypeConfig.singleLineText,
  fieldTypeConfig.multilineText,
  fieldTypeConfig.phone,
  fieldTypeConfig.money,
  fieldTypeConfig.creditCode,
  fieldTypeConfig.number,
  fieldTypeConfig.percentage,
  fieldTypeConfig.serial,
].forEach((type: ComponentType | string) => {
  componentMap.set(type as ComponentType, Filed);
});
componentMap.set(fieldTypeConfig.idCard, FiledCard);
componentMap.set(fieldTypeConfig.select, Select);
componentMap.set(fieldTypeConfig.address, Address);
componentMap.set(fieldTypeConfig.picture, Upload);
componentMap.set(fieldTypeConfig.enclosure, FileUpload);
componentMap.set(fieldTypeConfig.date1, Date);
componentMap.set(fieldTypeConfig.date3, Time);
componentMap.set(fieldTypeConfig.radio, Radio);
componentMap.set(fieldTypeConfig.checkbox, CheckBox);

export default componentMap;
