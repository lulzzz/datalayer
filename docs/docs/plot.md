---
title: Plot
---

## Javascript

+ d3.js
+ http://lightning-viz.org
+ https://github.com/plotly/plotly.js

## Plot with Wisp

### Examples with Highcharts

First, import:

```
import com.quantifind.charts.highcharts    // Import the types.
import com.quantifind.charts.Highcharts._  // Import the implicit conversions.
```

Simple Example

```
help
line((1 to 10), (1 to 10))
areaspline(List(1, 2, 3, 4, 5), List(4, 1, 3, 2, 6))
pie(Seq(4, 4, 5, 9))
```

The Highcharts implementation attempts to closely follow the Highcharts API.
We make some concessions to support alternative default values, and to accommodate the differences between 
javascript and scala while preserving simplicity (such as 22-field case classes).

After import, you can instantiate an object like so:

```
Highchart(Seq(Series(Seq(Data(1, 2)))), chart = Chart(zoomType = Zoom.xy), yAxis = None)
```

The current repl API supports the original series types from 3.0.6 and we are slowly updating to 4.0.4. 
You can pass any highchart object to plot, or use methods defined by the Highcharts plot type (recommended),
 which consume both data and functions: area, areaspline, bar, column, line, pie, scatter, spline.
 
By means of example:

```
areaspline(List(1, 2, 3, 4, 5), List(4, 1, 3, 2, 6))
areaspline
pie(Seq(4, 4, 5, 9))
```

You can pass in

+ an Iterable[Numeric]
+ an Iterable[(Numeric, Numeric)]
+ an (Iterable[Numeric], Iterable[Numeric])
+ an (Iterable[Numeric], Numeric => Numeric)
+ an (Numeric => Numeric, Iterable[Numeric])

To any of these functions. All of the following produce the same graph:

```
line((0 until 5).map(x => x -> x*x))
line(Seq(0, 1, 4, 9, 16))
line(List(0, 1, 2, 3, 4), Set(0, 1, 9, 16, 4).toSeq,sorted)
def f(x: Int): Int = scala.math.pow(x, 2).toInt
line(0 to 4, f _)
```

we are developing further support for more customized plots. For example, linear-regression:

```
regression((0 until 100).map(x => -x + scala.util.Random.nextInt(25)))
```

You can then make stylistic changes to your plot. You can add a title, xAxis, yAxis, legend, as well as hold and unhold plots, which causes plots to layer on top-of each other, and change the plots to be stacked, where appropriate:

```
import com.quantifind.charts.Highcharts._
bar((0 until 20).map(_ % 8))
hold
bar((0 until 20).map(_ % 4))
stack()
title("Stacked Bars")
xAxis("Quantity")
yAxis("Price")
legend(List("Blue", "Black"))
```

### Examples with Vega

First, import:

```
import com.quantifind.charts.repl.Vega._
bar((0 until 6) ++ (0 until 6).reverse)
```

## Plot with Scala-Chart

```
import scalax.chart.api._
val data = for (i <- 1 to 5) yield (i,i)
val chart = XYLineChart(data, title = "My Chart of Some Points")
chart.show()
chart.saveAsPNG("chart.png")
chart.saveAsJPEG("chart.jpg")
chart.saveAsPDF("chart.pdf")
```

With animations:

```
import scalax.chart.api._
val series = Seq[(Int,Int)]() toXYSeries "f(x) = sin(x)"
val chart = XYLineChart(series)
chart.show()
for (x <- -4.0 to 4 by 0.1) {
  swing.Swing onEDT {
    series.add(x, math.sin(x))
  }
  Thread.sleep(50)
}
```

### Plot Server

When you first create a plot, wisp will attempt to fetch your ip using 
`java.net.InetAddress.getLocalHost.getCanonicalHostName` and start a server on a random port. 

It then tries to open the page in your browser using the unix command open.

You can also manually startServer() and stopServer(). 

The server maintains the history, and you can undo(), redo(), clear() or clearAll() (which hides a plot) 
and delete() or deleteAll() (which truly deletes the plot)

## Plot with Scalaplot

```
import org.sameersingh.scalaplot.Implicits._
import java.lang.Math._
val x = 0.0 until 2.0 * math.Pi by 0.1
output(ASCII, plot(x ->(sin(_))))
output(ASCII, plot(x ->(cos(_))))
output(ASCII, plot(x ->(sin(_), cos(_))))
output(GUI, plot(x ->(sin(_), cos(_))))
output(PNG("target/", "test"), plot(x ->(sin(_), cos(_))))
output(PDF("target/", "test"), plot(x ->(sin(_), cos(_))))
```

You can also use directly the plotters.

```
val plot = plot(x ->(math.sin(_), math.cos(_)))
val gnuplotter = new org.sameersingh.scalaplot.gnuplot.GnuplotPlotter(plot)
gnuplotter.pdf("target/", "gnu-plot")
val jplotter = new org.sameersingh.scalaplot.jfreegraph.JFGraphPlotter(plot)
jplotter.gui()
```

