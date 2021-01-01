# Turnin Nexus
https://github.com/bradenn/turnin-nexus

This module is handles objects and interactions related to the Turnin's core services. Features should be added to the service via external modules.

## Notable Components

- Express.js
- Mongoose
- GraphQL
- AWS S3
- Json Web Token

## Installation
Install using git
```bash
git clone https://github.com/bradenn/turnin-nexus
cd turnin-nexus
yarn install
```

## Dependencies
- MongoDB
- SeaweedFS using S3 (or an AWS S3 Bucket)

## Running
Production
```bash
yarn serve
```
Development
```bash
yarn run nodemon
```
## License
[AGPL 3.0](https://github.com/bradenn/turnin-nexus/LICENSE.md)