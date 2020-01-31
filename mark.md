### 2.

---

### 3. 클로져(Closure)는 무엇이며, 어떻게 / 왜 사용하는지 설명해주세요

클로져를 제대로 이해하기 위해서는 javascript의* `scope`, `scope chain`,`context`*에 대한 이해가 선행 되어야 한다.

간단히 설명하지면 클로저는 현재의 유효범위를 넘어 scope chain으로 연결되어 있는 객체,변수등의 참조를 발생시키는 것을 말한다.

javascript는 실행코드 블럭 단위로 context를 스택에 쌓게 되고 push,pop을 통해 코드블럭이 실행된다. 이때 각각의 실행 코드 블럭이 수행되는 시점에서 실행 솬경을 저장하게 되는데 이는 실행 유효범위인 scope에 의해 결정된다.

이 scope는 chain 구조로 연결되어 있어 현재 실행 시점 이전의 scope를 타고 올라가는 형태로 참조 되기 때문에 현재 scope에 선언되지 않는 객체 참조가 가능하다.

이는 java등의 언어만 다루던 사람들에겐 좀 의아한 모습으로 동작한다. local 변수와 global 변수의 경계와 유효범위 설정에 대한 이해를 한 번에 무너트려버리기 때문이다.

> MDN :클로저(외부함수)는 독립적인(자유)변수를 가리키는 **함수**이다. 클로저 안에 정의된 함수는(내부함수) 만들어진 환경을 **기억한다**

흔히 함수 내에서 함수를 정의하고 사용하면 클로저라고 한다. 하지만 대개는 정의한 함수를 리턴하고 사용은 바깥에서 하게 된다.

```javascript
1  function getClosure() {
2   var text = "variable 1";
3   return function() {
4     return text;
5   };
6  }
7
8  var closure = getClosure();
9  console.log(closure()); // 'variable 1 '
```

위에서 정의한 getClosure()는 함수를 반환하고, 반환된 함수는 getClosure() 내부에서 선언된 변수를 참조하고 있다. 또한 이렇게 참조된 변수는 함수 실행이 끝났다고 해서 사라지지 않았고, 여전히 제대로 된 값을 반환하고 있는 걸 알 수 있다.

여기서 반환된 함수가 클로저인데. MDN에서 정의된 내용에서도 말했듯 환경을 기억하고 있는 것처럼 보인다.

++클로저는 Private한 변수들을 관리할 때 사용한다. 즉, 외부에서 쉽게 접근할 수 없는 변수를 설정할 때 클로저 함수를 사용하면 된다.

_클로저의 성능_

클로저는 각자의 환경을 가진다.<br/>
이 환경을 기억하기 위해서는 당연히 메모리가 소모될 것이다. 클로저를 생성해놓고 참조를 제거하지 않는 것은 C++에서 동적할당으로 객체를 생성해놓고 delete를 사용하지 않는 것과 비슷하다. 클로저를 통해 내부 변수를 참조하는 동안에는 내부 변수가 차지하는 메모리를 GC가 회수하지 않는다.<br/>

> GC : 가바지 콜렉터 (Garbage Collecto) <br/> 가비지는 '정리되지 않은 메모리','유효하지 않은 메모리 주소'를 말한다.

따라서 클로저 사용이 끝나면 참조를 제거하는 것이 좋다.

---

### 4. 익명함수(anonymous funciton)는 주로 어떤 상황에서 사용하나요?

익명함수의 사용은 함수 선언이 아닌 함수표현식을 이용하는 방법이다. 이는 곧 람다 함수(함수 리터럴을 변수에 할당하는 방식)와 즉시실행수문을 만들어 낼 수 있다는 말이다.

> _람다함수 (Lambda function)_
>
> 람다식 또는 람다 함수는 프로그래밍 언어에서 사용되는 개념으로 익명 함수를 지칭하는 용어이다.

이처럼 즉시실행 구문을 사용하면 javascript가 유효범위를 선언 할 수 없다고 해도 강제적으로 private 변수를 만들어 내는 것이 가능하다.

```javascript
1   (function() {
2     var i = "hello world";
3   })();
4
5   console.log(i); //error
```

즉, 익명함수는 동적으로 할당되는 유효범위를 가지기 때문에 javascript 내에서 강제적인 유효범위 설정을 하는 경우 사용하게 됩니다.

