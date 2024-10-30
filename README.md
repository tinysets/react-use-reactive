#   react-usereactive 
    Use Vue's reactivity system in React right now!

##  Useage:
```
npm install -S vue
npm install -S react-usereactive
```

[Live Demo](https://jt6nv9.csb.app/)

Example: App.tsx
```ts
import { reactive } from "vue";
import { useReactive } from "react-usereactive";

interface IPerson {
  name: string;
  age: number;
}

let obj = reactive({
  data: {
    persons: [
      { name: "foo", age: 1 },
      { name: "bar", age: 2 },
    ],
  },
});

setTimeout(() => {
  console.log("[push] person ====================");
  obj.data.persons.push({ name: "qux", age: 3 });
}, 3000);

setTimeout(() => {
  console.log("[delete] person ====================");
  obj.data.persons.splice(0, 1);
}, 6000);

function Person({ person }: { person: IPerson }) {
  return useReactive(() => {
    return (
      <div>
        <div>{`${person.name}: ${person.age}`}</div>
        <button
          onClick={() => {
            person.age++;
          }}
        >{`Add [${person.name}] Age`}</button>
      </div>
    );
  });
}

function App() {
  return useReactive(() => {
    return (
      <div>
        {obj.data.persons.map((item, id) => (
          <Person key={id} person={item}></Person>
        ))}
      </div>
    );
  });
}

export default App;
```