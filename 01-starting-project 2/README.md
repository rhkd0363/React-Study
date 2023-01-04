# 유데미 섹션 6 ~ 내용정리

### 템플릿 리터럴을 사용한 동적 CSS
- 템플릿 리터럴을 사용하여 조건식을 이용 클래스를 변경할 수 있다.
- 동적으로 사용하기 위해 className='' 아닌 className= {} 중괄호 사용
- `${}` 를 사용하여 값 표현
``` javascript
//백틱 사용
className={`form-control ${!isValid ? 'invalid' : ''}`};
```

---

### styled Components
- npm install --save styled-components 명령어를 통해 다운로드

- 태그 템플릿 리스트
``` javascript
- const Button = styled.button`font: inherit;
    padding: 0.5rem 1.5rem;
    border: 1px solid #8b005d;
    color: white;
    background: #8b005d;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
    cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover,
  &:active {
    background: #ac0e77;
    border-color: #ac0e77;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
  }`;
```
- styled-components에 의해 전역 CSS 로 등록되어도 해당되는 컴포넌트에만 적용된다
- .form-controll 이라는 선택자가 있다면 지워준다
- 중첩되는 요소를 사용하는 경우는 가상선택자 &로 변경해준다.
``` javascript
- const Button = styled.button`font: inherit;
  .button {
    color: red;
  }
  .button:hover
----------------------------- 변경 후
  color:red;
  &:hover
```

- 아래와 같이 동적으로 사용가능
``` javascript
<FormControl className={!isValid && 'invalid'}>

//또는

const FormControl = styled.div`
& input {
    display: block;
    width: 100%;
    border: 1px solid ${(props) => (props.invalid ? "red" : "#ccc")};
    font: inherit;
    line-height: 1.5rem;
    padding: 0 0.25rem;
  }
`
...
<FormControl invalid={!isValid}>
```

---

### 미디어 쿼리
- 미디어 쿼리는 @media (){} 로 작성
- 미디어 쿼리 @media ( 조건 ) 괄호안의 조건을 만족하면 동작
``` javascript
  @media (min-width:768px){ 
    width:auto;
  }
```

---

### CSS 모듈 사용하기

- `import styles from './Button.css'` 와 같이 작성해야 CSS 모듈을 사용할 수 있다.
- 코드 변환을 위해서는 css파일 이름을 .module.css 로 변경해 줘야한다.
- `<button className={styles.button}>` 와 같이 작성한다.
- 컴포넌트이름_클래스이름_고유해시값으로 클래스명이 변경된다.
- 아래와 같이 사용하여 동적으로 사용 가능하다.(styles 사용하려면 얘도 ${}로 감싸야함. 문자열이 아니기때문에)
``` javascript
<div className={`${styles['form-control']} ${!isValid && styles.invalid}`}>
```