---

### 5. "Javascript 모듈 패턴(Javascript module pattern)"이 무엇인지 설명을 해주시고, 언제 사용하는지도 말씀해주시기 바랍니다.

javascript의 모듈 패턴은 javascript의 코드 관리 기법 중 하나로서 javascript의 특성상 객체 핸들링을 위한 방법론 중 하나이다.

javascript의 모듈 패턴은 일번적인 유효범위를 설정하는 언어에서와 같이 `private`와 `public` 등의 캡슐화를 사용하는 방법이다.

javascript에서 함수 혹은 변수객체를 다룰 때 중복된 name 사용으로 인한 문제를 방지하기 위해 주로 namespace 방법이 사용된다. 이는 global 영역에 객체 고유의 영역을 지정하고 변수와 함수 할당을 해당 namespace 하위로 두게 하여 중복된 name으로 인한 오류를 피하는 방법이다.

모듈 패턴은 이 namespace 패턴에 **언어적 유효범위**를 추가 해놓은 것이라 이해하면 쉽다.

모듈을 작성함에 있어서 return 구문을 이용하여 공개할 영역과 내부적으로 처리할 영역을 구분하여 공개여부를 선택하게 하는 것이다.

```javascript
 // namespace 패턴
 var myApp = myApp || {}; // namespace 선언

 myApp.insanehong = function(){
     return 'insanehong'
 };

 myApp.helloworld = funcion(){
     return 'hello world'
 };
```

```javascript
 // 모듈 패턴
 var Message = {h:'hello',W:'world',insane:'insanehong'};

 var myApp = (function(msg){
     // private
     var helloworld = msg.h+''+msg.w;
     var helloinsanehong = msg.h+''msg.insane;

     // public
     var printInsane = function(){
         return helloinsanehong;
     };

     var printHello = function(){
         return helloworld;
     }

     return {
         foo1 : printInsane,
         foo2 : printHello
     };
 })(Messages);

 // public 접근
 console.log(myApp.foo1()); // hello insanehong

 // private 접근
 console.log(myApp.helloworld); // undefined
```

추가

## [디자인 패턴 For Javascript] Module Pattern

