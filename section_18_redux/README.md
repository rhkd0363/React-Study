# 섹션 18 리덕스

### 프로젝트 설정

- npm install , npm install redux, npm install react-redux
- store 폴더 만들고, js 파일 만들기
- 스토어 만들고, 리듀서 만들기

- 루트컴포넌트를 렌더링한 index.js 에서 react-redux의 Provider를 임포트하고, App을 감싸준다.
- `import { Provider } from 'react-redux'`
- 위에서 만든 store를 임포트하고 Provider의 store prop에 우리가 임포트한 store를 설정해준다. 이것이 사용할 리덕스 저장소이다.

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### 사용하기

- `useSelector` 나 `useStore` 를 임포트해서 사용할 수 있으며, `useStore`는 저장소에 직접 접근할 수 있지만 `useSelector`가 약간 더 사용하기 편하다.
- 그 이유는 저장소가 관리하는 상태 부분을 우리가 자동으로 선택할 수 있기 때문이다.
- 만약 클래스 컴포넌트를 사용할 경우 `connect` 함수를 사용할 수 있다.
- `useSelector` 는 컴포넌트를 위해 자동으로 저장소를 구독한다. 그러므로 저장소 데이터가 변경될 때마다 자동으로 업데이트 된다.
- `useDispatch`를 사용하여 함수를 사용할 수 있다.

```javascript
// 리덕스 저장소
import { legacy_createStore as createStore } from "redux";

const initialState = { counter: 0, showCounter: true };

const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }
  if (action.type === "increase") {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "toggle") {
    return {
      counter: state.counter,
      showCounter: !state.showCounter,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
```

```javascript
// 컴포넌트
import { useSelector, useDispatch } from "react-redux";

import classes from "./Counter.module.css";

// 함수형 컴포넌트

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);

  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };

  const increaseHandler = () => {
    dispatch({ type: "increase", amount: 5 });
  };

  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {
    dispatch({ type: "toggle" });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// 클래스 컴포넌트

// class Counter extends Component{
//   incrementHandler(){
//     this.props.increment();
//   }

//   decrementHandler(){
//     this.props.decrement();
//   }

//   toggleCounterHandler(){};

//     render(){
//       return (
//         <main className={classes.counter}>
//           <h1>Redux Counter</h1>
//           <div className={classes.value}>{this.props.counter}</div>
//           <div>
//             <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//             <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//           </div>
//           <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//         </main>
//       );
//     };
//   }

// const mapStateToProps = state => {
//   return {
//     counter: state.counter
//   };
// }

// const mapDispatchToProps = dispatch =>{
//   return{
//     increment: () => dispatch({ type : 'increment'}),
//     decrement: () => dispatch({ type : 'decrement'})
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Counter);
```

### State 올바른 사용법

- Redux reducer에서 반환되는 객체는 Redux가 기존의 state를 대체하는 데 사용하는 완전히 새로운 객체인 새로운 스냅샷을 항상 반환해야 한다.
- > 기존state와 병합되지 않고 새로 덮어쓴다는 것

- 예를 들어, 아래와 같이 type 이 increment일 때 반환하는 객체에는 showCounter가 포함되지 않는다.
- showCounter는 undefined가 될 것이고 아래 예시에서 결국 <div> 태그는 출력되지 않을 것이다.

```javascript
const initialState = { counter: 0, showCounter: true }

const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1
    };
  }

  ...

  const show = useSelector((state) => state.showCounter);
  ...
  {show && <div className={classes.value}>{counter}</div>}

```

- 그러므로 항상 state를 업데이트 할 때는 다른 state를 설정해야 한다.

- 아래는 잘못된 예시이다. 절대 기존 state를 변경해서는 안된다.
- 객체를 반환할때는 복사하거나 새로운 객체를 반환해야한다.

```javascript
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    state.counter++;

    return state;
  }

  ...
```

### 설정하고 관리하기

