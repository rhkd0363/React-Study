# 섹션 20 라우터

### NotFound 페이지 추가

- 일치하는 페이지가 나오지 않으면 NotFound 페이지를 보여준다.
- Switch 제일 밑에 위치시켜 아무것도 일치하지 않을 때 해당 화면을 보여주도록 한다.
- `<Route path='*'>` path에 '\*' 을 설정하여 모든 경로에 대해 처리하도록 설정 한다.

```javascript
  <Route path="*">
    <NotFound />
  </Route>

<Switch>
  <Route path="/" exact>
    <Redirect to="/quotes"></Redirect>
  </Route>
  <Route path="/quotes" exact>
    <AllQuotes />
  </Route>
  <Route path="/quotes/:quoteId">
    <QuoteDetail />
  </Route>
  <Route path="/new-quote">
    <NewQuote />
  </Route>
  <Route path="*">
    <NotFound />
  </Route>
</Switch>
```

### useHistory

- 리액트에서 URL주소를 변경할 때 사용하는 Hook
- 버튼이나 목록 중에서 하나를 선택하여 클릭했을 때, URL주소를 변경시켜 URL주소와 일치하는 Route의 컴포넌트를 렌더링하기 위해 사용

```javascript
const history = useHistory();

history.back(); // 이전 URL로 변경

history.replace("/quotes"); // 현재 URL을 변경

history.push("/quotes"); // URL로 이동 ( 브라우저 히스토리에 이동 기록이 쌓임 )
```

### Prompt 컴포넌트 사용하여 원치 않는 경로 전환 방지

- 입력데이터가 있는 화면에서 원치 않게 다른 화면으로 가는 것을 방지하기 위해 사용
- `<Prompt>` 를 사용한다.

```javascript
const [isEntering, setIsEntering] = useState(false);

function submitFormHandler(event) {
  event.preventDefault();

  // 여기에 setIsEntering(false) 설정하면 늦음 그래서 버튼 클릭할 때 onClick 이벤트로 설정해줘야 함
  // setIsEntering(false);
}

const finishEnteringHandler = () => {
  //제출버튼을 눌렀을 때는 프롬프트 창이 뜨지 않도록 설정 (만약 여기서 false로 설정하지 않으면 제출버튼 눌렀을 때도 프롬프트 뜨게됨)
  setIsEntering(false);
};

const formFocusedHandler = () => {
  setIsEntering(true);
};

<Fragment>
  <Prompt
    when={isEntering}
    message={(location) => {
      console.log(location);
      return "나갈거임? 입력데이터 사라진다?";
    }}
  />
  <form onFocus={formFocusedHandler} onSubmit={submitFormHandler}>
    <button onClick={finishEnteringHandler}>제출</button>
  </form>
</Fragment>;
```

### 쿼리 매개 변수

- `useLocation` 에는 최근 로드된 페이지와 URL에 대한 정보가 있다.

```javascript
const history = useHistory();
const location = useLocation(); // 2. location에 페이지와  URL에 대한 정보를 얻음

const queryParams = new URLSearchParams(location.search); // URLSearchParmas 를 통해 location.search 의 쿼리 매개변수의 정보를 키 : 값 쌍으로 얻을 수 있다.

const isSortingAsc = queryParams.get("sort");

const changeSortingHandler = () => {
  history.push("/quotes?sort=asc"); // 1. history가 추가됨
};

...

<button onClick={changeSortingHandler}>Sort Asc</button>;
```

- useLocation() 과 useRouteMatch() 를 사용하여 path 정보를 얻을 수 있음

```javascript
const QuoteDetail = () => {
  const match = useRouteMatch();

  return (
    <Fragment>
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};
```

```javascript
const changeSortingHandler = () => {
  history.push({
    // 이렇게 작성하면 가독성을 높힐수 있음
    pathname: location.pathname,
    search: `?sort=${isSortingAsc ? "desc" : "asc"}`,
  });
  // history.push(`${location.pathname}?sort=${isSortingAsc ? "desc" : "asc"}`);
};
```
