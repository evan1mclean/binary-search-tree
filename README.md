# Binary Search Tree

To practice intro data structures and algorithms, I used Javascript to create a Binary Search Tree which features a few different functions for manipulating the tree.

Features:
- A node factory function to create a node object that contains data and a pointer to the left/right nodes
- A BST factory function to create the tree and functions to manipulate it.
- buildTree() to take in an array and create a balanced tree
- insert() to add a new node to the tree
- delete() to remove node from the tree
- find() to locate the node with the given value
- levelOrder() to do breadth first traversal
- inorder()/preorder()/postorder() for respective depth first traversals
- height() to return a given nodes distance to it's furthest leaf node
- depth() to return a given nodes distance to the root of the tree
- isBalanced() to return true/false if the tree is balanced or not
- rebalance() to take an unbalanced tree and rebuild a balanced tree
- A simple driver script to show the features