- 애플리케이션 규모가 커질 경우 리덕스에서 관리해야할 상태가 많아지면, 액션 타입에 문제가 생길 수 있다.
- 규모가 커질 경우 액션을 구분하는 식별자 오타 또는 중복된 이름으로 에러가 발생할 가능성이 생길 수 있다.
- 데이터와 state가 많아질 수록 state 객체의 크기가 커지게 되고, 즉 state가 업데이트 될때 많은 양을 계속 복사해야 하게 된다.
- 또한 파일 관리하기 힘들 정도로 크기가 커질 수도 있다.
- 실수를 예방하는 방법 중 하나로, 상수를 선언하여 사용하는 방법이 있다. => 상수 선언 후 export 하고, 컴포넌트에서 import 하여 사용
- 파일이 거대해진 경우는 리듀서를 작은 리듀서로 나누는 방법도 있다.
- 상태관리를 위한 redux toolkit 을 사용하는 방법도 있다.

### Redux Toolkit 사용하기

- `npm install @reduxjs/toolkit` 명령어로 설치
- 이 패키지 설치가 끝나면 리덕스 라이브러리를 삭제해야 한다. 왜냐하면 이미 Redux toolkit에 포함되어 있기 때문이다.

- store에 js 파일에 reduxjs/toolkit 의 `createSlice`를 임포트한다.
- `createReducer`를 임포트하여 사용할 수 있으나, `createSlice` 가 더 강력하다.

- `createSlice`는 객체를 인자로서 생성한다
- `createSlice`를 사용해 전역 상태의 slice를 만들어야한다.

```javascript
import { legacy_createStore as createStore } from "redux";
import { createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState,
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
      state.counter = state.counter + action.amount;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const store = createStore(counterSlice.reducer);

export default store;
```

- createStore 에는 하나의 리듀서만 전달해야하는데, slice된 여러 리듀서는 전달하기 어려움
- reduxjs/toolkit 의 configureStore 를 사용해 쉽게 사용가능
- configureStore 는 여러개의 리듀서를 하나로 합칠수있다는 것이다.
- configureStore에는 객체를 전달해야한다. 설정 객체에서 리듀서 프로퍼티를 설정한다.

- `.actions` 를 사용해 createSlice의 액션 식별자에 접근할 수 있고, 내보내서 사용할 수 있다.

```javascript
export const counterActions = counterSlice.actions;
```

- 값을 전달해 줄 때 객체든 값이든 원하는 형태의 값을 넘겨주면 된다. 중요한 건 어떻게 추출하느냐이다.
 - redux toolkit은 자동으로 액션 생성자를 생성해서 redux toolkit이 생성한 식별자로 전달하고, 인자 값을 필드명이 payload 라는 이름으로 넘겨준다.
- payload는 변경할 수 없고, 정해져있음.

```javascript
const increaseHandler = () => {
  // 값을 전달해 줄 때 객체든 값이든 원하는 형태의 값을 넘겨주면 된다. 중요한 건 어떻게 추출하느냐이다.
  // redux toolkit은 자동으로 액션 생성자를 생성해서 redux toolkit이 생성한 식별자로 전달하고, 인자 값을 필드명이 payload 라는 이름으로 넘겨준다.
  // payload는 변경할 수 없고, 정해져있음.
  dispatch(counterActions.increase(10));
  // dispatch(counterActions.increase({amount:10}));
};

...

increase(state, action) {
  //action.payload 는 정해져있는 필드명이다.
  state.counter = state.counter + action.payload;
},
```

### 다중 슬라이스
- 여러 개의 슬라이스를 생성하는 경우 원하는 만큼 createSlice를 통해 슬라이스를 만들고, store에 추가한다.
- 사용하기 위해 store에 추가하고 action을 export 한다

``` javascript
import { createSlice, configureStore } from "@reduxjs/toolkit";

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

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
    },
    logout(state, action) {
      state.isAuthenticated = false;
    },
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer, // => useSelector(state.counter.showCounter)
    auth: authSlice.reducer,
  },
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;

```


### 코드 분할하기
- 슬라이스 별로 파일 생성하여 구분하고, 합친다.

``` javascript
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated: false,
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
      login(state, action) {
        state.isAuthenticated = true;
      },
      logout(state, action) {
        state.isAuthenticated = false;
      },
    },
  });

  export const authActions = authSlice.actions;
  export default authSlice.reducer;
```

``` javascript
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
```

``` javascript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    counter: counterReducer, // => useSelector(state.counter.showCounter)
    auth: authReducer,
  },
});

export default store;
```