Read more on https://github.com/sameersingh/scalaplot for options.

## Plot with Breeze-Viz

The following does not work for now (don't try it).

```
import breeze.linalg._
import breeze.plot._
val f = Figure()
val p = f.subplot(0)
val x = linspace(0.0,1.0)
p += plot(x, x :^ 2.0)
p += plot(x, x :^ 3.0, '.')
p.xlabel = "x axis"
p.ylabel = "y axis"
f.saveas("target/lines.png")
```

```
val p2 = f.subplot(2,1,1)
val g = breeze.stats.distributions.Gaussian(0,1)
p2 += hist(g.sample(100000),100)
p2.title = "A normal distribution"
f.saveas("target/subplots.png")
```

```
val f2 = Figure()
f2.subplot(0) += image(DenseMatrix.rand(200,200))
f2.saveas("image.png")
```

```
import breeze.plot._
import breeze.linalg.DenseVector
import java.awt.Color
 val x = DenseVector.rand(10)
val y = DenseVector.rand(10)
// val s = DenseVector.rand(10) :/ 5.0
// val si = s.mapValues(_.toInt)
val sj : PartialFunction[Int,Double] = Map(1->1.0, 4->4.0)
val sj : PartialFunction[Int,Double] = {case i : Int => println("++++++++++" + i); i.toDouble}
val labels : PartialFunction[Int,String] = Map(1->"Red", 4->"Blue")
val labels : PartialFunction[Int,String] = {case i : Int => i.toString}
val tips : PartialFunction[Int,String] = {case i : Int => i.toString}
// plot #1
val literalColors : PartialFunction[Int,Color] = Map(1->Color.RED, 4->Color.BLUE) orElse { case x : Int => Color.WHITE } 
scatter(x, y, sj, literalColors, labels=labels, tips=tips)
val f = Figure()
val p = f.subplot(0)
p += scatter(x, y, sj, literalColors, labels=labels, tips=tips)
 // plot #2
val c = DenseVector.rand(10);
val paintScale = GradientPaintScale(0.0, 1.0)
val scaleColors = Map() ++ (0 until c.length).map(i => (i, paintScale(c(i))));
scatter(x, y, sj, scaleColors, labels = labels, tips = tips) 
val f = Figure()
val p = f.subplot(0)
p += scatter(x, y, sj, scaleColors, labels=labels, tips=tips)
```

## Plot with Gnu Plot

```
$ gnuplot -p -e "plot 1/(1+exp(-0.18401*x+5.50508)), 1/(1+exp(- 0.7527*x+22.7536 ))" # zoom out to see the plot...

$ gnuplot
gnuplot> set datafile separator ","
gnuplot> plot '/dataset/iris/iris.csv' using 1:2
gnuplot> plot '/dataset/bodysize/bodysize.csv' using 1:2
gnuplot> plot sin(x)
gnuplot> plot cos(x)
gnuplot> plot tan(x)
gnuplot> plot 1/(1+exp(0.00213*x-0.00026))
gnuplot> plot 'data.csv'
gnuplot> plot 'data.csv', 1/(1+exp(0.00213*x-0.00026))
gnuplot> plot 'data.csv', 1/(1+exp(0.00213*x-0.00026)), 
gnuplot> plot 'data.csv', 1/(1+exp(0.00213*x-0.00026)), 1/(1+exp( 0.7527*x-22.7536 ))
gnuplot> plot 'data.csv', 1/(1+exp(0.00213*x-0.00026)), 1/(1+exp(- 0.7527*x+22.7536 ))
gnuplot> plot 'data.csv', 1/(1+exp(-0.00213*x+0.00026)), 1/(1+exp(- 0.7527*x+22.7536 ))
gnuplot> plot 'data.csv', 1/(1+exp(-0.00213*x+0.00026)), 1/(1+exp(- 0.7527*x+22.7536 ))
gnuplot> plot 'data.csv', 1/(1+exp(-0.18401*x+5.50508)), 1/(1+exp(- 0.7527*x+22.7536 ))
gnuplot> plot 'data.csv', 1/(1+exp(-0.18401*x+1095)), 1/(1+exp(- 0.7527*x+22.7536 ))
gnuplot> plot 'data.csv', 1/(1+exp(-35.77*x+1095)), 1/(1+exp(- 0.7527*x+22.7536 ))
gnuplot> exit
```

## Plot with matplotlib

+ seaborn
+ bokeh
 + https://github.com/bokeh/bokeh-scala

# R

+ googleVis
+ rCharts
+ htmlwidgets

# Java2D

```
-Dsun.java2d.xrender=true
-Dsun.java2d.opengl=true
-Dsun.java2d.trace=log
```
