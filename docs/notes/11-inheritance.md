# Unit 11: Inheritance

!!! abstract "Learning Objectives"

    After this unit, students should

    - understand inheritance as a mechanism to extend existing code.
    - understand how inheritance models the IS-A relationship.
    - know how to use the `extends` keyword for inheritance.
    - understand inheritance as a subtype.
    - be able to determine the run-time type and compile-time type of a variable.

## Extension with Composition

We have seen how composition allows us to compose a new, more complex, class, out of existing classes, without breaking the abstraction barrier of existing classes.  Sometimes, however, composition is not the right approach.  Let's consider the following example.  Let's suppose that we, as a client, want to add color as a property to our `Circle`.

Without penetrating the abstraction barrier of `Circle`, we can do the following:
```Java title="ColoredCircle v0.1 (with Composition)"
class ColoredCircle {
  private Circle circle;
  private Color color;

  public ColoredCircle(Circle circle, Color color) {
    this.circle = circle;
    this.color = color;
  }
}
```

where `Color` is another abstraction representing the color of shapes.

What should we do if we want to calculate the area of our colored circle?  Suppose we already have a `ColoredCircle` instance called `coloredCircle`. We could make `circle` public and call `#!Java coloredCircle.circle.getArea()`, or we could add an accessor and call `#!Java coloredCircle.getCircle().getArea()`.  Both of these are not ideal, since they break the abstraction barrier and reveal that the `ColoredCircle` class stores a `circle` (the latter being slightly better than the first).

A better alternative is to let `ColoredCircle` provide its own `getArea()` method and _forward_ its call to `Circle`.

```Java title="ColoredCircle v0.2 (with Composition)"
class ColoredCircle {
  private Circle circle;
  private Color color;

  public ColoredCircle(Circle circle, Color color) {
    this.circle = circle;
    this.color = color;
  }

  public double getArea() {
    return circle.getArea();
  }
}
```

Then, the client to `ColoredCircle` can just call `#!Java coloredCircle.getArea()` without knowing or needing to know how a colored circle is represented internally.  The drawback of this approach is that we might end up with many such boilerplate forwarding methods.

!!! note "Boilerplate Code"

    A boilerplate code &mdash; or simply boilerplate &mdash; is a piece of code that are repeated in multiple places with little to no variations.

## Extension with Inheritance

Recall the concept of subtyping.  We say that $S <: T$ if any piece of code written for type $T$ also works for type $S$.


!!! quote "Inheritance"
    _"Whenever a superclass is needed, a subclass can be given."_

Now, think about `ColoredCircle` and `Circle`.  If someone has written a piece of code that operates on `Circle` objects.  Do we expect the same code to work on `ColoredCircle`?  In this example, yes!  A `ColoredCircle` object should behave just like a circle &mdash; we can calculate its area, calculate its circumference, check if two circles intersect, check if a point falls within the circle, etc.  The only difference, or more precisely, extension, is that it has a color, and perhaps has some methods related to this additional field.  So, `ColoredCircle` _is a subtype of_ `Circle`.

We now show you how we can introduce this subtype relationship in Java, using the `extends` keyword.  We can reimplement our `ColoredCircle` class this way:

```Java title="ColoredCircle v0.3 (with Inheritance)"
class ColoredCircle extends Circle {
  private Color color;

  public ColoredCircle(Point center, double radius, Color color) {
    super(center, radius);  // call the parent's constructor
    this.color = color;
  }
}
```

We have just created a new type called `ColoredCircle` as a class that extends from `Circle`.  We call `Circle` the _parent class_ or _superclass_ of `ColoredCircle`; and `ColoredCircle` a _subclass_ of `Circle`.

We also say that `ColoredCircle` _inherits_ from `Circle`, since all the public fields of `Circle` (center and radius) and public methods (like `getArea()`) are now accessible to `ColoredCircle`.  Just like a parent-child relationship in real life, however, anything private to the parent remains inaccessible to the child.  This privacy veil maintains the abstraction barrier of the parent from the child, and creates a bit of a tricky situation &mdash; technically a child `ColoredCircle` object has a center and a radius, but it has no access to it!

Line 6 of the code above introduces another keyword in Java: `super`.  Here, we use `super` to call the constructor of the superclass, to initialize its center and radius (since the child has no direct access to these fields that it inherited).

!!! info "Superclass Constructor"
    
    If a constructor does not explicitly invoke a superclass constructor, the Java compiler automatically inserts a call to the no-argument constructor of the superclass. If the super class does not have a no-argument constructor, you will get a compile-time error. `Object` does have such a constructor, so if `Object` is the only superclass, there is no problem.[^1]

    Here, `Object` is the "ancestor" of all classes.

[^1]: https://docs.oracle.com/javase/tutorial/java/IandI/super.html

The concept we have shown you is called _inheritance_ and is one of the four pillars of OOP.  We can think of inheritance as a model for the "_is a_" relationship between two entities.

With inheritance, we can call `#!Java coloredCircle.getArea()` without knowing or needing to know how a colored circle is represented internally and without forwarding methods.

## When NOT to Use Inheritance

Inheritance tends to get overused.  _In practice, we seldom use inheritance_.  Let's look at some examples of how _not_ to use inheritance, and why.

Consider the following example:

```Java
class Point {
  private double x;
  private double y;
    :
}

class Circle extends Point {
  private double radius;
    :
}

class Cylinder extends Circle {
  private double height;
    :
}
```

The difference between these implementations and the one you have seen in [Unit 9](09-composition.md) is that they use inheritance rather than composition.  

`Circle` implemented like the above would have the center coordinate inherited from the parent (so it has three fields, x, y, and radius); `Cylinder` would have the fields corresponding to a circle, which is its base and height.  In terms of modeling the properties of a circle and a cylinder, we have all the right properties in the right class.

When we start to consider methods encapsulated with each object, things start to break down. Consider a piece of code written as follows:
```Java
void foo(Circle c, Point p) {
  if (c.contains(p)) {
    // do something
  }
}
```

Since `Cylinder` is a subtype of `Point` according to the implementation above, the code above should still work also if we replace `Point` with a `Cylinder` (according to the semantics of subtyping).   But it gets weird &mdash; what is the meaning of a `Circle` (in 2D) containing a Cylinder (in 3D)?  We could come up with a convoluted meaning that explains this, but it is likely not what the original implementer of `foo` expects.

The message here is this: _Use composition to model a has-a relationship; and inheritance for an is-a relationship_.  _Make sure inheritance preserves the meaning of subtyping_.  

## Run-Time Type

Recall that Java allows a variable of type $T$ to hold a value from a variable of type $S$ only if $S <: T$.  Since `ColoredCircle` <: `Circle`, the following is not allowed in Java:
```Java
ColoredCircle c = new Circle(p, 0); // error
```

but this is OK:
```Java
Circle c = new ColoredCircle(p, 0, blue); // OK
```

where `p` is a `Point` object and `blue` is a `Color` object.

Also, recall that `Circle` is called the compile-time type of `c`.  Here, we see that `c` is now referencing an object of the subtype `ColoredCircle`.  Since this assignment happens during run-time, we say that the _run-time type_ of `c` is `ColoredCircle`.  The distinction between these two types will be important later.
