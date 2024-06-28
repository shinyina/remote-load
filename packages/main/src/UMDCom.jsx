import { defineComponent, h, onMounted, onUnmounted, reactive, ref } from "vue";
import { componentLoader } from "./componentLoader";

export default defineComponent({
  name: "UMDCom",
  props: {
    url: {
      type: String,
      required: true,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    const Com = ref(null);

    const loadComponent = () => {
      componentLoader(props.url, props.name).then((res) => {
        Com.value = res;
      });
    };

    onMounted(loadComponent);

    return () =>
      Com.value ? (
        <Com.value >
          {slots.default ? slots.default() : null}
        </Com.value>
      ) : null;
  },
});
