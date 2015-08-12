# pincode
Node module to easily loopkup Indian pincode information

##### Install using npm:

    npm install pincode

### Usage

##### Search by Pin

```javascript
pin.seachByPin('560057', function (response){
    response.forEach(function (data) {
        console.log(data);
    });
});
```

##### Search by Area

```javascript
pin.seachByArea('Chandni Chowk', function (response) {
    response.forEach(function (data) {
        console.log(data);
    });
});
```

##License

MIT https://raw.githubusercontent.com/codingdefined/pincode/master/LICENSE
