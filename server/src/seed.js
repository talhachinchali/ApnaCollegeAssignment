const mongoose = require('mongoose');
const Topic = require('./models/Topic');
require('dotenv').config();

const dsaData = [
  {
    title: "Arrays",
    description: "Master array operations, searching, sorting, and manipulation techniques",
    order: 1,
    problems: [
      {
        title: "Two Sum",
        description: "Find two numbers in an array that add up to a target value",
        difficulty: "Easy",
        youtubeLink: "https://youtube.com/watch?v=example1",
        leetcodeLink: "https://leetcode.com/problems/two-sum/",
        articleLink: "https://example.com/two-sum-article",
        order: 1
      },
      {
        title: "Best Time to Buy and Sell Stock",
        description: "Find the maximum profit from buying and selling stocks",
        difficulty: "Easy",
        youtubeLink: "https://youtube.com/watch?v=example2",
        leetcodeLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        articleLink: "https://example.com/stock-article",
        order: 2
      },
      {
        title: "Maximum Subarray",
        description: "Find the contiguous subarray with maximum sum",
        difficulty: "Medium",
        youtubeLink: "https://youtube.com/watch?v=example3",
        leetcodeLink: "https://leetcode.com/problems/maximum-subarray/",
        articleLink: "https://example.com/kadane-article",
        order: 3
      },
      {
        title: "Product of Array Except Self",
        description: "Return an array where each element is the product of all other elements",
        difficulty: "Medium",
        youtubeLink: "https://youtube.com/watch?v=example4",
        leetcodeLink: "https://leetcode.com/problems/product-of-array-except-self/",
        articleLink: "https://example.com/product-array-article",
        order: 4
      },
      {
        title: "3Sum",
        description: "Find all unique triplets that sum to zero",
        difficulty: "Medium",
        youtubeLink: "https://youtube.com/watch?v=example5",
        leetcodeLink: "https://leetcode.com/problems/3sum/",
        articleLink: "https://example.com/3sum-article",
        order: 5
      }
    ]
  },
  {
    title: "Linked Lists",
    description: "Understand linked list operations, traversal, and common patterns",
    order: 2,
    problems: [
      {
        title: "Reverse Linked List",
        description: "Reverse a singly linked list",
        difficulty: "Easy",
        youtubeLink: "https://youtube.com/watch?v=example6",
        leetcodeLink: "https://leetcode.com/problems/reverse-linked-list/",
        articleLink: "https://example.com/reverse-ll-article",
        order: 1
      },
      {
        title: "Merge Two Sorted Lists",
        description: "Merge two sorted linked lists into one sorted list",
        difficulty: "Easy",
        youtubeLink: "https://youtube.com/watch?v=example7",
        leetcodeLink: "https://leetcode.com/problems/merge-two-sorted-lists/",
        articleLink: "https://example.com/merge-ll-article",
        order: 2
      },
      {
        title: "Linked List Cycle",
        description: "Detect if a linked list has a cycle",
        difficulty: "Easy",
        youtubeLink: "https://youtube.com/watch?v=example8",
        leetcodeLink: "https://leetcode.com/problems/linked-list-cycle/",
        articleLink: "https://example.com/cycle-detection-article",
        order: 3
      },
      {
        title: "Remove Nth Node From End",
        description: "Remove the nth node from the end of a linked list",
        difficulty: "Medium",
        youtubeLink: "https://youtube.com/watch?v=example9",
        leetcodeLink: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
        articleLink: "https://example.com/remove-nth-article",
        order: 4
      },
      {
        title: "Copy List with Random Pointer",
        description: "Deep copy a linked list with random pointers",
        difficulty: "Medium",
        youtubeLink: "https://youtube.com/watch?v=example10",
        leetcodeLink: "https://leetcode.com/problems/copy-list-with-random-pointer/",
        articleLink: "https://example.com/copy-random-article",
        order: 5
      }
    ]
  },
  {
    title: "Trees",
    description: "Master binary trees, BST operations, and tree traversal algorithms",
    order: 3,
    problems: [
      {
        title: "Maximum Depth of Binary Tree",
        description: "Find the maximum depth of a binary tree",
        difficulty: "Easy",
        youtubeLink: "https://youtube.com/watch?v=example11",
        leetcodeLink: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        articleLink: "https://example.com/tree-depth-article",
        order: 1
      },
      {
        title: "Same Tree",
        description: "Check if two binary trees are identical",
        difficulty: "Easy",
        youtubeLink: "https://youtube.com/watch?v=example12",
        leetcodeLink: "https://leetcode.com/problems/same-tree/",
        articleLink: "https://example.com/same-tree-article",
        order: 2
      },
      {
        title: "Invert Binary Tree",
        description: "Invert a binary tree (mirror it)",
        difficulty: "Easy",
        youtubeLink: "https://youtube.com/watch?v=example13",
        leetcodeLink: "https://leetcode.com/problems/invert-binary-tree/",
        articleLink: "https://example.com/invert-tree-article",
        order: 3
      },
      {
        title: "Binary Tree Level Order Traversal",
        description: "Return the level order traversal of a binary tree",
        difficulty: "Medium",
        youtubeLink: "https://youtube.com/watch?v=example14",
        leetcodeLink: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        articleLink: "https://example.com/level-order-article",
        order: 4
      },
      {
        title: "Validate Binary Search Tree",
        description: "Check if a binary tree is a valid BST",
        difficulty: "Medium",
        youtubeLink: "https://youtube.com/watch?v=example15",
        leetcodeLink: "https://leetcode.com/problems/validate-binary-search-tree/",
        articleLink: "https://example.com/validate-bst-article",
        order: 5
      }
    ]
  },
  {
    title: "Dynamic Programming",
    description: "Learn dynamic programming patterns and optimization techniques",
    order: 4,
    problems: [
      {
        title: "Climbing Stairs",
        description: "Find the number of ways to climb n stairs",
        difficulty: "Easy",
        youtubeLink: "https://youtube.com/watch?v=example16",
        leetcodeLink: "https://leetcode.com/problems/climbing-stairs/",
        articleLink: "https://example.com/climbing-stairs-article",
        order: 1
      },
      {
        title: "House Robber",
        description: "Find the maximum money you can rob from houses",
        difficulty: "Medium",
        youtubeLink: "https://youtube.com/watch?v=example17",
        leetcodeLink: "https://leetcode.com/problems/house-robber/",
        articleLink: "https://example.com/house-robber-article",
        order: 2
      },
      {
        title: "Longest Common Subsequence",
        description: "Find the length of the longest common subsequence",
        difficulty: "Medium",
        youtubeLink: "https://youtube.com/watch?v=example18",
        leetcodeLink: "https://leetcode.com/problems/longest-common-subsequence/",
        articleLink: "https://example.com/lcs-article",
        order: 3
      },
      {
        title: "Edit Distance",
        description: "Find the minimum operations to convert one string to another",
        difficulty: "Hard",
        youtubeLink: "https://youtube.com/watch?v=example19",
        leetcodeLink: "https://leetcode.com/problems/edit-distance/",
        articleLink: "https://example.com/edit-distance-article",
        order: 4
      },
      {
        title: "Coin Change",
        description: "Find the minimum number of coins to make a target amount",
        difficulty: "Medium",
        youtubeLink: "https://youtube.com/watch?v=example20",
        leetcodeLink: "https://leetcode.com/problems/coin-change/",
        articleLink: "https://example.com/coin-change-article",
        order: 5
      }
    ]
  },
  {
    title: "Graphs",
    description: "Master graph algorithms including BFS, DFS, and shortest paths",
    order: 5,
    problems: [
      {
        title: "Number of Islands",
        description: "Count the number of islands in a 2D grid",
        difficulty: "Medium",
        youtubeLink: "https://youtube.com/watch?v=example21",
        leetcodeLink: "https://leetcode.com/problems/number-of-islands/",
        articleLink: "https://example.com/islands-article",
        order: 1
      },
      {
        title: "Course Schedule",
        description: "Check if all courses can be completed (cycle detection)",
        difficulty: "Medium",
        youtubeLink: "https://youtube.com/watch?v=example22",
        leetcodeLink: "https://leetcode.com/problems/course-schedule/",
        articleLink: "https://example.com/course-schedule-article",
        order: 2
      },
      {
        title: "Word Ladder",
        description: "Find the shortest transformation sequence between two words",
        difficulty: "Hard",
        youtubeLink: "https://youtube.com/watch?v=example23",
        leetcodeLink: "https://leetcode.com/problems/word-ladder/",
        articleLink: "https://example.com/word-ladder-article",
        order: 3
      },
      {
        title: "Alien Dictionary",
        description: "Find the order of characters in an alien language",
        difficulty: "Hard",
        youtubeLink: "https://youtube.com/watch?v=example24",
        leetcodeLink: "https://leetcode.com/problems/alien-dictionary/",
        articleLink: "https://example.com/alien-dict-article",
        order: 4
      },
      {
        title: "Network Delay Time",
        description: "Find the minimum time for a signal to reach all nodes",
        difficulty: "Medium",
        youtubeLink: "https://youtube.com/watch?v=example25",
        leetcodeLink: "https://leetcode.com/problems/network-delay-time/",
        articleLink: "https://example.com/network-delay-article",
        order: 5
      }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa-sheet');
    console.log('Connected to MongoDB');

    // Clear existing topics
    await Topic.deleteMany({});
    console.log('Cleared existing topics');

    // Insert new topics
    await Topic.insertMany(dsaData);
    console.log('Seeded database with DSA topics and problems');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { dsaData, seedDatabase };
