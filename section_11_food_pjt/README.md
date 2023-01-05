# 섹션 10 Effect, reducer, context api

### 이펙트

- 사이드 이펙트는 애플리케이션에서 일어나는 컴포넌트 외에 다른 모든 것을 뜻한다.
- http 리퀘스트나 로컬 스토리지에 저장하는 것 등
- 사이드이펙트는 직접적으로 컴포넌트 함수 내에 들어가서는 안된다. (버그 무한루프 또는 너무많은 http 요청 등이 보내질 수 있으므로)
- 그러므로 이러한 사이드 이펙트를 처리할 도구가 필요하다.
- 만약 useEffect를 사용하지 않고 state의 값을 변경하는 함수가 존재한다면 계속 리-렌더링 되며 화면은 나오지 않을 것이다.
- useEffect 등이 있다.

### useEffect 훅

- 두개의 매개변수, 인수와 같이 호출된다
- 의존성이 변경된 경우에만 지정한 함수가 실행된다.

```javascript
useEffect(() => { ... }, [ dependencies ]);
```

- useEffect는 컴포넌트가 렌더링이 된 후에 실행된다.
- useEffect는 애플리케이션 시작 후 컴포넌트 렌더링 후 한번만 실행되는데, 다시 실행하기를 원한다면 의존성 설정을 통해서 할 수 있다.

- (컴포넌트)구성 요소(또는 일부 상위 구성 요소)가 다시 렌더링 되어 이러한 "것들"이 변경될 수 있는 경우.그렇기 때문에 컴포넌트 함수에 정의된 변수나 상태, 컴포넌트 함수에 정의된 props 또는 함수는 종속성(의존성)으로 추가되어야 한다.

```javascript
// 렌더링 후 실행된 다음 a, b, c의 변경이 생길 때 다시 실행하고 싶으면 아래와 같이 의존성 추가
// 예를 들어 state, props의 변화
useEffect(() => { ... }, [ a ,b, c ]);
```

- 중요한 것은 useEffect 는 사이드이펙트를 처리하기 위한 것이고 이를 위해 사용되는 것이 좋다.
- http 요청, 유효성 검사, 데이터 입력 등

###### useEffect 에서 Cleanup 사용

- 만약 state가 변경될 때마다 useEffect 가 실행된다 가정하면, 백엔드와 통신이 필요한 경우는 상당한 네트워크 트래픽이 생길수 있음
- 이를 방지하기 위해 state의 변경이 일정 시간 유지되거나 할 때 useEffect 안의 함수가 실행되게 하는게 좋음
- 이것을 디바운싱이라 함

- useEffect의 첫번째 인자는 리턴값을 가질 수 있고 리턴 값은 함수여야한다.
- 리턴되는 함수를 클린업 함수라고 하며 클린업프로세스로써 실행된다.
- 리턴되는 함수는 맨 처음 실행되는 경우(애플리케이션 실행 후 첫 렌더링될 때)를 제외하고 실행된다.
- clearTimeout 함수를 통해 setTimeout 시간 전 실행된 함수는 지워지게된다.

```javascript
useEffect(() => {
  const identifier = setTimeout(() => {
    setFormIsValid(
      enteredEmail.includes("@") && enteredPassword.trim().length > 6
    );
  }, 500);

  return () => {
    clearTimeout(identifier);
  };
}, [enteredEmail, enteredPassword]);
```

- useState 와 useEffect 는 중요한 리액트 훅이다.

---

### useReducer

- useReducer 는 내장된 훅이다.
- state의 관리를 도와준다.
- useState와 비슷하지만 더 많은 기능이 있다.

- useReducer 함수

```javascript
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);

/******************************************/

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

...

const [emailState, dispatchEmail] = useReducer(emailReducer, {
  value: "",
  isValid: null,
});

```

- 리듀서 함수는 컴포넌트 함수 내부와 관련 없기에 리듀서 함수를 컴포넌트 함수 밖에서 정의할 수 있다.

- useEffect()에 객체 속성을 종속성으로 추가하기 위해 destructuring을 사용
- 이것은 매우 일반적인 패턴 및 접근 방식
- 핵심은 destructuring을 사용한다는 것이 아니라, 전체 객체 대신 특정 속성을 종속성으로 전달한다는 것

```javascript
const { someProperty } = someObject;

useEffect(() => {
  // code that only uses someProperty ...
}, [someProperty]);
```

---

### Context API

- 리액트 컨텍스트는 리액트 내부적으로 state 관리
- 앱의 어떤 컴포넌트에서든 직접 변경하여 앱의 다른 컴포에 직접 전달(프롭 체인 없이)
- context로 사용할 공간을 만든다. store -> .js 파일 -> createContext({객체형식})

```javascript
import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
});

export default AuthContext;
```

- context에 접근할 컴포넌트(상위 컴포넌트)에 임포트 후 ~.Provider를 wrapper로 사용
- value 를 통해 객체에 접근이 가능하게 설정되고, 모든 Consumer 컴포넌트로 값이 전달됨

```javascript
// 프래그먼트 생략해도 됌
return (
  <React.Fragment>
    <AuthContext.Provider
      value={{
        isLoggedIn: ...state or app components...,
      }}
    >
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  </React.Fragment>
);
```

- 리스닝 방법으로는 Consumer 또는 리액트 hook 을 사용함

##### Consumer

```javascript
const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(ctx) => {
        return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};
```

- 일반적으로 리액트 훅 사용 ( 컨슈머의 경우 함수와 태그를 반환하는 형태여서 별로(?))

##### useContext 훅
- 컨슈머보다 훨씬 간단하다.

``` javascript
const Navigation = (props) => {
  const ctx = useContext(AuthContext);
  
  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
```

- 여러 컴포넌트에서 쓰이는 것들은 한곳에 모으고, 아닌것은 개별 컴포넌트에서 사용
- 
``` javascript
import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

```

``` javascript
// index.js 에서 아래와 같이 AuthCOntextProvider로 감싸고 context 에서 관리하며 사용하면 간결해짐

root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

```

---

### Hook 규칙
- 리액트 훅은 리액트 함수에서만 호출해야한다.(즉, 리액트 컴포넌트 함수에서) 또는 사용자 정의 훅에서
- 리액트 훅은 리액 리액트 컴포넌트 함수 또는 사용자 정의 훅 함수 최상위수준에서만 호출해야 한다.
- 중첩 함수나 block 문에서 호출하지 말아야 한다.

- useEffect 훅, 항상 참조하는 모든 항목을 의존성으로 내부에 추가해야 한다.( 필수는 아님) ( userState에 의한 함수는 예외 리액트에 의해 변경되지 않게 보존됨 )

---
