### [router-01](/router_01/README.md)

- 라우터 1

---

### [router-02](/router_02/README.md)

- 라우터 2

---

### 라우터 v5 -> v6 변경

##### Switch 컴포넌트 -> Routes 컴포넌트 사용

- Switch 컴포넌트 사라짐

##### 라우트 정의 방식 변경

```javascript
//v5
<Route path='/welcome'> <Welcome /> </Route>

//v6
<Route path='/welcome' element={<Welcome />} />
```

##### exact 속성 삭제

- exact 속성이 사라지고, 정확히 path가 일치하는 컴포넌트를 찾아가게 됨
- 경로의 시작부분이 일치하면 활성화시키기 위해서는 path 뒤에 /\* 를 추가하면 된다. ( 하지만 정확히 존재하는 경로가 존재할 경우 그 경로를 우선적으로 찾아감. 버전 5와 달리 라우트 작성 시 순서가 중요치 않아짐 )

##### NavLink activeClassName 속성이 삭제

```javascript
// v6
<NavLink
  className={(navData) => (navData.isActive ? classes.active : "")}
  to="/welcome"
>
  welcome
</NavLink>
```

##### Redirect 컴포넌트 삭제 -> Navigate 로 변경

```javascript
//v5
<Route path="/" exact>
  <Redirect to="/welcome" />
</Route>;

import { Navigate } from "react-router-dom";
//v6
<Route path="/" element={<Navigate to="/welcome" />} />;

//현재 페이지를 새페이지로 교체하는 리디렉션을 원하면 replace 속성 추가(없으면 push 임)
<Route path="/" element={<Navigate replace to="/welcome" />} />;
```

##### 중첩 라우터

- 버전 6는 Route는 Routes로 감싸야 함 (필수)
- 따라서 컴포넌트 안의 중첩 라우트여도 Routes로 감싸야 함

- 중첩 라우터를 사용할 때 v6에서는 시작부분 다음 `/*`, welcome/\* 그리고 중첩 라우트 부분에서 new-user와 같이 `상대경로`로 작성해준다.

- v6 에서는 Link 컴포넌트의 to 속성도 상대 경로로 설정된다.

```javascript
//v5
<section>
  <h1> Welcome! </h1>
  <Route path="/welcome/new-user">
    <p>new User!</p>
  </Route>
</section>;

--------------

//v6
function App() {
  return (
    <Fragment>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/welcome/*" element={<Welcome />} />
        </Routes>
      </main>
    </Fragment>
  );
}

...

//Welcome 컴포넌트
//상대경로
<section>
  <h1> Welcome! </h1>
  <Link to="new-user">Click</Link>
  <Route path="new-user">
    <p>new User!</p>
  </Route>
</section>
```

- 중첩 라우터를 위의 코드와 같이 사용할 수 있지만 아래와 같이 중첩 라우터를 쓸 수도 있다.
- 아래와 같이 작성하면 모든 라우터 정의를 한곳에 모을 수 있다는 장점이 있다.

  ```javascript
  function App() {
    return (
      <Fragment>
        <MainHeader />
        <main>
          <Routes>
            <Route path="/welcome/*" element={<Welcome />}>
              //중첩 라우터
              <Route path="new-user" element={<p>Welcome, new user!</p>} />
            </Route>
          </Routes>
        </main>
      </Fragment>
    );
  }
  ```

- 대신 위와 같이 작성하면 Welcome 컴포넌트의 어느 위치에 단락을 추가해야 하는지 정해줘야 한다.

##### Outlet 컴포넌트

- 셀프 클로징을 통해 간단히 작성하면 된다.
- 중첩된 라우트 콘텐츠를 삽입할 위치를 React Router에 알려주는 역할을 한다.

```javascript
import { Outlet } from "react-router-dom";

...

//welcome 컴포넌트
<section>
  <h1> Welcome! </h1>
  <Link to="new-user">Click</Link>
  <Outlet />
</section>;
```

##### uesHistory 삭제 -> useNavigate 훅 사용

- v5에서는 페이지 이동을 할 때 useHistory 훅을 통해 history 객체를 얻어 push를 호출하여 새 라우트를 푸시하거나 replace를 호출하여 라우트를 리디렉션 했음
- v6에서는 useNavigate 훅을 사용한다.

- navigate 함수를 실행하면 다른 위치로 이동할 수 있다.

```javascript
import { useNavigate } from 'react-router-dom';

...

const navigate = useNavigate();
//navigate 함수를 실행하면 다른 위치로 이동할 수 있다.
navigate('/welcome')
```

- 리디렉션하려면 두번째 인수를 객체로 전달하고 객체의 옵션 중 replace를 true로 설정한다.

```javascript
import { useNavigate } from 'react-router-dom';

...

const navigate = useNavigate();
//navigate 함수를 실행하면 다른 위치로 이동할 수 있다.
navigate('/welcome', {replace:true});
```

- navigate 함수에 숫자를 전달할 수도 있다

