# React component tree view

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

Tree structure

```
type Tree = Array<{
  id: number;
  title: string;
  children?: INode[];
}>
```

### Example

```
const onAdd = (title: string, parentId?: number) => {
    console.log('Add', title, parentId);
    return Promise.resolve();
  }

  const onUpdate = (id: number, newTitle: string) => {
    console.log('Update', id, newTitle);
    return Promise.resolve();
  }

  const onRemove = (id: number) => {
    console.log('Remove', id);
    return Promise.resolve();
  }

  return <Tree tree={tree} onAdd={onAdd} onUpdate={onUpdate} onRemove={onRemove} />;
```


### Demo
![Game](https://github.com/deonisiy95/react_tree/blob/main/demo.gif?raw=true)
