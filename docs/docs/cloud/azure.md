[![Datalayer](http://datalayer.io/enterprise/img/logo-datalayer-horizontal.png)](http://datalayer.io)

# Azure

## Setup

curl -L https://aka.ms/InstallAzureCli | bash
exec -l $SHELL

az login
az configure
az feedback
az account list --all --out table
az account set --subscription "xxx"
az account set --subscription "xxx"
az logout

# Apps and Service Principal

**Option 1**

```
az group create -n "spceastus" -l "eastus"
```

```
# Optional...
az ad sp create-for-rbac --name stackpoint-eric-echarles --role Contributor --scopes /subscriptions/47981fb0...
AppId                                 DisplayName               Name                             Password                              Tenant
------------------------------------  ------------------------  -------------------------------  ------------------------------------  ------------------------------------
7bb0475a-6ec6... stackpoint-eric-echarles  http://stackpoint-eric-echarles  c893856d-...  573dff35...
```

```
az ad sp create-for-rbac --role Contributor --scopes="/subscriptions/47981fb.../resourceGroups/spceastus"
AppId                                 DisplayName                    Name                                  Password                              Tenant
------------------------------------  -----------------------------  ------------------------------------  ------------------------------------  ------------------------------------
e4fcb2ff-9cd0-...  azure-cli-2017-12-30-08-24-26  http://azure-cli-2017-12-30-08-24-26  f695ec14-3f9f-...  573dff35-c5a9-...
```

```
az role assignment create --assignee e4fcb2ff-9cd0-... --role Contributor
Name
------------------------------------
94fb6d96-1d01-....
```

```
az role assignment list
Principal                                             Role         Scope
----------------------------------------------------  -----------  ---------------------------------------------------
eric_datalayer.io#EXT#@ericdat...  Owner        /subscriptions/47981fb0-....
http://stackpoint-eric-echarles                       Contributor  /subscriptions/47981fb0-d,,,,
http://azure-cli-2017-12-30-07-30-39                  Contributor  /subscriptions/47981fb0-d82a-....
```

```
AZURE_SUBSCRIPTION_ID: 47981fb0-d...
AZURE_TENANT_ID: 573dff35-c5a9...
AZURE_CLIENT_ID: e4fcb2ff-9cd0-....
AZURE_CLIENT_SECRET: xxx
```

```
az login --service-principal --username 551d5e25-.... --password 66be2d55-4637-....--tenant 573dff35-c5a9-4e52-...
az group create -n Stackpoint2 -l westus
az group list
az group delete -n Stackpoint2
```

**Option 2**

az ad app list
az ad app list --display-name DatalayerApp2
az ad sp create-for-rbac --name b0bb5a5d-1fbc-4466-... --password "xxx"
az ad sp create-for-rbac --name b0bb5a5d-1fbc-4466-... --create-cert
az ad sp show --id b0bb5a5d-1fbc-4466-...
az login --service-principal -u b0bb5a5d-1fbc-4466-... --password {password-or-path-to-cert} --tenant {tenant}
az role assignment create --assignee b0bb5a5d-1fbc-4466-9575-   6c3f1d43278e --role Reader
az role assignment delete --assignee b0bb5a5d-1fbc-4466-... --role Contributor
az ad sp reset-credentials --name b0bb5a5d-1fbc-4466-... --password {new-password}

## Certificate

Once signed up you might right away go ahead an create a management certificate for your account which you’ll need to use the Azure API.

The certificate is created locally on your machine then uploaded to the account using the management portal.

With the following instructions a certificate valid for the next year can be created.

```
$ openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout ~/.ssh/azure_mgnt.pem -out ~/.ssh/azure_mgnt.pem
$ openssl x509 -inform pem -in ~/.ssh/azure_mgnt.pem -outform der -out ~/.ssh/azure_mgnt.cer
```

The  azure_mgnt.cer file is uploaded to the portal, while the  azure_mgnt.pem file is being used for access.

> Hint: Try to use no password for the certificate so you can use it in an automated fashion, obviously this is considered less secure.
> You should always set the correct access rights for any certificate, which would be 0400 ideally.

Use the management portal (API Mamangement left menu) to deposit the certificate with your account. Go to the Settings tab choosing Management Certificates.

*Creating a Machine User Certificate*

Running a virtual machine requires a user account. Azure uses same as with the management account a public/private key approach to grant access to the virtual machines for you.

Therefor in addition to the management certificate you would also need to create a user certificate for your virtual machine user (by default azureuser).

You can create the credentials like this:

```
$ ssh-keygen -t rsa -f ~/.ssh/azure.id
$ openssl req -x509 -days 3650 -new -key azure.id -out azure.pem
```

The  azure.pem file is uploaded to the machines, while the key file is used for accessing the virtual machines.

Here you should also think about using a password or not for the generated key.

## Blob Storage

```
+ export AZURE_STORAGE_ACCOUNT=datalayer
+ export AZURE_STORAGE_ACCESS_KEY=ybTIHrSB...
+ azure storage blob upload test.txt abi test.txt
```

```
$ azure storage blob list abi
info:    Executing command storage blob list
+ Getting blobs in container abi
data:    Name                                            BlobType   Length    Content-Type                                                               Last-Modified                  SnapshotTime
data:    ----------------------------------------------  ---------  --------  -------------------------------------------------------------------------  -----------------------------  ------------
data:    brief-i...          BlockBlob  74900     
```

## Misc

sudo waagent -deprovision
