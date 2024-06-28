import { defineComponent } from "vue";
import Counter from "./Counter";

export default defineComponent({
  name: "Show",
  setup(props,{ slots }){
    return () => (
      <div>
        <h1>Hello</h1>
        <hr/>
        <strong>World</strong>
        {slots.default()}
      </div>
    );
  }
});
