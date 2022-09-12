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

  const find = (value, rootNode = getRoot()) => {
    //if value doesn't exist it returns this string
    if (rootNode === null) {
      return "This node doesn't exist in the tree!";
    }
    //base case to return the node if the value is found
    if (rootNode.data === value) {
      return rootNode;
    }
    //recursively checks the left and right subtree until it hits the base case
    if (value < rootNode.data) {
      return find(value, rootNode.left);
    }
    return find(value, rootNode.right);
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

  //function for level order traversal
  const levelOrder = (callback) => {
    if (root === null) return;
    //if root isn't null, create a queue with the root in it
    const queue = [root];
    const results = [];
    while (queue.length > 0) {
      //remove front element of the queue and push it to the results
      let currentNode = queue.shift();
      results.push(currentNode.data);
      //if left/right aren't null, push them to the queue
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
      //if a function was provided, feed each node to the function
      if (callback) callback(currentNode);
    }
    //if no function was provided, return the results array
    if (!callback) return results;
  };

  //left, root, right
  const inorder = (callback) => {
    if (root === null) return;
    //if root isn't null, create a stack and set current node as root
    const stack = [];
    const results = [];
    let currentNode = root;
    while (stack.length > 0 || currentNode !== null) {
      if (currentNode !== null) {
        //push all the nodes in the left subtree to the stack
        stack.push(currentNode);
        currentNode = currentNode.left;
      } else {
        //pop the top node off the stack and push it to the results
        currentNode = stack.pop();
        results.push(currentNode.data);
        //if a function was provided, feed each node to the function
        if (callback) callback(currentNode);
        //set current node to the right
        currentNode = currentNode.right;

      }
    }
    //if no function was provided return the results array
    if (!callback) return results;
  }

  //root, left, right
  const preorder = (callback) => {
    if (root === null) return;
    //if root isn't null, create a stack with the root node in it
    const stack = [root];
    const results = [];
    while (stack.length > 0) {
      //pop the top value off the stack and set that as the current node and push data to results
      let currentNode = stack.pop();
      results.push(currentNode.data);
      //if left/right isn't null, push it to the stack
      if (currentNode.right !== null) {
        stack.push(currentNode.right);
      }
      if (currentNode.left !== null) {
        stack.push(currentNode.left);
      }
      //if function was provided, feed each node to the function
      if (callback) callback(currentNode);
    }
    //if no function was provided, return the results array
    if (!callback) return results;
  }

  //left, right, root
  const postorder = (callback) => {
    if (root === null) return;
    //if root isn't null, create a stack with the root node in it
    const stack = [root];
    const results = [];
    while (stack.length > 0) {
      //pop the top value off the stack and set that as the current node and push data to results
      let currentNode = stack.pop();
      //if left/right isn't null, push it to the stack
      if (currentNode.left !== null) {
        stack.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        stack.push(currentNode.right);
      }
      //if function was provided, feed each node to the function
      if (callback) callback(currentNode);
      //add current node to the beginning of results array so values will be in correct order
      results.unshift(currentNode.data);
    }
     //if no function was provided, return the results array
    if (!callback) return results;
  }

  return { setRoot, getRoot, insert, deleteNode, find, levelOrder, inorder, preorder, postorder };
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
console.log("Level Order Traversal: ", tree.levelOrder());
console.log("Inorder traversal (left, root, right): ", tree.inorder());
console.log("Preorder traversal (root, left, right): ", tree.preorder());
console.log("Postorder traversal (left, right, root): ", tree.postorder());
