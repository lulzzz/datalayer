---
title: Datalayer Science Platform
---

Datalayer is building a solution for Big Data Scientists designed to be `Simple`, `Collaborative` and `Multi Cloud`.

The `Datalayer Science Platform` is particulary suited for Data Science exploration teams and is open source under the [Apache License](https://www.apache.org/licenses/LICENSE-2.0) (source code available in our [Github repositories](https://github.com/datalayer/)).

The [version 0.0.1](/docs/releases/v-0.0.1) is released and fully supported on AWS Amazon Cloud. Today, you can create Kubernetes cluster on the AWS Amazon cloud and deploy as many as you want Data Science Notebooks (based on Apache Zeppelin) with Apache Spark (Data Analytics) and Apache Hadoop (Distributed File System) running natively on K8S. You will also get a K8S Dashboard with Heapster to monitor resources usage.

Last but not least, we also ship the premises of `Kuber Board`, a nice user interface to control your cluster which also acts as a collaborative Data Science Notebook to share datasets analysis with authentication via Twitter OAuth.

Datalayer solutions make life easier, more productive (less cost, more business value) for `Devops`, `Data Scientists` and `Business`.

![Kuber](/images/kuber/kuber-1.svg "Kuber")

Devops use the Kuber CLI to create the Kubernetes cluster and deploy the needed Applications. This is achieved in `Exploration` and `Production` environments ([read more](/docs/devops)).

![Devops](/images/personas/devops.svg "Devops")

Data Scientists use the deployed applications to explore and share insights in a visual way, in private or in public (for example on Twitter) ([read more](/docs/data-scientists)).

![Data Scientist](/images/personas/data-scientist.svg "Data Scientist")

Business review the Data Scientist insights in their favorite environement like Microsoft Office 365 ([read more](/docs/business)).

![Business](/images/personas/business.svg "Business")

**You are welcome to contribute on this project as a User or as a Developer hacking on the base source code available in our [Github repositories](https://github.com/datalayer).**

As a user, you can simply test it with the provided [quick start guide](/docs/quick-start).

We are looking forward to your feedbacks on the current version and inputs on our [release plan](/docs/releases) to fit your needs, especially in terms of Applications (Jupyter Notebooks..), Storage, Cloud... you want to use.

**Send feedback or question to our Twitter account [@datalayerio](https://twitter.com/datalayerio).**

Datalayer ships Docker images via [Dockerhub](https://hub.docker.com/u/datalayer). You can customize your own images based [those Docker files](https://github.com/datalayer/docker-files).
