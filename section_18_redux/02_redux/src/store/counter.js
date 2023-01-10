import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      // `state.counter++;` 이렇게 해도 되는이유는 Redux toolkit은 내부적으로
      //immer라는 다른 패키지를 사용하는데 이런 코드를
      //감지하고 자동으로 원래 상태를 복제하기 때문이다.
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      //payload(추가데이터)가 필요한 경우는 액션을 받는다.
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
