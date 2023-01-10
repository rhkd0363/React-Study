import { Fragment } from "react";
import Counter from "./components/Counter";
import Headers from "./components/Header";
import Auth from './components/Auth'
import UserProfile from "./components/UserProfile";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  return (
    <Fragment>
      <Headers />
      {!isAuth ? <Auth/> : <UserProfile/>}
      <Counter />
    </Fragment>
  );
}

export default App;
