import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return () => (
      <>
        <div class="wrapper">
          <div class="widget red">
            <div>R</div>
            <div class="bar">
              <div class="indicator"></div>
            </div>
            <div class="value"></div>
          </div>

          <div class="widget green">
            <div>G</div>
            <div class="bar">
              <div class="indicator"></div>
            </div>
            <div class="value"></div>
          </div>

          <div class="widget blue">
            <div>B</div>
            <div class="bar">
              <div class="indicator"></div>
            </div>
            <div class="value"></div>
          </div>

          <div class="swatch">
            <div class="rgb">RGB</div>
          </div>
        </div>

        <div class="support-warning">
          Sorry, your browser doesn't support Houdini stuff so you won't see the
          animations. Try Chrome, Edge, or Opera.
        </div>
      </>
    );
  },
});
