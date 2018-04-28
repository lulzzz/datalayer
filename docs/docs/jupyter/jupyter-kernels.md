---
title: Jupyter Kernels
---

# Kernels

```bash
# ./home/datalayer/.local/share/jupyter/runtime/kernel-53354a78-bde7-4986-9acb-fc94191d5d16.json
# ./home/datalayer/.local/share/jupyter/runtime/kernel-d785bbc8-c058-49d0-861c-97a39089c91e.json
# ./run/user/1000/jupyter/kernel-5332.json
# ./run/user/1000/jupyter/kernel-772af73b-185b-4960-b0fb-a0532dc59e49.json
jupyter kernelspec list
```

```bash
# Magic
%lsmagic
%env
%run
%load
```

## Kernel Gateway

[Kernel Gateway Docs](https://jupyter-kernel-gateway.readthedocs.io).

[Kernel Gateway Repository](https://github.com/jupyter/kernel_gateway).

[Notebook to Kernel Gateway](https://github.com/jupyter-incubator/nb2kg).

```bash
pip install jupyter_kernel_gateway
jupyter kernelgateway
pip install nb2kg
jupyter serverextension enable --py nb2kg --sys-prefix
export KG_URL=http://127.0.0.1:8888
jupyter notebook \
  --NotebookApp.session_manager_class=nb2kg.managers.SessionManager \
  --NotebookApp.kernel_manager_class=nb2kg.managers.RemoteKernelManager \
  --NotebookApp.kernel_spec_manager_class=nb2kg.managers.RemoteKernelSpecManager 
```

```bash
# Start from the jupyter image with R, Python, and Scala (Apache Toree) kernels pre-installed
FROM jupyter/all-spark-notebook
# Install the kernel gateway
RUN pip install jupyter_kernel_gateway
# Run kernel gateway on container start, not notebook server
EXPOSE 8888
CMD ["jupyter", "kernelgateway", "--KernelGatewayApp.ip=0.0.0.0", "--KernelGatewayApp.port=8888"]
```

```bash
docker build -t datalayer/kernel-gateway .
docker run -it --rm -p 8888:8888 datalayer/kernel-gateway
```

## Enterprise Gateway

[Enterprise Gateway Docs](https://jupyter-enterprise-gateway.readthedocs.io/en/latest).

[Enterprise Gateway Repository](https://github.com/jupyter-incubator/enterprise_gateway).

## Spark Toree Kernel

```bash
pip install --pre toree
pip install https://dist.apache.org/repos/dist/dev/incubator/toree/0.2.0/snapshots/dev1/toree-pip/toree-0.2.0.dev1.tar.gz
```

```bash
export SPARK_HOME=/opt/spark
cd $DLAHOME/repos/jupyter-toree
make clean release APACHE_SPARK_VERSION=2.2.0
# pip install toree --no-index --find-links=./dist/toree-pip/toree-0.3.0.dev1.tar.gz
pip install --upgrade ./dist/toree-pip/toree-0.3.0.dev1.tar.gz
pip freeze | grep toree
```

```bash
jupyter toree install --spark_home=/opt/spark --interpreters=Scala,PySpark,SparkR,SQL
jupyter notebook
```

## Spark Magic (Livy) Kernel

[sparkmagic](https://github.com/jupyter-incubator/sparkmagic)
