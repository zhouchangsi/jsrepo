import {defineComponent, ref} from "vue";

export default defineComponent(() => {
    const countRef = ref(1)
    const style = {
        width: "100px",
        height: "1000px",
        backgroundColor: "#ddd"
    }
    const render = () => {
        return <div className={"container"} style={style}>this is countRef: {countRef.value}</div>
    }
    return render
})