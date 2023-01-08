# 섹션 16 폼과 사용자 입력

### State, Ref
- 한번 사용하는 용도로는 ref가 적합
- 즉각적인 유효성 검사 등 계속 확인이 필요하거나 초기화할 때는 state가 적합 ( ref 로도 되는데 직접 DOM에 접근하는 방법으로 지양하는 것이 좋음 )
``` javascript
import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState();

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    console.log(enteredName);
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    setEnteredName("");
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
      <p>{enteredName}</p>
      <p>{nameInputRef.current.value}</p>
    </form>
  );
};

export default SimpleInput;
```