import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const num = ref(0);
    const addNum = () => {
      num.value += 2;
    };
    return () => (
      <>
        <div class="container-preview">
          <p>Container Form</p>
          <div>
            <span>新增：{num.value}</span>
            <button class="btn" onClick={addNum}>
              按钮
            </button>
          </div>
        </div>
      </>
    );
  },
});
