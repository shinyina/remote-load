import { defineComponent } from "vue";
import { MdEditor } from 'md-editor-v3';
import "md-editor-v3/lib/style.css";

export default defineComponent({
  name: "Editor",
  setup(){
    return ()=><MdEditor />
  }
})