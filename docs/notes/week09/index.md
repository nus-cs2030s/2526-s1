# Week 09: Lambda and Lazy

<div class="grid cards" markdown>

- [**Side Effect-Free Programming**](../30-functions.md)

    After this unit, students should

    - be familiar with the concept of functions as side-effect-free programming constructs and its relation to functions in mathematics.
    - understand the importance of writing code that is free of side effects.
    - understand how functions can be first-class citizens in Java through using local anonymous class.
    - understand how we can succinctly use a lambda expression or a method reference in place of using local anonymous class.
    - understand how we can use currying to generalize to functions with higher arity.
    - understand how we can create a closure with lambda and environment capture.

- [**Box and Maybe**](../31-box-maybe.md)

    After this unit, students should

    - appreciate the generality of the class `Box<T>` and `Maybe<T>`.
    - understand how passing in functions as parameters can lead to highly general abstractions.
    - understand how `Maybe<T>` preserves the "maybe null" semantics over a reference type by internalizing checks for `null`.

- [**Lazy Evaluation**](../32-lazy.md)

    After this unit, students should

    - know what is lazy evaluation and how lambda expression allow us to delay the execution of a computation.
    - understand how memoization and the `Lazy<T>` abstraction allows us to evaluate an expression exactly once.

</div>