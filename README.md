# Turnin Nexus
https://github.com/bradenn/turnin-nexus

This module is handles objects and interactions related to the Turnin's core services. Features should be added to the service via external modules.

## Abstract Flow Structure

`T: User | Course | Assignment | Brief | File | StdIOSpecification | StdIOTestSpecification | StdIOSubmission | StdIOSubmissionResult`

`Schema<T> => Resolver<T> || Input<T> || Service<T>`

`User => Course[]`

`Course => User`

`Assignment => Course, StdIOSpecification`

`StdIOSpecification => StdIOTestSpecification[], File`

`StdIOTestSpecification => File`

`StdIOSubmission => StdIOSubmissionResult[], User, Assignment`

`StdIOSubmissionResult => File`



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

Copyright &copy; Braden Nicholson 2019 - 2021

All Rights Reserved. Do not distribute.
