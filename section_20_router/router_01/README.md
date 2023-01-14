# 섹션 20 라우터

- 사용자가 요청한 URL에 따라 해당 URL에 맞는 페이지를 보여주는 것
- 리액트 라우터는 신규 페이지를 불러오지 않는 상황에서 각각의 URL 에 따라 선택된 데이터를 하나의 페이지에서 렌더링 해주는 라이브러리

### Keyword

- ` Link` `NavLink activeClassName ` `/:parameter` ` Route` `Switch` `exact `

### 리액트 라우터

- 6 버전과 5버전이 있는데 5버전을 설치해서 사용할 예정
- `npm install react-router-dom@5` @5를 써서 5버전으로 설치

- `import { Route } from "react-router-dom";`

```javascript
// index.js
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

```javascript
// App.js
import { Route } from "react-router-dom";

import Welcome from "./components/Welcome";

function App() {
  return (
    <div>
      <Route path="/welcome">
        <Welcome />
      </Route>
    </div>
  );
}

export default App;
```

- <a> 태그를 사용하여 페이지 이동을 하면 페이지가 새로 불러와지게 된다. 이를 해결하기 위해 클릭 이벤트에 prevent 이벤트를 추가해야 한다.
- 하지만, react-router-dom 의 Link 를 사용하여 이를 쉽게 막을 수 있다.

```javascript
<a href="welcome"> Welcome </a>

...

import { Link, NavLink } from 'react-router-dom'

<Link to="welcome"> Welcome </Link>
```

- 해당 페이지에 있을 때 네비게이션의 Link 가 활성화되어있게 CSS 적용하려면 NavLink를 사용할 수 있다.

```javascript
import { NavLink } from "react-router-dom";

import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/welcome">
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/products">
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
```

### params 를 이용한 동적 경로 추가

- 경로 뒤에 `/:parameter` 를 추가하여 동적으로 경로 추가 가능하다. 경로 뒤에 오는 값은 동적 세그먼트로 어떤 값이 와도 된다.

```javascript
<Route path="/product-detail/:productId">
  <ProductDetail />
</Route>
```

### 경로 파라미터 추출하기

- useParams 훅 임포트
  `import { useParams } from "react-router-dom";`

```javascript
<Route path="/product-detail/:productId">
  <ProductDetail />
</Route>

...

import { useParams } from "react-router-dom";

const params = useParams(); // 키:값 쌍을 반환한다.

// /prodcut-detail/1234
console.log(params.productId); // 1234 출력
```

- `<Route path="/product-detail/:productId">` 에서 경로를 `<Route path="/products/:productId">` 로 바꿔주는게 더 바람직함

```javascript
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <section>
      <h1> Welcome Products! </h1>
      <ul>
        <li>
          <Link to="/products/p1">A Book</Link>
        </li>
        <li>
          <Link to="/products/p2">A Carpet</Link>
        </li>
        <li>
          <Link to="/products/p3">A Data</Link>
        </li>
      </ul>
    </section>
  );
};

export default Products;
```

- 위와같이 경로를 수정하고 products 컴포넌트의 목록에서 내용을 클릭하면 products/p1으로 주소가 변하지만 products 컴포넌트와 상세정보 컴포넌트가 같은페이지 내에서 나오는 것을 볼 수 있는데, 이는 products 주소가 일치하기 때문
- 이를 해결하기 위해 `Switch` 사용

- `Switch` 를 사용하여 라우터를 래핑해주면 됨. 그러면 감싸진 것 중 하나만 활성화가 됨

```javascript
import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";

import Welcome from "./pages/Welcome";

function App() {
  return (
    <Fragment>
      <MainHeader />
      <main>
        <Switch>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/products/:productId">
            <ProductDetail />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
```

- 위와 같이 설정하게되면 `/products/:productId` 의 페이지는 나오지 않게됨 왜나하면 5버전 리액트 라우터는 그저 라우트를 위에서 아래로 통과할 뿐이고, 일치하는 항목을 찾는다는 것은 전체 경로가 아니라 경로의 시작부분과 일치할 때를 의미하기 때문임.
- 일치하는 항목을 찾게되면 Switch에 인해 중단되고 일차하는 항목을 찾은 하나의 라우트를 렌더링하기에 `/products` 의 페이지만 보이게 됨

- 위를 해결하는 방법 중 하나는 순서를 바꾸는 것

- 다른 방법은 `exact` 속성을 추가하는 것

  - `exact` 속성을 추가하면 정확히 URL이 일치하는 경우에만 일치 여부를 알려 줌

  ```javascript
  import { Route } from "react-router-dom";

  <Route path="/products" exact>
    <Products />
  </Route>
  <Route path="/products/:productId">
    <ProductDetail />
  </Route>
  ```

### 중첩 라우트

- 라우트를 정의하는 것은 한곳에서만이 아니라 원하는 곳 어디든 라우트를 정의할 수 있음

```javascript
import { Route } from "react-router-dom";

const Welcome = () => {
  return (
    <section>
      <h1> Welcome! </h1>
      <Route path="/welcome/new-user">
        <p>new User!</p>
      </Route>
    </section>
  );
};

export default Welcome;
```

### 리디렉션

- `import {Redirect} from "react-router-dom";`
- 아래 코드에서는 / 로 URL을 입력하면 /welcome 으로 리디렉션된다.

```javascript
<Route path="/" exact>
  <Redirect to="/welcome" />
</Route>
<Route path="/welcome">
  <Welcome />
</Route>
```
