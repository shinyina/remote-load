import { defineComponent, ref, computed, reactive } from "vue";

export default defineComponent({
  name: "Counter",
  props: {
    msg: {
      type: String,
      default: "Hello",
    },
  },
  setup(props) {
    const msg = reactive(props.msg);
    const count = ref(0);
    const doubledCount = computed(() => count.value * 2);

    const increment = () => {
      count.value++;
    };
    // 直接在setup中返回渲染函数
    return () => (
      <>
        <h4>{msg}</h4>
        <div>
          <p>Count: {count.value}</p>
          <p>Doubled Count: {doubledCount.value}</p>
          <button onClick={increment}>Increment</button>
        </div>
      </>
    );
  },
});