```javascript
import { useNavigate } from 'react-router-dom';

...

const navigate = useNavigate();

navigate(-1); // -1 이면 이전페이지
navigate(-2); // -2 이면 이전의 전 페이지
navigate(1); // 1 이면 다음페이지
```

##### Prompt

- v5에서 데이터를 입력하거나 할 때 실수로 화면이동을 하여 데이터가 사라지는 것을 방지하기 위해 Prompt 를 사용했는데, v6 는 사라졌음
- 프롬프트 같은 기능을 사용하기 위해서는 v5 를 고수하거나, v6 에서 직접 구현해야 함

### 리액트 라우터 V6.4

- 리액트 라우터의 데이터 Fetching 과 Submission을 간소화하는 주요 기능이 추가되었음

- 기존 사용하던 방식은 컴포넌트가 로드된 다음에야 데이터 페칭을 시작한다는 점

- 6.4 에서는 추가된 속성으로 loader 가 있음. loader에 설정된 함수를 라우트로 이동할 때마다 자동으로 호출하고 함수가 반환한 데이터를 자동으로 가져와서 사용할 수 있음
- 자동으로 생성된 데이터를 사용하려면 useLoaderData 훅을 사용해야함. 데이터에 접근할 수 있게 해줌

```javascript
import { useLoaderData } from 'react-router-dom';

import Posts from '../components/Posts';
import { getPosts } from '../util/api';

function BlogPostsPage() {
  const loaderData = useLoaderData();

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Posts blogPosts={loaderData} />
    </>
  );
}

export default BlogPostsPage;

export function loader() { // 이 함수를 내보내는게 중요함.
  return getPosts(); // 어떤 값을 반환하든 상관없지만 위 함수(BlogPostsPage)에서 사용하는 데이터를 리졸브 하는 프로미스여야 함
}

...

<Route index element={<BlogPostsPage />} loader={blogPostsLoader} />
```

- 6.4 버전의 새 기능을 사용하면 BrowerRouter를 사용할 수 없음
- 대신에 `RouterProvider` 컴포넌트를 사용해야 함
- `RouterProvider` 는 셀프 클로징 컴포넌트로 다른 컴포넌트를 포함할 수 없음. 대신 router 속성을 설정하고 속성에 함수로 생성한 라우터를 전달하면 됨

- 라우트를 설정할 때는 Routes 를 사용하면 안되고 나머지 라우트를 자식 라우트로 포함하는 큰 Route 하나를 설정해 줘야함

- index 라우트는 기본 라우트로 부모 라우트의 경로가 활성화되면 렌더링 된다.

```javascript
...

const router = createBrowserRouter(
  createRoutesFromElements(
    // Routes 말고 Route로 전체를 감싸준다.. ( 기존 '/' 경로를 갖던 라우트는 path 말고 index 라우트로 설정을 해준다.)
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<WelcomePage />} />
      <Route path="/blog" element={<BlogLayout />}>
        <Route index element={<BlogPostsPage />} loader={blogPostsLoader} />
        <Route
          path=":id"
          element={<PostDetailPage />}
          loader={blogPostLoader}
        />
      </Route>
      <Route
        path="/blog/new"
        element={<NewPostPage />}
        action={newPostAction}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

- 동적 경로 loader 설정
- loader 함수는 자동으로 객체를 생성하고 제공한다. 객체는 페이지 전환 관련 데이터를 포함한 request 객체이거나 params 객체이다.

```javascript
<Route
    path=":id"
    element={<PostDetailPage />}
    loader={blogPostLoader}
/>

...

// PostDetail
export function loader({ params }) {
  const postId = params.id;
return getPost(postId);
}

```

- 로딩상태는 걱정할 필요 없음 백그라운드에서 데이터를 가져온 후에만 페이지를 로드
- 에러는 errorElement 속성으로 설정

```javascript
<Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
```

- useRouterError 훅
- 에러 메시지를 받아 사용할 수있음

```javascript
import { useRouteError } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <MainNavigation />
      <main id="error-content">
        <h1>An error occurred!</h1>
        <p>{error.message}</p>
      </main>
    </>
  );
}

export default ErrorPage;
```

- `createRoutesFromElements` 와 라우트 배열로 작성하는 방법

```javascript
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<WelcomePage />} />
      <Route path="/blog" element={<BlogLayout />}>
        <Route index element={<BlogPostsPage />} loader={blogPostsLoader} />
        <Route
          path=":id"
          element={<PostDetailPage />}
          loader={blogPostLoader}
        />
      </Route>
      <Route
        path="/blog/new"
        element={<NewPostPage />}
        action={newPostAction}
      />
    </Route>
  )
);

/////////////////////////////////////////////////////////////////// 위 아래 코드 동작 결과가 동일함

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <WelcomePage />,
      },
      {
        path: "/blog",
        element: <BlogLayout />,
        children: [
          {
            path: "",
            element: <BlogPostsPage />,
            loader: blogPostsLoader,
          },
          {
            path: ":id",
            element: <PostDetailPage />,
            loader: blogPostLoader,
          },
        ],
      },
      {
        path: "/blog/new",
        element: <NewPostPage />,
        action: newPostAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```
