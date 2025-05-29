import en from "./locales/en";
import zh from "./locales/zh";

export default defineI18nConfig(() => ({
    legacy: false,
    messages: {en,zh}
}))