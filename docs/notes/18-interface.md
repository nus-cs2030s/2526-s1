# Unit 18: Interface

!!! abstract "Learning Objectives"

    After this unit, students should

    - understand interface as a type for modeling "can do" behavior.
    - understand the subtype-supertype relationship between a class and its interfaces.

## Modeling Behavior

We have seen how we can write our program using superclasses (including abstract ones) to make our code more general and flexible.  In this unit, we will kick this up one more notch and try to write something even more general, through another abstraction.

Let's reexamine this method again:
```Java title="findLargest v0.3 (with Shape)"
double findLargest(Shape[] array) {
  double maxArea = 0;
  for (Shape curr : array) {
    double area = curr.getArea();
    if (area > maxArea) {
      maxArea = area;
    }
  }
  return maxArea;
}
```

Note that all that is required for this method to work, is that the type of objects in `array` supports a `getArea` method.  While `Shape` that we defined in the previous unit meets this requirement, it does not have to be.  We could pass in an array of countries or an array of HDB flats.  It is unnatural to model a `Country` or a `Flat` as a subclass of `Shape` (recall inheritance models the IS-A relationship).

To resolve this, we will look at an abstraction that _models what an entity can do_, possibly across different class hierarchies.

## Interface

The abstraction to do this is called an _interface_.  An interface is also a type and is declared with the keyword `interface`.

Since an interface models what an entity can do, the name usually ends with the -able suffix[^1].

[^1]: Although in recent Java releases, this is less common.

Now, suppose we want to create a type that supports the` getArea()` method, be it a shape, a geographical region, or a real estate property.  Let's call it `GetAreable`.

```Java
interface GetAreable {
  public abstract double getArea();
}
```

All methods declared in an interface are `public abstract` by default.  We could also just write the following.

```Java
interface GetAreable {
  double getArea();
}
```

Now, for every class that we wish to be able to call `getArea()` on, we tell Java that the class `implements` that particular interface.

For instance, we can implement the class `Shape` as follows.

```Java
abstract class Shape implements GetAreable {
  private int numOfAxesOfSymmetry;

  public boolean isSymmetric() {
    return numOfAxesOfSymmetry > 0;
  }
}
```

The `Shape` class will now have a `public abstract double getArea()` thanks to the implementation of the `GetAreable` interface.  Recap that `Shape` has to be an abstract class as it inherits the abstract `getArea()` and it does not have an implementation for it.

We can have a concrete class implementing an interface too.

```Java
class Flat extends RealEstate implements GetAreable {
  private int numOfRooms;
  private String block;
  private String street;
  private int floor;
  private int unit;

  @Override
  public double getArea() {
      :
  }
}
```

For a class to implement an interface and be concrete, it has to override all abstract methods from the interface and provide an implementation to each, just like the example above.  Otherwise, the class becomes abstract.

With the `GetAreable` interface, we can now make our function `findLargest` even more general.

```Java title="findLargest v0.4 (with GetAreable)"
double findLargest(GetAreable[] array) {
  double maxArea = 0;
  for (GetAreable curr : array) {
    double area = curr.getArea();
    if (area > maxArea) {
      maxArea = area;
    }
  }
  return maxArea;
}
```

Note:

- A class can only extend from one superclass, but it can implement multiple interfaces.
- An interface can extend from one or more other interfaces, but an interface cannot extend from another class.

## Interface as Supertype

If a class $C$ implements an interface $I$, $C <: I$.   This definition implies that a type can have multiple supertypes.

In the example above, `Flat` <: `GetAreable` and `Flat` <: `RealEstate`.

## Casting using an Interface

Like any type in Java, it is also possible to cast a variable to an interface type. Let's consider an interface `I` and two classes `A` and `B`. Note that `A` does not implement `I`

```Java
interface I {
    :
}

class A {
    :
}

class B implements I {
    :
}
```

Now let's consider the following code excerpt:

```Java
I i1 = new B(); // Compiles, widening type conversion
I i2 = (I) new A(); // Also compiles?
```

Note that even though `A` does not implement `I`, the Java compiler allows this code to compile. Contrast this with casting between classes that have no subtype relationship:

```Java
A a = (A) new B(); // Does not compile
B a = (B) new A(); // Does not compile
```

How do we explain this? Well, the Java compiler does not let us cast when it is provable that it will not work, i.e. casting between two classes that have no subtype relationship. However, for interfaces, there is the *possibility* that a subclass *could* implement the interface.  Therefore, the Java compiler trusts that the programmer knows what they are doing, and allows it to compile. Consider one such potential subclass `AI`:

```Java
class AI extends A implements I{
  :
}
```

The lesson here is that when we are using typecasting, we are telling the compiler that *we know best*, and therefore it may not warn us or stop us from making bad decision[^2]. It is important to always be sure whenever you use an explicit typecast.

[^2]: The compiler will still throw an error if it can prove our program has a typecast that will not work. However, if a typecast has the possibility of working, it will permit it (as in our interface example).

## Impure Interfaces

As we mentioned at the beginning of this course, it is common for software requirements, and their design, to continuously evolve.  Once we define an interface that is exposed beyond the abstraction barrier, however, it is difficult to change that interface.

Suppose that, after we define that `GetAreable` interface, other developers in the team start to write classes that implement this interface.  One fine day, we realized that we need to add more methods to the `getAreable`.  Perhaps we need methods `getAreaInSquareFeet()` and `getAreaInSquareMeter()` in the interface.  But, one cannot simply add these abstract methods to `getAreable`. Otherwise, the other developers would be forced to change their classes to add the implementation of the two methods.  Or else, their code would not compile.  Imagine how unhappy they would be!

This is what happened to the Java language when they transitioned from version 7 to version 8.  The language needed to add a bunch of useful methods to standard interfaces provided by the Java library, but doing so would break existing code written in Java version 7 or before, that rely on these interfaces.

The solution that Java came up with is to allow an interface to provide a _default implementation_ of methods that all implementation subclasses will inherit (unless they override).  A method with default implementation is tagged with the `default` keyword.  This design leads to a less elegant situation where an `interface` has some abstract methods and some non-abstract default methods.  In CS2030S, we refer to these as _impure interfaces_.  It is a pain to explain since it breaks our clean distinction between a class and an interface.  _We prefer not to talk about it_ &mdash; but it is there in Java 8 and up.

