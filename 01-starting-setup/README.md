### Wrapper 컴포넌트
- props.children으로 Wrapper 컴포넌트 만듬
- const classes = 'card ' + props.className; 를 통해 하위 컴포넌트 CSS 사용 가능하게 할 수 있음
``` javascript
function Card(props){
    const classes = 'card ' + props.className;
    return <div className={classes}>{props.children}</div>
}
```

---

### JSX
- JSX는 Javascript에 XML을 추가한 확장된 문법이다.
- JSX는 React에서 개발 시 사용되는 문법이다.
- 브라우저 실행 전 바벨을 사용해 일반 자바스크립트 형태로 변환된다.
- 개발자 경험(developer experience, DX) 개선, 팀의 생산성 향상, 문법 오류와 코드량 감소 등의 이유로 JSX 사용을 권장한다.

``` javascript
// JSX 로 작성된 코드
return (
    <div>
        <h2>Lets go!</h2>
        <Expenses items={expenses}/>
    </div>
)

// JSX로 작성된 코드를 JS 로 작성했을 때
return React.createElement('div',{},
    React.createElement('h2', {}, 'Lets go!'),
    React.createElement(Expenses, {items: expenses})
    );
```

---

### 디렉토리 구조
- 디렉토리 구조를 효과적으로 구성해야 한다.
- 메인 컴포넌트를 기준으로 트리 형태로 하위 컴포넌트를 나눈다.
- 컴포넌트별 하위 컴포넌트끼리 모아서 디렉토리 구조를 정리한다.
- 인터페이스 등 공통 기능 끼리 모아서 디렉토리를 구성한다.