_Yuby`s Lab_ 블로그 참조했습니다.
https://yubylab.tistory.com/entry/%eb%94%94%ec%9e%90%ec%9d%b8-%ed%8c%a8%ed%84%b4-for-javascript-module-pattern

자바스크립트에서는 모듈을 구현하기 위한 몇가지 방법이 있습니다.

- The Module pattern
- Object literal notation
- AMD modules
- CommonJS modules
- ECMAScript Harmony modules

Module pattern은 기본적으로 객체 리터럴에 기반을 두고 있으므로 우리의 지식을 환기 시키는 것이 좋습니다.

#### Object Literals

객체 리터럴 표현에서 객체는 콤마로 구분되는 키/값 형태로 Curry braces{} 안에 위치하게 됩니다. 객체의 일반적인 형태는 다음과 같습니다.

```javascript
1   var myObjectLiteral = {
2     variableKey: variableValue,
3     functionKey: function() {
4       // ...
5     }
6   };
```

객체의 경우에는 new를 사용한 초기화가 필요가 없습니다.
그냥 중괄호의 시작으로 객체의 시작을 나타낼 수 있습니다. 객체의 밖에서는 Dot표현으로 새로운 멤버를 추가하는 것이 가능합니다.

`myModule.property = "someValue";`

위와 같은 객체표현으로 코드를 캡슐화 하거나 구조화 시키는 것이 가능합니다.

##### The Module Pattern

일반적으로 Module Pattern은 원래 기존의 소프트웨어 엔지니어링에서 클래스에 대한 private과 public한 캡슐화를 제공하는 방법으로 정의되었습니다.
자바스크립트에서 Module Pattern은 클래스의 컨셉을 모방해서(ES6 이전/ ES6 이후부터는 클래스를 지원) private, public 메서드 모두를 포함 시킬 수가 있고 단일 객체 내의 변수를 포함할 수 있습니다.
이렇게 하면 특정 부분의 전역 스코프로부터 보호하는 것이 가능해집니다.
이런 특성의 결과로 우리는 동일 페이지 내에서도 함수 이름이나 변수가 충돌하는 것을 예방할 수 있습니다.

```javascript
first.imMethod();
second.imMethod();
```

동일한 메서드 이름을 사용하지만 전혀 다른 스코프 상에 존재하는 메서드이기에 아무런 문제가 없습니다.

---

### CommonJS와 AMD

_네이버 D2-helloworld_ 에서 공부했습니다.
https://d2.naver.com/helloworld/12864

범용적인 목적으로 JavaScript를 사용하기 위해 필요한 선결 조건은 모듈화입니다. Node.js도 이런 모듈화 작업때문에 탄생할 수 있었습니다.
JavaScript 모듈화 작업의 선두 주자는 CommonJS와 AMD입니다.

#### CommonJS

CommonJS는 JavaScript를 브라우저에서뿐만 아니라, 서버 사이드 애플리케이션이나 데스크톱 애플리케이션에서도 사용하려고 조작한 자발적 워킹 그룹이다. CommonJS의 'Common'은 JavaScript를 브라우저에서만 사용하는 언어가 아닌 일반적인 범용 언어로 사용할 수 있도록 하겠다는 의지를 나타내고 있는 것이라고 이해할 수 있다.

모듈화는 아래와 같이 세 부분으로 이루어진다.

- 스코프(Scope) : 모든 모듈은 자신만의 독립적인 실행 영역이 있어야 한다.
- 정의(Definition) : 모둘 정의는 exports 객체를 이용한다.
- 사용(Usage) : 모듈 사용은 require 함수를 이용한다.

1\. 스코프(Scope)

먼저 모듈은 자신만의 독립적인 실행 영역이 있어야 한다.
따라서 전역변수와 지역변수를 분리하는 것이 매우 중요하다. 서버사이드 JavaScript의 경우에는 파일마다 독립적인 파일 스코프가 있기 때문에 파일 하나- 모듈 하나를 작성하면 간단히 해결된다.
즉 서버사이드 JavaScript는 아래와 같이 작성하더라도 전역변수가 겹치지 않는다.

_fileA.js_

```javascript
1   var a = 3;
2   b = 4;
```

_fileB.js_

```javascript
1   var a = 5;
2   b = 6;
```

2\. 정의 (Definition)

그리고 두 모듈(파일) 사이에 정보 교환이 필요하다면, exports라는 전역객체를 통해 공유하게 된다. 아래 예제에서는 fileA.js 파일의 sum함수가 외부로 공개된다.

_fileA.js_

```javascript
1   var a = 3;
2   b = 4;
3   exports.sum = function(c, d) {
4     return a + b + c + d;
5   };
```

3\. 사용(Usage)

이렇게 공개된 함수를 다른 모듈에서 사용하려면, 다음과 같이 require() 함수를 이용한다.

_fileB.js_

```javascript
1   var a = 5;
2   b = 6;
3   var moduleA = require("fileA");
4   moduleA.sum(a, b);
5   // 3 + 4 + 5 + 6 = 18
```

위의 예에서 CommonJS의 모듈 명세는 모든 파일이 로컬 디스크에 있어 필요할 때 바로 불러 올 수 있는 상황을 전제로 한다. 다시 말해 서버사이드 JavaScript 환경을 전제로 한다.

하지만 이런 방식은 브라우저에서는 필요한 모듈을 모두 내려받을 때까지 아무것도 할 수 없게되는 치명적인 단점이 된다.

이러한 비동기 모듈 로드 문제를 해결하기 위해 CommonJS는 서버 모듈을 클라이언트에 전송할 수 있는 모듈 전송 포맷(module transport format)을 추가로 정의했다. 이 명세에 따라 서버사이드에서 사용하는 모듈을 다음 예의 브라우저에서 사용하는 모듈과 같이 전송 포맷으로 감싸면 서버 모듈을 비동기적으로 로드할 수 있게 된다.

<p style="text-align : center">서버사이드에서 사용하는 모듈</p>

```javascript
1   // complex-number/plus-two.js
2   var sum = requires("./math").sum;
3   exports.plusTwo = function(a){
4   return sum(a,2);
5   }
```

<p style="text-align : center">브라우저에서 사용하는 모듈</p>

```javascript
1   // complex-numbers/plus-two.js
2   require.define(
3    {
4        "complex-numbers/plus-two" :
5       function(require, exports){
6           //콜백 함수 안에 모듈을 정의한다.
7           var sum = require("./complex-number").sum;
8           exports.plusTwo = function(a){
9       return sum(a, 2);
10       };
11  },["complex-numbers/math"]);
12  //먼저 로드되어야 할 모듈을 기술한다.
```

브라우저에서 사용하는 모듈 부분에서 특히 주목해야 할 것은 require.define() 함수를 통해(함수 클로저) 전역변수를 통제하고 있다는 사실이다.

#### AMD

JavaScript 표준 API 라이브러리 제작 그룹에는 CommonJS만 있는 것이 아니고, AMD(Asynchronous Module Definition)라는 그룹도 있다.
AMD 그룹은 비동기 상황에서도 JavaScript 모듈을 쓰기 위해 CommonJS에서 함께 논의하다 합의점을 이루지 못하고 독립한 그룹이다.

본래 CommonJS가 JavaScript를 브라우저 밖으로 꺼내기 위한 노력의 일환으로 탄생했기 때문에 브라우저 내에서의 실행에 중점을 두었던 AMD와는 합의를 이끌어 내지 못하고 결국 분리되었다.

###### define() 함수

define() 함수는 전역함수로 다음과 같이 정의한다.
`define(id?, dependencies?, factory);`

첫 번째 인수 id는 모듈을 식별하는데 사용하는 인수로, 선택적으로 사용한다. id가 없으면 로더가 요청하는 < script > 태그의 src 값을 기본 id로 설정한다. 특별히 명시할 필요가 없다면 사용하지 않는다. 만약 id를 명시한다면 파일의 절대 경로를 식별자로 지정해야 한다.

두 번째 인수는 정의하려는 모듈의 의존성을 나타내는 배열로, 반드시 먼저 로드돼야 하는 모듈을 나타낸다. 이렇게 먼저 로드된 모듈은 세 번째 인수인 팩토리 함수의 인수로 넘겨진다. 두 번째 인수 역시 선택적으로 사용하지만, 생략한다면 ['require', 'exports', 'module']이라는 이름이 기본으로 지정된다. 그리고 이 세가지 모듈은 CommonJS에서 정의한 전역객체와 동일한 역할을 하게 된다.

세 번째 인수는 팩토리 함수로, 모듈이나 객체를 인스턴스화하는 실제 구현을 담당한다. 만약 팩토리 인수가 함수라면 싱글톤으로 한 번만 실행되고, 반환되는 값이 있다면 그 값을 exports 객체의 속성값으로 할당한다. 반면에 팩토리 인수가 객체라면 exports 객체의 속성값으로 할당된다.

---

### 6. 호스트 객체(Host Object)와 네이티브 객체(Native Object)의 차이점은 무엇인가요?

_poiemaweb.com_ 에서 공부했습니다.
https://poiemaweb.com/js-built-in-object

<img src="https://poiemaweb.com/img/objects.png" style="margin:30px 0"/>

1\. 네이티브 객체

네이티브 객체는(Native Objects / Built-in Objects / Global Objects) ECMAScript 명세서에 정의된 객체를 말하며 애플리케이션 전역의 공통 기능을 제공한다.
네이티브 객체는 애플리케이션의 환경과 관계 없이 언제나 사용할 수 있다.

Object, String, Number, Function, Array, Date ... 와 같은 객체 생성에 관계가 있는 함수 객체와 메소드로 구성된다.

네이티브 객체를 Global Object라고 부르기도 하는데 이것은 전역 객체(Global Object)와 다른 의미로 사용되므로 혼동에 주의해야 한다.

전역객체(Global Object)는 모든 객체의 최상위 객체를 의미하며 일반적으로
Browser-side에서는 `window`
Server-side(Node.js)에서는 `global` 객체를 의미한다.

2\. 호스트 객체

호스트 객체(Host Object)는 브라우저 환경에서 제공하는 `window`, `XmlHttpRequest`, `HTMLElement` 등의 DOM 노드 객체와 같이 호스트 환경에 정의된 객체를 말한다. 예를 들어 브라우저에서 동작하는 환경과 브라우저 외부에서 동작하는 환경의 자바스크립트(Node.js)는 다른 호스트 객체를 사용할 수 있다.

브라우저에서 동작하는 환경의 호스트 객체는
전역 객체인 window,
BOM(Browser Object Model)과
DOM(Document Object Model) 및
XMLHttpRequest 객체 등을 제공한다.

---

### 7. function foo(){}와 <br/> var foo = function(){}에서 foo의 차이가 무엇인가요?

`function foo(){}`
에서 foo는 **함수 문장**

`var foo = function(){}`
에서 foo는 **코드 실행에 따른 결과 값을 갖는 변수**

#### 함수 선언(function declaration)이란?

함수 선언은 function statement라고도 하며 말 그대로 함수 문장이라는 뜻이다.
이는 _**곧 실행 가능한 코드 블럭이 아니며**_ 함수의 정의를 나타내는 문장으로 해석되며 따라서 _**코드 해석에 따른 수행결과가 존재하지 않는다.**_

#### 함수 표현(function expression)이란?

함수표현은 function Literal이다.
이는 실행 가능한 코드로 해석 되어지거나 변수나 데이터 구조에(=연산자에 의해)할당 되어지도 있음을 의미한다.
즉, 해당 코드 블럭이 _**실행코드로서 해석되어지며**_ 동시에 _**코드 실행에 따른 결과 값을 가지거나 특정 변수에 할당된 값으로 존재한다.**_

---

### 7-1. 다음 코드의 차이점은 무엇인가요

```javascript
function Person() {}
var person = Person();
var person = new Person();
```

`function Person(){}`
위 코드는 함수 선언이다.
이는 함수 객체 생성을 위한 기본 그릇이 되며 prototype이 참조할 함수객체의 환경을 담고 있다.
global scope에서는 Person이라는 함수가 선언되었다는 것만을 저장하면 내부 구현 로직은 알지 못한다.

`var person = Person()`
위 코드는 함수 수행에 따른 결과를 변수에 저장한다는 의미이다.

`var person = new Person()`
위 코드는 person 변수에 Person 함수 객체를 생성하여 할당한다는 의미가 된다. 이때 할당되는 객체는 Person 함수의 프로토타입을 기반으로 생성된다.

### 8. .call과 .apply의 차이점은 무엇인가요?

Funciton.prototype 이 소유한 함수를 호출하는 method이다.
이들은 함수와 메서드가 실행될 때 바인딩할 객체를 지정하여 함수가 실행될 때의 context의 유효범위를 직접 지정하며 this를 할당할 수 있다.

이들은 호출의 동적인 변화에 따라 각각 다르게 되는데
정적인 호출의 경우 .call을
동적인 호출의 경우 .apply를 사용하게 된다.
즉, 호출시 동적인 인자 전달등이 필요할 경우 apply / 정적으로 고정된 함수를 호출할 경우 .call을 사용하면 된다.

`bind()` 메소드나 동적 callback을 구현할 때 apply가 사용되는 이유이기도 하다.

---

### 8.1 Function.prototype.bind 를 설명하시오

함수 객체는 실행 시점에서 `execution context`를 생성하며 현재의 실행 코드 범위를 뜻하는 `this` 를 할당하게 된다.

하지만 this를 동적으로 할당해야 하는 경우가 있다. 특히 다양한 객체에서 동적으로 특정 액션을 할당하여 사용하는 함수의 경우 this에 할당되는 객체를 예측하기 힘들다.

이럴때 bind를 이용하여 실행 시점에서 context의 this를 임의로 할당해 주어 동적인 호출시에도 오류 없이 코드가 동작하게 할 수 있다.

---

### 8.2 The Exexcution Context(실행 컨텍스트)와 Hoisting

_@imacoolgirlyo_ 님의 velog를 보며 공부했습니다.
https://velog.io/@imacoolgirlyo/JS-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-Hoisting-The-Execution-Context-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8-6bjsmmlmgy

실행 컨텍스트란
자바스크립트 코드가 실행되고 연산되는 범위를 나타내는 추상적인 개념이다. 코드가 실행된다면 실행 컨텍스트 내부에서 실행되고 있는 것이다.
실행 컨택스트가 어떻게 만들어지고 변수와 함수는 어느 범위 안에서만 사용 가능한지 알아보자.

**Types of Exection Context**

- Global Execution Context : 가장 베이스가 되는 실행 구역이다. 특정 '함수' 안에서 실행되는 코드가 아니라면 코드는 전역 컨텍스트에서 실행된다. 전역 컨텍스트에서는 두 가지 일이 이루어지는데
1) window 오브젝트인 전역 컨텍스트를 생성하고 
2) this를 global object로 할당한다. 

- Functional Execution Context : 함수가 호출될 때마다, 해당 함수에 대한 실행 컨텍스트가 생성된다. 각각의 함수들은 자신만의 실행 컨텍스트를 가지지만 실행 컨텍스트는 함수가 호출이 되어야 만들어진다. 

    ## Execution Stack (호출 스택)과 함수 실행 순서 

    다른 프로그래밍 언어에서 불리는 호출 스택과 Execution Stack은 같은 말이다. 스택은 LIFO 자료구조로 (Stack) 코드가 실행하면서 만드는 실행 컨텍스트들이 저장되는 구조이다. 

    자바스크립트 엔진이 script 태그를 처음 만나면 전역 컨텍스트를 만들고 현재 실행되고 있는 호출 스택에 이를 push한다. 다른 함수가 호출되면 해당 함수에 대한 실행 컨텍스트를 생성하고 스택의 제일 꼭대기에 push한다. 

    자바스크립트 엔진은 실행 컨텍스트가 호출 스택에서 가장 위에 있는 함수를 실행하며 함수가 할 일을 마치면 스택에서 제거 된다. (pop)

This binding 
글로벌 실행 컨텍스트에서 this는 global object이다. 
함수 실행 컨텍스트에서 this 값은 함수가 어떻게 호출되었는지에 따라 달라진다. 

만약 함수가 object reference로 호출 되었다면 this는 해당 인스턴스(객체)를 가리키게 된다. 

그렇지 않으면 this는 글로벌 객체(Window)를 가리키거나 strict mode에서는 `undefined` 를 가리키고 있다. 


    ## 함수 표현식과 함수 선언의 차이점 : 호이스팅 

    함수 표현식은 호이스팅이 되지 않고
    함수 선언으로 선언된 함수는 호이스팅이 된다. 
    즉, 함수가 정의되기 전에 함수를 호출할 수 있다. 

    Hoisting의 개념 : 자바스크립트 엔진이 script 태그를 만나면 자바스크립트 파일을 먼저 쭉 읽으면서 선언된 변수와 함수를 메모리에 저장한다. 이 과정이 끝나면 코드가 위에서부터 차례대로 실행되기 때문에 함수 선언식은 호이스팅이 가능하지만 함수 표현식은 아직 값이 할당되기 전이기 때문에 에러가 발생한다. 



---

### 브라우저의 렌더링 과정에 대해서 상세하게 설명해달라

_네이버 D2- helloworld_ 에서 공부했습니다.
https://d2.naver.com/helloworld/59361
_memory.today_ 블로그에서 공부했습니다.
https://memory.today/dev/36

렌더링 엔진의 역할은 "요청 받은 내용을 브라우저 화면에 표시하는 일"이다.

**동작 과정**

1. 객체 모델 생성
   1-1 변환 (conversion) (HTML 파싱)
   1-2 토큰화 (Tokenizing)
   1-3 렉싱 (Lexing)
   1-4 DOM 생성 (DOM construction)
   1-5 CSSOM (CSS Object Model) (CSS 파싱)
2. 렌더 트리 (Render Tree)
3. 레이아웃 & 리플로우 (Layout & Reflow)
4. 페인트 & 레스터라이징 (Paint & Rasterizing)
5. 합성 & 렌더 (Composite & Render)

1-1 변환 (파싱)
<img src="https://d2.naver.com/content/images/2015/06/helloworld-59361-9.png" style="width : 300px height: 300px"><br/>
_파싱 과정_

브라우저가 HTML 파일을 디스크나 네트워크에서 읽어온 뒤 해당 파일에 지정된 인코딩 (예 : UTF-8)으로 변환한다.

1-2 토큰화
<img src="https://d2.naver.com/content/images/2015/06/helloworld-59361-11.png" style="width : 300px height: 300px"><br/>

다음으로 HTML 파일 문자열을 W3C HTML5 표준에 지정된 고유 토큰으로 변환한다. 예를들면 `<html>` ,`<body>` 같이 흔히 말하는 태그에서 사용된 문자열을 토큰화하는 것이다. 이런 각각의 토큰들은 특별한 의미와 규칙을 가진다.

1-3 렉싱

반환된 토큰은 각각의 속성 및 규칙을 정의하는 '객체'로 변환된다.

1-4 DOM 생성

마지막으로 생성된 객체를 트리 데이터 구조로 연결시킨다.
이 트리 데이터 구조는 부모-자식 관계도 포함되며, 우리가 알고 있는 HTML이 생성 되는 것이다.

<img src="https://d2.naver.com/content/images/2015/06/helloworld-59361-8.png" style="width : 300px height: 300px"><br/>
1-5 CSSOM

브라우저가 HTML을 파싱하는 과정에서 대부분은 head 태그의 하위로 link태그가 존재해 CSS파일을 불러오게 된다. CSS 파일을 불러온 뒤, HTML과 마찬가지로 브라우저가 이해하고 처리할 수 있는 형식으로 변환해야 한다.
그 과정은 HTML과 동일하지만 결과는 CSSOM이라고 부르며 DOM트리와 마찬가지로 트리구조라 CSSOM 트리라고 부른다.

2/. 렌더 트리

앞서 만든 DOM 트리와 CSSOM 트리는 서로 연관이 없는 독립적인 객체이다.
DOM 트리는 콘텐츠를
CSSOM은 문서에 적용되어야할 스타일 규칙을 의미한다.

따라서 이 단계에서 이 두개의 트리를 결합하여 렌더 트리를 생성한다.
<img src="https://memory.today/dev/36/render-tree.png" style="width : 300px height: 300px"><br/>

렌더 트리는 DOM 트리의 최상위 노드부터 각각의 노드를 탐색하여 렌더링에 필요한 노드들을 CSSOM 트리와 일치시켜 생성한다.
그리고 DOM 트리를 탐색하는 과정에서 렌더링 출력에 반영되지 않는 불필요한 노드들은 건너뛰게 된다. 예를 들면 ` <script>``<meta> ` 태그 같은 것들이 있다.

또한 `display : none`처럼 css를 통해 렌더링 출력에 반영되지 않는 노드들도 실제 화면에서 렌더링이 되지 않기때문에 렌더 트리에서 제외된다.

다만 `visibility : hidden` 속성은 렌더 트리에 포함된다. 렌더링이 되더라도 여전히 레이아웃에서 공간을 차지하기 때문이다.

3/. 레이아웃 & 리플로우

렌더 트리는 DOM트리와 CSSOM 트리에 의해 정의된 스타일만 계산하였다. 하지만 기기의 뷰포트(viewport) 내에서의 정확한 위치 및 크기는 계산되지 않았다.

    예를 들어 CSS에 `width : 50%`로 정의되어 있다고 하면, 실제 브라우저에서 표현되는 정확한 사이즈는 계산되지 않았다는 의미이다.

따라서 브라우저에 출력하기 전 실제 출력되는 정확한 위치와 크기를 계산하여야 한다. 그 단계가 레이아웃 또는 리플로우 단계라고 한다.
이 단계에서 실제 픽셀 값을 구하여 박스 모델(Box Model)을 출력한다.

<img src="https://memory.today/dev/36/box-model.png" style="width : 300px height: 300px"><br/>

박스 모델의 넓이는 뷰포트 기준으로 측정되고
높이는 Contents(fonts) 기준으로 측정된다.
따라서 윈도우 사이즈를 변경하거나 폰트를 변경하면 리플로우가 다시 발생하게 되는 것이다.

4/. 페인트 & 레스터라이징

페인트 단계에서는 위치나 크기를 제외한 나머지 색상이나 투명도 같은 CSS 속성들을 적용한다.

5/. 합성 & 렌더

페인트 단계까지 완료된 객체들은 실제 위치 및 크기, 색상 같은 스타일이 모두 정해졌다.

이후 마지막 합성 단계에서는 모든 객체들을 조합하여 실제 브라우저 화면을 업데이트한다.
