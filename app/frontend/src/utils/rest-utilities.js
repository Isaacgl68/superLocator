/* eslint-disable no-unused-vars */
import 'isomorphic-fetch';


function hasPayload(methodName) {
  return methodName === 'POST' || methodName === 'PUT';
}

function hasNoConetent(response) {
  return response.status === 204;
}

function isClientError(response) {
  const isClientErr = response.status >= 400 && response.status < 500;
  return isClientErr;
}

function isServerError(response) {
  const isServerErr = response.status >= 500 && response.status < 600;
  return isServerErr;
}

function isError(response) {
  const isErr = isServerError(response) || isClientError(response);
  return isErr;
}

function isOk(response) {
  return response.status >= 200 && response.status < 300;
}

function isRedirect(response) {
  return response.status >= 300 && response.status < 400;
}

function httpSend(url, body, config) {
  let config1 = config;
  return new Promise(
    (resolve, reject) => {
      if (!config1) {
        config1 = {};
      }
      const fetchConfig = {
        method: config1.method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/javascript, */*; q=0.01',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: config1.credentials || 'same-origin',
        mode: config1.mode || 'cors',
        cache: config1.cache || 'no-cache',
      };

      if (hasPayload(config1.method)) {
        fetchConfig.body = JSON.stringify(body);
      }
      fetch(url, fetchConfig).then((response) => {
        if (hasNoConetent(response)) {
          resolve(response);
        } else if (isError(response)) {
          reject(response);
        } else {
          response.text().then(textResponse => {
            try {
              const jsonResponse = JSON.parse(textResponse);
              resolve(jsonResponse);
            } catch (err) {
              resolve(textResponse);
            }
          });
        }
      });
    });
}

export function post(url, body, config) {
  const postConfig = Object.assign({}, config, { method: 'POST' });
  return httpSend(url, body, postConfig);
}

export function put(url, body, config) {
  const putConfig = Object.assign({}, config, { method: 'PUT' });
  return httpSend(url, body, putConfig);
}

export function get(url, body, config) {
  const getConfig = Object.assign({}, config, { method: 'GET' });
  return httpSend(url, body, getConfig);
}

export function remove(url, body, config) {
  const getConfig = Object.assign({}, config, { method: 'DELETE' });
  return httpSend(url, body, getConfig);
}

export function fileUpload(url, fileInfo, uploadParams, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const formData = new FormData();
    formData.append(fileInfo.fileKey, fileInfo.file);
    for (const key of Object.keys(uploadParams)) {
      formData.append(key, uploadParams[key]);
    }

    const captureProgress = function captureProgress(e) {
      if (e.lengthComputable) {
        const percentage = Math.round((e.loaded * 100) / e.total);
        if (onProgress) {
          onProgress(percentage);
        }
      }
    };
    xhr.upload.addEventListener('progress', captureProgress, false);
    xhr.upload.addEventListener('load', () => {
      if (onProgress) {
        onProgress(100);
      }
    }, false);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (e) {
            resolve(xhr.responseText);
          }
        } else {
          try {
            reject(JSON.parse(xhr.responseText));
          } catch (e) {
            reject(xhr.responseText);
          }
        }
      }
    };
    xhr.open('POST', url);
    xhr.overrideMimeType('multipart/form-data');
    xhr.send(formData);
  });
}
