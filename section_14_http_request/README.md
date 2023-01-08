# 섹션 14 HTTP 요청보내기

- async / await 코드
- 비동기 처리 문법으로 기존 callback이나 promise의 꼬리에 꼬리를 무는 콜백 지옥, then() 지옥의 단점을 해소하고자 만들어졌다.
- await 을 통해 promise의 반환 값을 받아 올 수 있으며, await은 async 함수 안에서만 동작한다.
- 하지만 에러 처리 시 .catch()로 에러 핸들링이 가능한 promise에 반해 async/await은 try-catch() 문을 활용해야 한다.

```javascript
// GET 방식
 const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedMovies = [];

      for(const key in data) {
        loadedMovies.push({
          id : key,
          title :  data[key].title,
          openingText : data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }

      const transformedMovies = data.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);


//POST 방식

 async function addMovieHandler(movie) {
    const response = await fetch(url,{
      method: 'POST',
      body : JSON.stringify(movie),
      headers:{
        'Content-Type' : 'application/json'
      }
    })
    const data =  await response.json();
    console.log(data);
  }
```
