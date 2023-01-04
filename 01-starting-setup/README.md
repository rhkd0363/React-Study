# 유데미 섹션 1 - 5 까지 정리

### Wrapper 컴포넌트

- props.children으로 Wrapper 컴포넌트 만듬
- const classes = 'card ' + props.className; 를 통해 하위 컴포넌트 CSS 사용 가능하게 할 수 있음

```javascript
function Card(props) {
  const classes = "card " + props.className;
  return <div className={classes}>{props.children}</div>;
}
```

---

### JSX

- JSX는 Javascript에 XML을 추가한 확장된 문법이다.
- JSX는 React에서 개발 시 사용되는 문법이다.
- 브라우저 실행 전 바벨을 사용해 일반 자바스크립트 형태로 변환된다.
- 개발자 경험(developer experience, DX) 개선, 팀의 생산성 향상, 문법 오류와 코드량 감소 등의 이유로 JSX 사용을 권장한다.

```javascript
// JSX 로 작성된 코드
return (
  <div>
    <h2>Lets go!</h2>
    <Expenses items={expenses} />
  </div>
);

// JSX로 작성된 코드를 JS 로 작성했을 때
return React.createElement(
  "div",
  {},
  React.createElement("h2", {}, "Lets go!"),
  React.createElement(Expenses, { items: expenses })
);
```

---

### 디렉토리 구조

- 디렉토리 구조를 효과적으로 구성해야 한다.
- 메인 컴포넌트를 기준으로 트리 형태로 하위 컴포넌트를 나눈다.
- 컴포넌트별 하위 컴포넌트끼리 모아서 디렉토리 구조를 정리한다.
- 인터페이스 등 공통 기능 끼리 모아서 디렉토리를 구성한다.

---

### JSX 이벤트 처리 주의점

- 아래 코드와 같이 이벤트를 처리할 때 함수이름만 작성할 것
- 함수명 뒤에 ()를 붙이면 JSX가 반환될 때 함수가 실행되어 원치 않게 동작할 수 있다. 그러므로 함수명만 지정할 것!

```javascript
<button onClick={clickHandler}>Change Title</button>

<button onClick={clickHandler()}>Change Title</button>
```

---

### Props 와 State

- 일반 자바스크립트 객체이다.
- props는 상위 컴포넌트가 하위 컴포넌트에 값을 전달할 때 사용한다. ( 단방향 데이터 흐름을 갖는다. )
- 프로퍼티는 수정할 수 없다는 특징이 있다.(자식입장에선 읽기 전용인 데이터이다.)
- state는 컴포넌트 안에서 사용된다.
- prop은 컴포넌트에 매개변수처럼 전달하는 것이다.
- state는 컴포넌트의 현재 상황에 대한 정보를 나타내기 위해 쓰인다.
- state는 컴포넌트의 동작을 제어하는 관찰 가능한 속성 집합의 객체로 정의할 수 있다.

- 리액트는 처음으로 주어진 컴포넌트 인스턴스에서 useState를 호출할 때 기록한다.
- 처음 호출할 때 해당 인자값을 초기 값으로 취한다.
- 하지만 만약 컴포넌트가 재실행되면 상태가 변했기 때문에 state를 다시 초기화하지 않고, 이전에 상태가 초기화 되었던 것을 추적해 업데이트 된 state를 제공한다.

```javascript
import { useState } from react;

...

// useState는 배열을 반환하고 배열의 첫번째 요소는 변수 자체를 두번째 요소는 업데이트하는 함수를 반환한다.
// useState는 항상 두개의 요소가 있는 배열을 반환한다.
const [item, setItem] = useState(props.item);

// 콘솔 결과를 확인하면 값이 안 바뀐 것을 확인가능
// 하지만 item 값은 변경됨
// setItem은 예약한다보면됨 바로실행되지않음
  const clickHandler = () => {
    // setItem 을 할 시 컴포넌트를 새로 불러오며 item이 업데이트된다.
    setItem('Updated!');
    console.log(item);
  };
```

