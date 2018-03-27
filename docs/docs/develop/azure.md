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
az ad sp create-for-rbac --name stackpoint-eric-echarles --role Contributor --scopes /subscriptions/47981fb0-d82a-4bcf-8b8c-f9aeb71aa74b
AppId                                 DisplayName               Name                             Password                              Tenant
------------------------------------  ------------------------  -------------------------------  ------------------------------------  ------------------------------------
7bb0475a-6ec6-4ace-ab15-5df945baefaf  stackpoint-eric-echarles  http://stackpoint-eric-echarles  c893856d-9527-4404-8aa5-6af8e28cb1f1  573dff35-c5a9-4e52-a98e-333d8d9527a1
```

```
az ad sp create-for-rbac --role Contributor --scopes="/subscriptions/47981fb0-d82a-4bcf-8b8c-f9aeb71aa74b/resourceGroups/spceastus"
AppId                                 DisplayName                    Name                                  Password                              Tenant
------------------------------------  -----------------------------  ------------------------------------  ------------------------------------  ------------------------------------
e4fcb2ff-9cd0-4946-bdfc-45de5c169af1  azure-cli-2017-12-30-08-24-26  http://azure-cli-2017-12-30-08-24-26  f695ec14-3f9f-4e67-bec2-a178b3244a4d  573dff35-c5a9-4e52-a98e-333d8d9527a1
```

```
az role assignment create --assignee e4fcb2ff-9cd0-4946-bdfc-45de5c169af1 --role Contributor
Name
------------------------------------
94fb6d96-1d01-45e4-94a6-c2c2ed626128
```

```
az role assignment list
Principal                                             Role         Scope
----------------------------------------------------  -----------  ---------------------------------------------------
eric_datalayer.io#EXT#@ericdatalayer.onmicrosoft.com  Owner        /subscriptions/47981fb0-d82a-4bcf-8b8c-f9aeb71aa74b
http://stackpoint-eric-echarles                       Contributor  /subscriptions/47981fb0-d82a-4bcf-8b8c-f9aeb71aa74b
http://azure-cli-2017-12-30-07-30-39                  Contributor  /subscriptions/47981fb0-d82a-4bcf-8b8c-f9aeb71aa74b
```

```
AZURE_SUBSCRIPTION_ID: 47981fb0-d82a-4bcf-8b8c-f9aeb71aa74b
AZURE_TENANT_ID: 573dff35-c5a9-4e52-a98e-333d8d9527a1
AZURE_CLIENT_ID: e4fcb2ff-9cd0-4946-bdfc-45de5c169af1
AZURE_CLIENT_SECRET: xxx
```

```
az login --service-principal --username 551d5e25-6201-4b6c-86b0-43ab1c3d7ae4 --password 66be2d55-4637-4de9-aeae-17bff8e28172 --tenant 573dff35-c5a9-4e52-a98e-333d8d9527a1
az group create -n Stackpoint2 -l westus
az group list
az group delete -n Stackpoint2
```

**Option 2**

az ad app list
az ad app list --display-name DatalayerApp2
az ad sp create-for-rbac --name b0bb5a5d-1fbc-4466-9575-6c3f1d43278e --password "xxx"
az ad sp create-for-rbac --name b0bb5a5d-1fbc-4466-9575-6c3f1d43278e --create-cert
az ad sp show --id b0bb5a5d-1fbc-4466-9575-6c3f1d43278e
az login --service-principal -u b0bb5a5d-1fbc-4466-9575-6c3f1d43278e --password {password-or-path-to-cert} --tenant {tenant}
az role assignment create --assignee b0bb5a5d-1fbc-4466-9575-   6c3f1d43278e --role Reader
az role assignment delete --assignee b0bb5a5d-1fbc-4466-9575-6c3f1d43278e --role Contributor
az ad sp reset-credentials --name b0bb5a5d-1fbc-4466-9575-6c3f1d43278e --password {new-password}

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
+ export AZURE_STORAGE_ACCESS_KEY=ybTIHrSBfIAAgPRRrsq1RMeLRNGFHYuec4AxvX+98ZSDYoL/P0ln3Tdy8DLZCt7CKh5856i01YizanQ0rewp/A==
+ azure storage blob upload test.txt abi test.txt
```

```
$ azure storage blob list abi
info:    Executing command storage blob list
+ Getting blobs in container abi
data:    Name                                            BlobType   Length    Content-Type                                                               Last-Modified                  SnapshotTime
data:    ----------------------------------------------  ---------  --------  -------------------------------------------------------------------------  -----------------------------  ------------
data:    brief-ingredient-story-2-details.pptx           BlockBlob  74900     application/vnd.openxmlformats-officedocument.presentationml.presentation  Sat, 23 May 2015 08:55:41 GMT
data:    liquid-nomenclature-story-1.xlsx                BlockBlob  23819     application/vnd.openxmlformats-officedocument.spreadsheetml.sheet          Sat, 23 May 2015 08:56:36 GMT
data:    oasis-pilot.pptx                                BlockBlob  2564267   application/vnd.openxmlformats-officedocument.presentationml.presentation  Sat, 23 May 2015 08:57:22 GMT
data:    stories.pptx                                    BlockBlob  9292294   application/vnd.openxmlformats-officedocument.presentationml.presentation  Sat, 23 May 2015 08:58:16 GMT
data:    sweet-space-strategy-Data_IRI_USA_4.22.15.xlsx  BlockBlob  41506154  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet          Sat, 23 May 2015 09:04:34 GMT
data:    usa-24-typing-tool-18DEC12-v2.xlsx              BlockBlob  6860150   application/vnd.openxmlformats-officedocument.spreadsheetml.sheet          Sat, 23 May 2015 09:07:41 GMT
data:    workshop.pptx                                   BlockBlob  1789984   application/vnd.openxmlformats-officedocument.presentationml.presentation  Sat, 23 May 2015 09:08:18 GMT
```

## Misc

sudo waagent -deprovision
