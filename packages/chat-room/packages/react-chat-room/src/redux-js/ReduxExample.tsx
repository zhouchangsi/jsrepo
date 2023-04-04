// import "./index.css";

import * as React from "react";
import * as store from "./index";

import { Provider, useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./slice/counterSlice";

export interface IReduxExampleProps {}

export default function ReduxExample(props: IReduxExampleProps) {
    const count = useSelector((state: any) => state.counter?.value);
    const dispatch = useDispatch();

    return (
        <Provider store={store.default}>
            <div
                className="redux-example"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "20rem",
                    border: "solid 1px red",
                    flexDirection: "column",
                }}
            >
                <div>
                    <h1>Redux Example</h1>
                    <hr />
                    <button
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                        style={styles.border}
                    >
                        Increment
                    </button>
                    <br />
                    <span style={styles.border}>count:{count}</span>
                    <br />
                    <button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                        style={styles.border}
                    >
                        Decrement
                    </button>
                </div>
            </div>
        </Provider>
    );
}

const styles = {
    border: {
        border: "dashed 1px",
    },
};
