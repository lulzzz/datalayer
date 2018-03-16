# SSL

## Self-signed Certificate

```
keytool -keystore datalayer.jks -alias datalayer -genkey -keyalg RSA -sigalg SHA256withRSA -validity 365
```

```
keytool -keystore keystore -alias doc-api -genkey -keyalg RSA
keytool -keystore keystore -alias doc-api -genkey -keyalg RSA -sigalg SHA256withRSA
keytool -keystore keystore -alias doc-api -genkey -keyalg RSA -sigalg SHA256withRSA -ext 'SAN=dns:doc.datalayer.io,dns:*.datalayer.io'
```

## Certificate Authority Signed Certificate

```
keytool -certreq -alias datalayer -keystore datalayer.jks -file datalayer.csr
```

## Load Certificate

```
keytool -keystore datalayer.jks -import -alias datalayer -file certificate.crt -trustcacerts
```
