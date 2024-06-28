import { defineComponent, ref } from "vue";
import UMDCom from "./UMDCom";

export default defineComponent({
  name: "App",
  setup() {
    const msg = ref("111111");
    return () => (
      <>
        <UMDCom
          url="./output/out.counter.umd.js"
          name="counter"
          msg="11xxx11"
        ></UMDCom>
         <UMDCom
          url="./output/out.counter.umd.js"
          name="counter"
          msg="11xxx11"
        ></UMDCom>

        <UMDCom url="./output/out.show.umd.js" name="show" style={{ color: "red" }}>
          <span>插槽内容</span>
        </UMDCom>

        <UMDCom url="./output/out.editor.umd.js" name="editor" v-model={msg.value}/>
      </>
    );
  },
});
