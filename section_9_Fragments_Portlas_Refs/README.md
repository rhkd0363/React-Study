# 섹션 9 Fragments, Portals & Refs

### JSX 한계

- 자바스크립트는 반환 값을 하나만 할 수 있다.

```javascript
// JSX 의 경우 아래는 반환 값이 둘로 실행될 수 없다.
return (
    <h2>Hi there!</h2>
    <p>This is JSX!</p>
);

// 위의 코드를 자바스크립트로 변환하면
return (
    React.createElement('h2',{},'Hi there!')
    React.createElement('p', {},'This is JSX!')
);
//이므로 반환 값이 둘이 되게 된다.
```

- 만약 <div> 로 감싸게 되면 필요없는 <div> 태그가 많이 생길 수 있고, 렌더링 시 많은 <div? 로 인해 속도가 저하될 수도 있다.

- 해결방법

- Wrapper 컴포넌트 만들기
- Wrapper 컴포넌트를 만들고 감싼다.
- 개발자도구를 통해 보면 필요없는 태그가 없어진 것을 확인할 수 있다.

```javascript
const Wrapper = (props) => {
  return props.children;
};

export default Wrapper;
```

- React.Fragment는 위에 만든 Wrapper 컴포넌트와 같은 역할을 한다.

### Fragment 사용법

```javascript
//빈 태그로 감싸는 방법
<></>

// 리액트 프래그먼트로 감싸기
<React.Fragment></React.Fragment>

// 임포트 후 Fragment로 감싸기
import React, {Fragment} from 'react';
<Fragment></Fragment>
```

---

### Portals

- 포탈은 어디로 이동할지와 그것을 알려주는 것 2가지가 필요하다.
- ReactDOM.createPortal() 을 통해 해당 컴포넌트의 Html 을 다른곳으로 이동시킬 수 있다.
- 이동할 곳은 public/ index.html 에 root 밖에 위치시킨다??
- 이 프로젝트에서는 에러모달이 나오면 root 밖으로 위치시켜 안보이게 했음
```javascript
{
  ReactDOM.createPortal(
    <Backdrop onConfirm={props.onConfirm} />,
    document.getElementById("backdrop-root") // 이동할 곳
  );
}
```

---

### Refs
- 다른 DOM 요소에 접근해 그것들로 작업할 수 있게 하는 것
- React에서 state로만 해결할 수 없고, DOM을 반드시 직접 건드려야 할 때 사용
- 예: 특정 input에 focus 주기, 스크롤 박스 조작, Canvas 요소에 그림 그리기 등
- 함수형 컴포넌트에서는 useRef라는 hook을 사용하여 ref를 활용