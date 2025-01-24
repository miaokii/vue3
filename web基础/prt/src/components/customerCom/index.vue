<script lang="tsx">
import { upperFirst } from "lodash-es";
import { defineComponent } from "vue";
import { isNull } from "@/utils/is";
import { uploadType } from "@/components/rxkForm/components/index";
import componentMap from "../rxkForm/components/index";
export default defineComponent({
  props: {
    schema: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: [String, Array],
    },
  },
  setup(props, { emit, attrs }) {
    function renderComponent() {
      const {
        code,
        name,
        changeEvent = `update:value`,
        valueField,
      } = props.schema;
      const isCheck = code && ["Switch", "Checkbox"].includes(code);
      const eventKey = `on${upperFirst(changeEvent)}`;
      const on = {
        [eventKey]: (...args: Record<string, any>[]) => {
          const [e] = args;
          if (propsData[eventKey]) {
            propsData[eventKey](...args);
          }
          const target = e ? e.target : null;
          const value = target ? (isCheck ? target.checked : target.value) : e;
          emit(changeEvent, value);
        },
      };
      const propsData: Record<string, any> = {
        label: name,
        labelAlign: attrs.labelAlign ? attrs.labelAlign : "top",
        inputAlign: attrs.labelAlign === "left" ? "right" : "left",
        ...attrs,
      };

      const Comp = componentMap.get(code) as ReturnType<typeof defineComponent>;

      const bindValue: Record<string, any> = {
        [valueField || (isCheck ? "checked" : "value")]: isNull(props.value)
          ? uploadType.includes(code)
            ? []
            : ""
          : props.value,
      };
      const compAttr: Record<string, any> = {
        ...on,
        ...propsData,
        ...bindValue,
      };

      // 【客户名称】字段禁止输入空格(固定型应用、预定义应用)
      const _fieldCode = props?.schema?.fieldCode;
      if (_fieldCode === "realName" || _fieldCode.startsWith("customerName_")) {
        compAttr.notSpaces = true;
      }

      return <Comp {...compAttr} />;
    }

    return () => {
      return renderComponent();
    };
  },
});
</script>
