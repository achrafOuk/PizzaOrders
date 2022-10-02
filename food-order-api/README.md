# Introduction

This is the api of the pizza ordering application that is created with Laravel and Mongodb:

# add mongodb configuration

Laravel does not support mongodb by default and we need to add external files as showing in the article:

https://appdividend.com/2022/06/24/laravel-mongodb-crud/

# Authentication

We will use Laravel\passport to authenticate the user, we can install it via Composer:

```
    composer require laravel/passport
```

We also need to to edit AuthCode.php,PersonalAccessClient.php,Client.php and Token.php in this path "/vendor/laravel/passport/src/" from:

```
    use Illuminate\Database\Eloquent\Model;
```

to

```
    use Jenssegers\Mongodb\Eloquent\Model;
```

we can also connection specific your mongo connection in all of top Model,like this:

```
protected $connection = 'mongodb';
```

you can fellow the official documentation to config passport and add personal access token:
https://laravel.com/docs/9.x/passport
