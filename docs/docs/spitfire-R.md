# R Interpreter

Datalayer Sptifire extends the [R](http://cran.r-project.org) interpreter support of the open source [Apache Zeppelin notebook](http://zeppelin.incubator.apache.org) project.

+ R code.
+ SparkR code.
+ Cross paragraph R variables.
+ Scala to R binding (passing basic Scala data structure to R).
+ R to Scala binding  (passing basic R data structure to Scala).
+ R plot (ggplot2...).

## Prerequisite

You need R available on the host running the notebook.

+ For Centos: `yum install R R-devel libcurl-devel openssl-devel`
+ For Ubuntu: `apt-get install r-base r-cran-rserve`

Install additional R packages:

```
curl https://cran.r-project.org/src/contrib/Archive/rscala/rscala_1.0.6.tar.gz -o /tmp/rscala_1.0.6.tar.gz
R CMD INSTALL /tmp/rscala_1.0.6.tar.gz
R -e "install.packages('ggplot2', repos = 'http://cran.us.r-project.org')"
R -e "install.packages('knitr', repos = 'http://cran.us.r-project.org')"
R -e "install.packages(c('devtools','mplot', 'googleVis'), repos = 'http://cran.us.r-project.org'); require(devtools); install_github('ramnathv/rCharts')"
```

You also need a compiled version of Spark 1.5.0. Download [the binary distribution](http://archive.apache.org/dist/spark/spark-1.5.0/spark-1.6.0-bin-scala-2.11-hadoop2.6.tgz) and untar to make it accessible in `/opt/spark` folder.

## Simple R

[![Simple R](interpreter/R/simple-r.png)](interpreter/R/simple-r.png)

## Ggplot2

[![ggplot2](interpreter/R/ggplot2.png)](interpreter/R/ggplot2.png)

## RCharts

[![rcharts](interpreter/R/rcharts.png)](interpreter/R/rcharts.png)

[![maps](interpreter/R/rcharts-map.png)](interpreter/R/rcharts-map.png)

## GoogleVis

[![googlevis](interpreter/R/googlevis.png)](interpreter/R/googlevis.png)

## Scala R Binding

[![Scala R Binding](interpreter/R/scala-r-binding.png)](interpreter/R/scala-r-binding.png)

## Scala R Dataframe Binding

[![R Scala Binding](interpreter/R/scala-r-dataframe-binding.png)](interpreter/R/scala-r-dataframe-binding.png)

[![R Scala Binding](interpreter/R/scala-r-dataframe-binding.png)](interpreter/R/r-scala-dataframe-binding.png)

## SparkR

[![SparkR](interpreter/R/sparkr.png)](interpreter/R/sparkr.png)
