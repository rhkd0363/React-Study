# 섹션 8 연습 프로젝트

### 합성(Composition) 과 props.children
##### children이란?
- props.children
- 공식문서 : 어떤 컴포넌트들은 어떤 자식 엘리먼트가 들어올지 미리 예상할 수 없는 경우가 있다. 범용적인 '박스' 역할을 하는 Sidebar 등의 컴포넌트가 그렇다.
- 태그와 태그 사이의 모든 내용을 표시하기 위해 사용되는 특수한 props

- props.children을 사용하지 않으면 내부 컴포넌트가 동작하지 않을 수 있음

``` javascript
import React from "react";

import classes from "./Card.module.css";

const Card = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
```