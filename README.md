# Production start

```
yarn install --production

cd admin

yarn install --production

yarn build

cd ..

yarn build

yarn start:production

```
# Frontend rebuild

```
cd admin && yarn && yarn build
```

# Server

# Initial setup
```
yarn
```

# Project run
```
yarn start
```

## Start project in cluster
```
yarn start:cluster
```

## Swagger Docs Generation

```
npm run swagger
```

## Test

```
npm run test
```

### Test with coverage reports:

```
npm run test:coverage
```

The coverage report will be saved under ```./coverage``` folder.

## Generate Docs

```
npm run doc
```

The project documentation will be saved under ```./doc``` folder.


###  Notifications

Client should call following methods on device to subscribe
```

FirebaseMessaging.getInstance().subscribeToTopic("calendar" + calendarId + ('ru' OR 'ua')); //Android

[[FIRMessaging messaging] subscribeToTopic:@"/topics/news" + calendarId + ('ru' OR 'ua')]; //iOS

```
