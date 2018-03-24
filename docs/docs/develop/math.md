# Datalayer DNA

Core features of ingested data.

Basic ingredients to be used by the models.

## Quick Notes

import breeze.linalg._
import breeze.stats.distributions._
val x = DenseMatrix.fill(10,10)(Gaussian(0,1).draw())

# Build

```
jdk7
mvn clean install assembly:assembly -P release -Dhadoop2.version=2.4.0 -DskipTests
```

# Spark Shell

```
export CLASSPATH=/opt/spark-1.2.0-bin-hadoop2.4/lib/spark-assembly-1.2.0-hadoop2.4.0.jar 
mahout spark-shell
```

```
import org.apache.mahout.math._
import scalabindings._
import RLikeOps._
import drm._
import RLikeDrmOps._
import org.apache.mahout.sparkbindings._
import collection._
import JavaConversions._
import h2obindings._
```

# Examples

```
val denseVec1: Vector = (1.0, 1.1, 1.2)
val denseVec2 = dvec(1, 0, 1.1, 1.2)
val a = dvec(1, 0, 1.1, 1.2)
val b = dvec(1, 0, 1.1, 1.2)
a + b
a - b
a * b
a + 5.0
a * b
a * 5
a += b
a -= b
a *= b
val aInv = 1 /: a
val a1 = 5.0 -: a
a -=: b
a dot b
a === b
a !== b
a %*% b
diag(5,5) :%*% b
a.norm
val M = dense((1, 2, 3), (3, 4, 5))
val Mt = M.t
val sparseVec = svec((5 -> 1) :: (10 -> 2.0) :: Nil)
val sparseVec2: Vector = (5 -> 1.0) :: (10 -> 2.0) :: Nil
val A = dense((1, 2, 3), (3, 4, 5))
val A = sparse(
  (1, 3) :: Nil,
  (0, 2) :: (1, 2.5) :: Nil
)
diag(10, 3.5)
diagv((1, 2, 3, 4, 5))
eye(10)
val d = vec(5)
vec(5) = 3.0
val d = m(3,5)
M(3,5) = 3.0
val rowVec = M(3, ::)
val colVec = M(::, 3)
M(3, ::) = (1, 2, 3)
M(::, 3) = (1, 2, 3)
M(3, ::) := (1, 2, 3)
M(::, 3) := (1, 2, 3)
a(0, 0 to 1) = (3, 5)
a(0, 0 to 1) := (3, 5)
val B = A(2 to 3, 3 to 4)
A(0 to 1, 1 to 2) = dense((3, 2), (2, 3))
A(0 to 1, 1 to 2) := dense((3, 2), (2, 3))
vec1 := vec2
M1 := M2
M := ((row, col, x) => if (row == col) 1 else 0)
vec := ((index, x) => sqrt(x))
```

## ASF Mail

```
./src/main/shell/asf-email-examples-2.sh /dataset/asf-mails/james.apache.org/ output/
```
