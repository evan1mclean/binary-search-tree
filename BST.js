const node = (data = null, left = null, right = null) => {
  return { data, left, right };
};

const Tree = (array) => {
  let root = null;
  //removes duplicates and sorts array in asscending order
  const filteredArray = [...new Set(array)].sort((a, b) => a - b);

  const setRoot = () => {
    root = buildTree();
  };

  const getRoot = () => {
    return root;
  };


  const insert = (value, rootNode = getRoot()) => {
    //if the tree is empty, create a new node and set it to root
    if (rootNode === null) {
      return (rootNode = node(value));
    }
    //if value already exists, just return
    if (value === rootNode.data) return rootNode;
    //otherwise, recur down the tree
    if (value < rootNode.data) {
      rootNode.left = insert(value, rootNode.left);
    } else {
      rootNode.right = insert(value, rootNode.right);
    }
    //return the unchanged rootNode pointer
    return rootNode;
  };

  const deleteNode = (value, rootNode = getRoot()) => {
    //if the tree is empty, return the root node
    if (rootNode === null) {
      return rootNode;
    }
    //otherwise, recur down the tree
    if (value < rootNode.data) {
      rootNode.left = deleteNode(value, rootNode.left);
    } else if (value > rootNode.data) {
      rootNode.right = deleteNode(value, rootNode.right);
    } 
    //if value matches the same as the root nodes data
    else {
      //if node only has 1 child
      if (rootNode.left === null) {
        return rootNode.right;
      } else if (rootNode.right === null) {
        return rootNode.left;
      }
      //if node has two children, return the inorder successor (smallest value in the right subtree)
      rootNode.data = minValue(rootNode.right);
      //delete the inorder successor
      rootNode.right = deleteNode(rootNode.data, rootNode.right);
    }
    return rootNode;
  };

  //finds the minimum value given a root node
  const minValue = (rootNode) => {
    let minV = rootNode.data;
    while (rootNode.left != null) {
      minV = rootNode.left.data;
      rootNode = rootNode.left;
    }
    return minV;
  };

  //builds the tree given an array
  const buildTree = (array = filteredArray) => {
    const start = 0;
    const end = array.length - 1;
    //if array start index is greater or equal to the end, return null
    if (start >= end) {
      return null;
    }
    //find the mid point of the array and create a new node with it
    const mid = Math.ceil(end / 2);
    const newNode = node(array[mid]);
    //recurrsively set the left pointer with the left half of the arrray, and then the same thing with the right
    newNode.left = buildTree(array.slice(0, mid));
    newNode.right = buildTree(array.slice(mid));
    return newNode;
  };

  return { setRoot, getRoot, insert, deleteNode };
};

/* -------------------------------------------------------------------------------------*/

//Function to generate random array of length n with a max number
function generateRandomArray(n, maxNum) {
  const array = [];
  for (let i = 0; i <= n; i++) {
    let num = Math.floor(Math.random() * maxNum);
    array.push(num);
  }
  return array;
}

//Function I took from the Odin Project to display the BST in the console to help with visualization
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

/* -------------------------------------------------------------------------------------*/

const randomArray = generateRandomArray(20, 20);
const filteredArray = [...new Set(randomArray)].sort((a, b) => a - b);
const testingArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(testingArray);
let tree = Tree(testingArray);
tree.setRoot();
tree.insert(6);
/* tree.insert(18);
tree.insert(19);
tree.insert(20); */
prettyPrint(tree.getRoot());
