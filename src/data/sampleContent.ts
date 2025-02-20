import { ContentModule } from '../services/storageService'

export const sampleModules: ContentModule[] = [
  {
    id: 'intro',
    title: 'Introduction to Mathematics',
    description: 'Basic concepts and foundations of mathematics',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Numbers and Operations',
        content: `
# Numbers and Operations

In this lesson, we'll explore the fundamental concepts of numbers and basic mathematical operations.

## Topics Covered:
1. Natural Numbers
2. Integer Operations
3. Basic Arithmetic
4. Order of Operations

## Key Concepts

### Natural Numbers
Natural numbers are the counting numbers we use every day: 1, 2, 3, 4, and so on.

### Integer Operations
Learn how to add, subtract, multiply, and divide integers (positive and negative whole numbers).

### Basic Arithmetic
Master the four fundamental operations:
- Addition (+)
- Subtraction (-)
- Multiplication (×)
- Division (÷)

### Order of Operations
Remember PEMDAS:
1. Parentheses
2. Exponents
3. Multiplication and Division (left to right)
4. Addition and Subtraction (left to right)
        `
      },
      {
        id: 'lesson-2',
        title: 'Fractions and Decimals',
        content: `
# Fractions and Decimals

Understanding how to work with parts of whole numbers.

## Topics Covered:
1. What are Fractions?
2. Converting Fractions to Decimals
3. Basic Operations with Fractions
4. Real-world Applications

## Key Concepts

### Fractions
A fraction represents a part of a whole, written as a/b where:
- a is the numerator
- b is the denominator

### Decimal Numbers
Decimals are another way to represent parts of whole numbers using place values.

### Converting Between Forms
Learn how to convert:
- Fractions to decimals
- Decimals to fractions
- Mixed numbers to improper fractions
        `
      }
    ]
  },
  {
    id: 'algebra',
    title: 'Basic Algebra',
    description: 'Introduction to algebraic concepts and equations',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Variables and Expressions',
        content: `
# Variables and Expressions

Learn how to work with mathematical expressions using variables.

## Topics Covered:
1. What are Variables?
2. Algebraic Expressions
3. Evaluating Expressions
4. Simplifying Expressions

## Key Concepts

### Variables
Variables are symbols (usually letters) that represent unknown values.

### Algebraic Expressions
Combinations of:
- Numbers
- Variables
- Operations
- Grouping symbols
        `
      }
    ]
  }
] 