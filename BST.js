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
  };

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
  };

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
  };

  //takes a node and finds the number of edges in longest path to a leaf node
  const height = (rootNode = getRoot()) => {
    //base case that returns -1 if node is null
    if (rootNode === null) return -1;
    //checks if the node is valid, and if not returns the message from the find() function;
    if (!rootNode.data) return find(rootNode);
    //recursively finds the height of left and right subtrees and returns the bigger and adds 1
    let left = height(rootNode.left);
    let right = height(rootNode.right);
    return Math.max(left, right) + 1;
  };

  //takes a node and finds the number of edges to the root node
  const depth = (value, rootNode = getRoot()) => {
    //base case that returns -1 if node is null
    if (rootNode === null) return -1;
    //checks if the node is valid, and if not returns the message from the find() function;
    if (!value.data) return find(value);
    let dist = -1;
    if (
      //check if value is current node, if not, check the left and right subtree and update it's depth
      value.data === rootNode.data ||
      (dist = depth(value, rootNode.left)) >= 0 ||
      (dist = depth(value, rootNode.right)) >= 0
    )
      return dist + 1;
    return dist;
  };

  const isBalanced = (rootNode = getRoot()) => {
    if (rootNode === null) {
      return true;
    }
    //calls height for left and right subtree
    let left = height(rootNode.left);
    let right = height(rootNode.right);
    if (
      //finds the difference of heights and recursively checks with every node to make sure all heights are correct
      Math.abs(left - right) <= 1 &&
      isBalanced(rootNode.left) === true &&
      isBalanced(rootNode.right) === true
    ) {
      return true;
    }
    return false;
  };

  //Function for rebalancing the BST
  const rebalance = () => {
    //if balanced do nothing
    if (isBalanced() === true) return;
    //create new array with traversal function then sort/remove duplicates and rebuild the tree
    let newArray = levelOrder();
    let newFilteredArray = [...new Set(newArray)].sort((a, b) => a - b);
    root = buildTree(newFilteredArray);
  }

  return {
    setRoot,
    getRoot,
    insert,
    deleteNode,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance
  };
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
tree.insert(18);
tree.insert(19);
tree.insert(20);
prettyPrint(tree.getRoot());
console.log("Level Order Traversal: ", tree.levelOrder());
console.log("Inorder traversal (left, root, right): ", tree.inorder());
console.log("Preorder traversal (root, left, right): ", tree.preorder());
console.log("Postorder traversal (left, right, root): ", tree.postorder());
console.log("Height of Node: ", tree.height(tree.find(7)));
console.log("Depth of Node: ", tree.depth(tree.find(7)));
console.log("Is the tree balanced?", tree.isBalanced());
tree.rebalance();
prettyPrint(tree.getRoot());
