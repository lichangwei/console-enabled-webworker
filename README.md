console-enabled-webworker
======================

To enable console object inside web workers  

## Usage  
1) Inculde script in html file.
```html
<script src="console-enabled-webworker.js"></script>
```
2) Import script inside your web worker.  
```javascript
importScripts('console-enabled-webworker.js');
```
3) Call console.log debug info error time timeEnd etc. inside web workers. 
```javascript
console.log('result: ' + result);
```
4）(Optional) Remove script tag in your html file and console.log etc. in your web worker scripts.

## Change Log:
**V1.0 (Initial Version)**  
  Allow calling console.log/debug/info/error/time/timeEnd methods inside web worker.