---

### state 사용 방법

- 독립적, 비독립적 방식 모두 사용가능하며, 개인 취향임

- 독립적 방식

```javascript
// 독립적인 state 방식
const [item, setItem] = useState("");
const [item_, setItem_] = useState("");

const handler = (event) => {
  setItem = event.target.value;
};
```

- 비독립적 방식

```javascript
// 비독립적인 state 방식 1( 실행은 되지만 사용을 추천하지 않음)
const [userInput, setUserInput] = useState({
  item: '',
  item_: '',
});

const handler_ = (event) =>{
  setUserInput({
    ...userInput, //스프레드 방식으로 변경할 변수 외의 다른 변수를 복사해주는 방식
    item: event.target.value;
  });
};

// 비독립 2
// 비독립 1의 경우 리액트는 상태 업데이트 스케줄을 가지고 있어서 바로 실행되지 않음. 만약 동시에 수많은 상태 업데이트를 계획한다면 제대로 반영되지 않을 수 있음
// 그래서 아래 비독립 2 방법 추천
const handler_ = (event) =>{
  setUserInput((prevState) =>{
    return { ...prevState, item: event.target.value };
    });
};
```

---

### 폼 제출 시 Prevent

- form 제출 시 화면이 reroad 되는 것을 방지

```javascript
const submitHandler = (event) => {
  event.preventDefault();
};

return <form onSubmit={submitHandler} />;
```

---

### 자식에서 부모 컴포넌트로 값 전달

```javascript
//부모컴포넌트 함수 선언
const saveExpenseDataHandler = (enteredExpenseData) => {
  const expenseData = {
    ...enteredExpenseData,
    id: Math.random().toString(),
  };
  console.log(expenseData);
};

<ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />;

/************************************************/

//자식컴포넌트에서 props로 받은 후 함수 사용
const submitHandler = (event) => {
  event.preventDefault();

  const expenseData = {
    title: enteredTitle,
    amount: enteredAmount,
    date: new Date(eneteredDate),
  };

  props.onSaveExpenseData(expenseData);
  setEnteredTitle("");
  setEnteredAmount("");
  setEnteredDate("");
};

return <form onSubmit={submitHandler} />;
```

---

### 컴포넌트 반복 렌더링

- map() 을 이용한 반복

```javascript
{
  props.items.map((item) => (
    <itemDetail title={item.title} amount={item.amount} />
  ));
}
```

- key 값을 줘서 개별 컴포넌트로 인식시켜줘야 좋음(특정 값을 줘서 개별적인 것을 인식시켜줘야 한다.)
- index를 줄 수도 있는데 비추(특정 아이템에 대한 인덱스가 항상 똑같기 때문이고 직접적인 구분의 기준이 되는 것이 아니기 때문이다.)

```javascript
{
  props.items.map((item) => (
    <itemDetail key={item.key} title={item.title} amount={item.amount} />
  ));
}

{
  props.items.map((item, index) => (
    <itemDetail key={item.key} title={item.title} amount={item.amount} />
  ));
}
```

---

### 조건부 컴포넌트 출력 3가지 방법

```javascript
//1
{
  items.length === 0 ? (
    <p>empty</p>
  ) : (
    items.map((item) => (
      <itemDetail key={item.key} title={item.title} amount={item.amount} />
    ))
  );
}

//2
let content = <p>empty</p>;
...
{
  items.length === 0 && content;
}
{
  items.length > 0 &&
    items.map((item) => (
      <itemDetail key={item.key} title={item.title} amount={item.amount} />
    ));
}

//3
let content = <p>empty</p>;

if (items.length > 0) {
  content = items.map((item) => (
    <itemDetail key={item.key} title={item.title} amount={item.amount} />
  ));
}
...
{content}
```
