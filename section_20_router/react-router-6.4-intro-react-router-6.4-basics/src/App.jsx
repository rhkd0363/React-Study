import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";

import BlogLayout from "./pages/BlogLayout";
import BlogPostsPage, { loader as blogPostsLoader } from "./pages/BlogPosts";
import ErrorPage from "./pages/Error";
import NewPostPage, { action as newPostAction } from "./pages/NewPost";
import PostDetailPage, { loader as blogPostLoader } from "./pages/PostDetail";
import RootLayout from "./pages/RootLayout";
import WelcomePage from "./pages/Welcome";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
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

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "",
//         element: <WelcomePage />,
//       },
//       {
//         path: "/blog",
//         element: <BlogLayout />,
//         children: [
//           {
//             path: "",
//             element: <BlogPostsPage />,
//             loader: blogPostsLoader,
//           },
//           {
//             path: ":id",
//             element: <PostDetailPage />,
//             loader: blogPostLoader,
//           },
//         ],
//       },
//       {
//         path: "/blog/new",
//         element: <NewPostPage />,
//         action: newPostAction,
//       },
//     ],
//   },
// ]);

function App() {
  return (
    <div>
      <h1>안녕하세요</h1>
      <Outlet />
    </div>
  );
}

export default App;
