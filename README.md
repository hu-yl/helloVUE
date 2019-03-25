# hello-shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


##禁止用户手动缩放
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">

##设置rem和px的比例
      let htmlwidth = document.documentElement.clientWidth || document.body.clientWidth;
      let htmlDom = document.getElementsByTagName('html')[0];
      if (htmlwidth > 750){
        htmlwidth = 750
      }
      htmlDom.style.fontSize = htmlwidth/20 + 'px';
   
##  npm i axios --save

##  npm install vue-awesome-swiper --save