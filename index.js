#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');

/* get name of react component from 
command line */
const [name] = process.argv.slice(2);

function createComponent(name) {
  return (
`
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './${name}.module.css';
  
const ${name} = () => {
  const fn = () => {

  };

  return (
    <section className={styles.container}>
      <h2></h2>
    </section>
  );
};
  
${name}.propTypes = {

};
  
export default ${name};
`
  )
}

/* get the absolute path to the file */
function createPath(name, ext) {
  const absolutePath = path.resolve(name);
  return `${absolutePath}.${ext}`;
}

/* create files concurrently */
async function writeFiles(promiseArray) {
  const files = await Promise.all(promiseArray);
  return files;
}

function checkError(errorArray) {
  return errorArray.some(error => error);
}

function resolveStatus(errorStatus) {
  if (errorStatus) {
    return `Unable to create react component ${errorStatus}`;
  } 
    return 'Sucesss!'
}

async function createFiles() {
  const reactComponent = createComponent(name);
  const reactPath = createPath(name, 'js');
  const cssPath = createPath(name, 'module.css');
 
  const reactPromise = fs.writeFile(reactPath, reactComponent);
  const cssPromise = fs.writeFile(cssPath, '.container {}');

  const errorArray = await writeFiles([reactPromise, cssPromise]);

  const status = resolveStatus(checkError(errorArray));
  console.log(status);
}

createFiles();

