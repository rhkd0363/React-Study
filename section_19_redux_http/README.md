# 섹션 19 리덕스와 비동기 통신

- 순수함수란?

  - 순수함수란 동일한 인자가 주어졌을 때 항상 동일한 결과를 반환하며 외부의 상태를 변경하지 않는 함수
  - 즉 함수 내 변수 외에 외부의 값을 참조, 의존하거나 변경하지 않는 것

- 리듀서는 반드시 순수함수여야한다.

  - 기존 STATE를 직접 수정하는 경우, 리덕스 내부의 변경 감지 알고리즘이 STATE 객체의 주소값을 비교하기 때문
  - 리듀서를 순수함수 형태로 반환한다면, 새로운 주소값이 생성되고 state가 변경됨을 감지하여, 변화를 적용시킴
  - 만약 기존 state 값을 직접 수정하게 된다면 원래 주소값이 유지된 채 해당 값만 바뀌게 되어 리덕스가 인지하지 못하는 상황이 발생

- 비동기 통신은 순수함수가 될 수 없음.

  - 비동기 통신은 Promise 객체를 반환값으로 갖기 때문, 또한 에러가 나는 상황도 존재하기에 값이 다르게 나타날 수도 있음
  - 동일한 인자가 주어질 때 항상 동일한 결과를 반환하는 것이 순수함수 이기에 비동기 통신은 순수함수가 될 수 없는 것

- 리듀서 외부에서는 리덕스 state를 변경하는 것은 좋지 않음( 리덕스 툴킷의 경우는 내부에 immer 라는 함수 때문에 리듀서 내부에서 변경해도 괜찮으나 외부는 직접 수정하면 감지 안되므로 외부에서는 state 직접 접근하면 X)

### useEffect 사용

- useEffect를 사용하여 처리
- 실행 순서에 주의하여 처리한다.
- state 가 변경되고, 해당 값이 변경됨을 감지하여 useEffect가 실행됨

```javascript
useEffect(() => {
  fetch("firebase-url/cart.json", {
    method: "PUT",
    body: JSON.stringify(cart),
  });
}, [cart]);
```

- 위의 코드는 간단한 http 요청을 하고 있으나, 좋지 않은 코드
- useEffect를 사용한 위 코드의 문제점은 앱이 실행될 떄 useEffect도 실행되어 빈 값으로 덮어씌워져 기존 값이 사라지는 것
- 또한 위의 요청은 응답에 대한 아무 작업도 없고 오류에 대한 처리부분도 없음
- 위의 코드에 fetch에 .then 이나 async를 같은 비동기를 추가하면 안됨

- 아래 코드를 통해 useEffect 로 비동기 통신구현

```javascript
useEffect(() => {
  const sendCartData = async () => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending..",
        message: "sending data",
      })
    );
    const response = await fetch("fb-url/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart),
    });

    if (!response.ok) {
      throw new Error("Failed");
    }
    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "success",
        message: "succecc",
      })
    );
  };

  if (isInitial) {
    // 처음 실행 시 비동기 통신 안되게 막기
    isInitial = false;
    return;
  }

  sendCartData().catch((error) => {
    dispatch(
      uiActions.showNotification({
        status: "error",
        title: "error",
        message: "error",
      })
    );
  });
}, [cart, dispatch]);
```

### Action Creator 사용

- Thunk란?
  - 다른 작업이 완료될 떄까지 작ㅇ버을 지연시키는 함수
  - 즉시 반환하지 않는 Action Creator 함수를 만들기 위해 Thunk 사용
  - 디스패치 전 다른 작업을 실행하기 위해서 사용

```javascript
// cart-slice에 작성하여 컴포넌트를 lean한 상태로 유지
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending..",
        message: "sending data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch("fb-url/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "error",
        })
      );
    }

    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "success",
        message: "success",
      })
    );
  };
};


...

//컴포넌트
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);


```
